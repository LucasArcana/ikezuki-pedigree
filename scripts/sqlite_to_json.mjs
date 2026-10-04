import initSqlJs from 'sql.js';
import {readFile, writeFile} from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { read } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../src/db/ikezuki_db.sqlite');
const OUT_PATH = path.join(__dirname, '../src/db/horses_db.json');
const WASM_PATH = path.join(__dirname, '../node_modules/sql.js/dist/sql-wasm.wasm');

function fetchAll(dbQueried, sql){
    const statement = dbQueried.prepare(sql);
    const rows = [];
    while (statement.step())
        rows.push(statement.getAsObject());
    statement.free();
    return rows;
}

async function convert(){
    const SQL = await initSqlJs({locateFile:()=>WASM_PATH});
    const fileBuffer = await readFile(DB_PATH);
    const dbQueried = new SQL.Database(new Uint8Array(fileBuffer));

    const horses = fetchAll(dbQueried, `SELECT * FROM horses;`);
    const family = fetchAll(dbQueried, `SELECT * FROM family;`);
    const byId = new Map(horses.map(h=>[h.id,h]));

    const result = horses.map(h=>{
        const parents = family
            .filter(f=>f.child_id===h.id)
            .map(f=>f.parent_id)
            .filter(id=>byId.has(id));

        const children = family
            .filter(f=>f.parent_id===h.id)
            .map(f=>f.child_id)
            .filter(id=>byId.has(id));

        const spouses = [...new Set(
            family
                .filter(f=>f.parent_id===h.id)
                .flatMap(f=>family
                    .filter(f2=>f2.child_id===f.child_id&&f2.parent_id!==h.id)
                    .map(f2=>f2.parent_id))
        )].filter(id=>byId.has(id))

        const rels = {};
        if (parents.length)
            rels.parents = parents;
        if (spouses.length)
            rels.spouses = spouses;
        if (children.length)
            rels.children = children;

        return {
            id: h.id,
            data:{
                gender:h.gender,
                horse_name:h.horse_name,
                birth_year:h.birth_year??undefined,
            },
            rels,
        };
    });

    await writeFile(OUT_PATH, JSON.stringify(result,null,2));
    console.log(`Converted ${result.length} horses -> ${OUT_PATH}`);
}

convert().catch(err=>{
    console.error('Conversion failed:', err);
    process.exit(1);
});