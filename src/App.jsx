import React from "react";
import * as f3 from 'family-chart';
import 'family-chart/styles/family-chart.css';
import horsesDB from "./db/horses_db.json";

export default class FamilyTree extends React.Component {
    cont = React.createRef();
    pedigreeChart = null;
    state = {avatarMode: 'irl'};

    componentDidMount(){
        this.setupPedigree();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.avatarMode !== this.state.avatarMode){
            this.destroyPedigree();
            this.setupPedigree();
        }
    }

    componentWillUnmount(){
        this.destroyPedigree();
    }

    setupPedigree() {
        if (!this.cont.current) return;
        const data = this.buildDatabase()//family-chart API database data
        
        const f3Chart = f3.createChart('#FamilyChart', data)
            .setTransitionTime(1000)
            .setCardXSpacing(250)
            .setCardYSpacing(150)
            .setSingleParentEmptyCard(true, {label: 'ADD'})
            .setShowSiblingsOfMain(true)
            .setOrientationVertical()

        const f3Card = f3Chart.setCardHtml()
            .setCardDisplay([["horse_name"],["birth_year"]])
            .setCardDim(null)
            .setMiniTree(true)
            .setStyle('imageRect')
            .setOnHoverPathToMain()

        const f3EditTree = f3Chart.editTree()
            .fixed(false)
            .setFields(["horse_name","birth_year"])
            .setEditFirst(false)
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

    destroyPedigree(){
        if (this.cont.current) 
            this.cont.current.innerHTML = '';
            this.pedigreeChart = null;
    }

    buildDatabase(){
        return horsesDB;
    }

    render() {
        return (
            <>
                <div>
                    <h1>Ikezuki</h1>
                </div>
                <div className="navbtn">
                    <button
                        type="button"
                        onClick={togglePedigree}>
                        Pedigree
                    </button>
                    <button 
                        type="button"
                        onClick={toggleAbout}>
                        About
                    </button>
                </div>
                <div 
                    className="f3"
                    id="FamilyChart"
                    ref={this.cont}
                    style={{
                        width:'100%',
                        height:'900px',
                        margin:'auto',
                        backgroundColor:'rgb(144, 143, 143)',
                        color:'#f7f7f7',
                    }}
                />
            </>
        );
    }
}


function togglePedigree(){
    return (
        <>
            <div 
                className="f3"
                id="FamilyChart"
                ref={this.cont}
                style={{
                    width:'100%',
                    height:'900px',
                    margin:'auto',
                    backgroundColor:'rgb(144, 143, 143)',
                    color:'#f7f7f7',
                }}
            />
        </>
    );
}


function toggleAbout(){
    return (
        <>
            <div>
                
            </div>
        </>
    );
}