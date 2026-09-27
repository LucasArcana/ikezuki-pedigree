<template>
    <div 
        id="FamilyChart" 
        class="f3" 
        style="
            width:100%;
            height:900px;
            margin:auto;
            background-color:rgb(33,33,33);
            color:#fff;">
        </div>
</template>

<script setup lang="tsx">
import * as d3 from 'd3';  // npm install d3 or yarn add d3
import * as f3 from 'family-chart';  // npm install family-chart@0.9.0 or yarn add family-chart@0.9.0
import 'family-chart/styles/family-chart.css';
import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from "vue";
import { VueElement } from 'vue';
     
export class FamilyTree extends VueElement {
    /*name: "FamilyChart",
    mounted() {
        create(data())
        
        function create(data) {
        const f3Chart = f3.createChart('#FamilyChart', data)
            .setTransitionTime(1000)
            .setCardXSpacing(250)
            .setCardYSpacing(150)
            .setSingleParentEmptyCard(true, {label: 'ADD'})
            .setShowSiblingsOfMain(false)
            .setOrientationVertical()
        
        const f3Card = f3Chart.setCardHtml()
            .setCardDisplay([["first name","last name"],["birthday"]])
            .setCardDim(null)
            .setMiniTree(true)
            .setStyle('imageRect')
            .setOnHoverPathToMain()
        
        
        const f3EditTree = f3Chart.editTree()
            .fixed(true)
            .setFields(["first name","last name","birthday","avatar"])
            .setEditFirst(true)
            .setCardClickOpen(f3Card)
        
        f3EditTree.setEdit()
        
        f3Chart.updateTree({initial: true})
        f3EditTree.open(f3Chart.getMainDatum())
        
        f3Chart.updateTree({initial: true})
        }
        
    }*/
};
</script>
