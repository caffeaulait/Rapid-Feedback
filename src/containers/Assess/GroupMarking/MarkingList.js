import React from 'react';
import MarkingItem from './MarkingItem'

class MarkingList extends React.Component {

    findCriteriaIndex = (criteria) => {
        let array = this.props.result.map(a => a.id);
        var index = array.indexOf(criteria.id)
        return index;
    }

  


    render() {
        console.log("result.....")
        console.log(this.props.result)
        let close = this.props.target !== this.props.assTarget.groupName;
       
        const markingList = this.props.result.length !== 0 ? this.props.criteria.map((c) => {
            return <MarkingItem key = {c.id} target = {this.props.target} close = {close} criteria={c} result={this.props.result[this.findCriteriaIndex(c)]} comments={this.props.comments} setId = {this.props.setId} addComments = {this.props.addComments} updateItem={this.props.updateItem} updatePoint = {this.props.updatePoint}/>;
        }) : <p>loading....</p>
        return (
            <div>

                {markingList}

            </div>
        )
    }
}

export default MarkingList;