<script lang="ts">
import * as d3 from 'd3';
import * as f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';
import {ref, watch, onMounted, onUpdated, onBeforeUnmount} from "vue";
import horsesDB from "../horses_db.json"
     
export default{
    name: 'FamilyTree',
    mounted() {
        const data = return(horsesDB);
    }

    
};
function setUpPedigree(data: any){
    const f3Chart = f3
        .createChart('#FamilyChart', data)
        .setTransitionTime(1000)
        .setCardXSpacing(250)
        .setCardYSpacing(150)
        .setSingleParentEmptyCard(true, {label: 'ADD'})
        .setShowSiblingsOfMain(false)
        .setOrientationVertical()
    
    const f3Card = f3Chart
        .setCardHtml()
        .setCardDisplay([["horse_name"], ["birth_year"]])
        .setCardDim({})
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
    
    f3Chart.setPersonDropdown(
        (d:any)=>`${d.data.horse_name} (${d.data.birth_year??'?'})`,
        {placeholder:'Searching for horses...'},        
    )
}
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