import React from 'react';
import MarkingTitle from "./MarkingTitle";
import MarkingList from './MarkingList';

class Marking extends React.Component {

    state = {
        assTarget: {Group:"Group2",Member:["Alex",'Allen',"Alice"]},
        assTime: {min:0,sec:5},
        criteria: [{id:"1",criteria:"Voice, peace and confidence",point:10},
                {id:"2",criteria:"Knowledge of Material",point:10},
                {id:"3",criteria:"Content",point:10},
                {id:"4",criteria:"Concluding remarks",point:10},
                {id:"5",criteria:"PPT",point:10}],
        result: [{id:"1",point:0,comment:""},
                {id:"2",point:5,comment:""},
                {id:"3",point:0,comment:""},
                {id:"4",point:5,comment:""},
                {id:"5",point:0,comment:""}],

    }

    render () {
        return (
            <div> 
                <MarkingTitle assTarget={this.state.assTarget} assTime={this.state.assTime} result = {this.state.result} criteria = {this.state.criteria}></MarkingTitle>
                <MarkingList result = {this.state.result} criteria = {this.state.criteria} />
                 <div className="button-group">
                    <button>Back</button>
                    <button>Confirm</button>
                </div>
            </div>
           
        )
    }
}

export default Marking;