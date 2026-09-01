import React from "react";
import * as f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';

export default class FamilyTree extends React.Component {
    cont = React.createRef();

    componentDidMount() {
        if (!this.cont.current) return;
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
    
    function data() {
        return [
        {
          "id": "0",
          "rels": {},
          "data": {
            "first name": "Name",
            "last name": "Surname",
            "birthday": 1970,
            "avatar": "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
            "gender": "M"
          }
        }
      ]
    }
  }

  render() {
    return (
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
        );
  }
}
