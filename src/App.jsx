import React from "react";
import * as f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';
import './App.css';
import horses from "./horses.json";

export default class FamilyTree extends React.Component {
    cont = React.createRef();

    componentDidMount() {
      if (!this.cont.current) return;
      //create(testData())
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
            .setCardDisplay([["horse name"],["birthday"]])
            .setCardDim(null)
            .setMiniTree(true)
            .setStyle('imageRect')
            .setOnHoverPathToMain()

        
        const f3EditTree = f3Chart.editTree()
            .fixed(true)
            .setFields(["horse name","birthday","avatar"])
            .setEditFirst(true)
            .setCardClickOpen(f3Card)
        
        f3EditTree.setEdit()

        f3Chart.updateTree({initial: true})
        f3EditTree.open(f3Chart.getMainDatum())
        f3Chart.updateTree({initial: true})
    }
    
    function data() {
            return horses;
        }
    }

    render() {
        return (
          <>
            <div>
                <h1>Ikezuki</h1>
            </div>
            <div className="navbtn">
                <button>Pedigree</button>
                <button>Umamusume Mode</button>
                <button>About</button>
            </div>
            <div 
                className="f3"
                id="FamilyChart"
                ref={this.cont}
                style={{
                    width:'100%',
                    height:'900px',
                    margin:'auto',
                    backgroundColor:'rgb(163, 163, 163)',
                    color:'#fff',
                }}
                />
          </>
        );
  }
}


