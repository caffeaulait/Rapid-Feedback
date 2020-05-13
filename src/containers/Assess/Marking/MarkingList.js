import React from 'react';
import MarkingItem from './MarkingItem'

class MarkingList extends React.Component {

    findCriteriaIndex = (criteria) => {
        let array = this.props.result.map(a => a.id);
        var index = array.indexOf(criteria.id)
        return index;
    }

  


    render() {
        

        const markingList = this.props.criteria ? this.props.criteria.map((c) => {
            return <MarkingItem key = {c.id} criteria={c} result={this.props.result[this.findCriteriaIndex[c]]} />;
        }) : <p>loading....</p>
        return (
            <div>

                {markingList}


            </div>
        )
    }
}

export default MarkingList;