import React from 'react';
import ClockCount from './ClockCount';
import MarkingList from './MarkingList';
import './MarkingTitle.css';

class MarkingTitle extends React.Component {


    assTargetBuild = () => {
        let str = "";
        str = str.concat(this.props.assTarget.Group);
        str = str.concat(":  ");
        str = str.concat(this.props.assTarget.Member.join("   "));
        return str;
    }


    totalScore = () => {

        let scoreGet = this.props.result.map(a => a.point).reduce((a, b) => a + b, 0);
        let scoreTotal = this.props.criteria.map(a => a.point).reduce((a, b) => a + b, 0);

        return scoreGet + "/" + scoreTotal;

    }


    render() {
        return (
            <div>
                <div className="title"><span className="assTarget"><pre>{this.assTargetBuild()}</pre></span><ClockCount time={this.props.assTime} /><span className="score">{this.totalScore()}</span></div>
                <MarkingList />Í
            </div>

        )
    }
}

export default MarkingTitle;