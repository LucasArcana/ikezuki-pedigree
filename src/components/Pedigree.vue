<script lang="jsx">
import * as d3 from 'd3';
import * as f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';
import {ref, watch, onMounted, onUpdated, onBeforeUnmount} from "vue";
import { VueElement } from 'vue';
import horsesDB from "/src/horses_db.json"
     
export default class FamilyTree extends VueElement {
    setUpPedigree(){
        content = ref(null);
        pedigreeChart = null;

        const f3Chart = f3.createChart('#FamilyChart', data)
            .setTransitionTime(1000)
            .setCardXSpacing(250)
            .setCardYSpacing(150)
            .setSingleParentEmptyCard(true, {label: 'ADD'})
            .setShowSiblingsOfMain(false)
            .setOrientationVertical()
        
        const f3Card = f3Chart.setCardHtml()
            .setCardDisplay([["horse_name"], ["birth_year"]])
            .setCardDim(null)
            .setMiniTree(true)
            .setStyle('imageRect')
            .setOnHoverPathToMain()
        
        
        const f3EditTree = f3Chart.editTree()
            .fixed(true)
            .setFields(["horse_name", "birth_year"])
            .setEditFirst(true)
            .setCardClickOpen(f3Card)
        
        f3EditTree.setEdit()
        f3EditTree.open(f3Chart.getMainDatum())
        f3Chart.updateTree({initial: true})
        this.pedigreeChart = f3Chart;
        
        f3Chart.setPersonDropdown(
            (d)=>`${d.data.horse_name} (${d.data.birth_year??'?'})`,
            {placeholder:'Searching for horses...'},        
        )
    }

    onMounted(){
        this.setUpPedigree();
    }

    destroyPedigree(){
        if (this.content.current)
            this.content.current.innerHTML = '';
            this.pedigreeChart = null;
    }

    buildDatabase(){
        return horsesDB;
    }
};
</script>

<template>
    <div 
        id="FamilyChart" 
        class="f3" 
        style="
            width:100%;
            height:900px;
            margin:auto;
            background-color:rgb(144,143,143);
            color:#f7f7f7;">
    </div>
</template>