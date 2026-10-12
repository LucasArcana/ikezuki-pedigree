export interface Horse {
    id: number;
    key: string;
    name: string;
    sex: "M" | "F" | null;
    birth_year: null;
    color: string | null;
}

export interface Rel {
    horse: Horse
    relation: Rel[]
}