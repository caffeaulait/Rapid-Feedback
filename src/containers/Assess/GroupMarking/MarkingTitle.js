import React from 'react';
import ClockCount from './ClockCount';
import './MarkingTitle.css';

class MarkingTitle extends React.Component {
  assTargetBuild = () => {
    let str = '';
    str = str.concat(this.props.assTarget.Group);
    str = str.concat(':  ');
    str = str.concat(this.props.assTarget.Member.join('   '));
    return str;
  };

  totalScore = () => {
    let scoreGet = this.props.result
      .map((a) => a.point)
      .reduce((a, b) => a + b, 0);
    let scoreTotal = this.props.criteria
      .map((a) => a.points)
      .reduce((a, b) => a + b, 0);

    return scoreGet + '/' + scoreTotal;
  };

  render() {
    console.log(this.props);
    let options = this.props.assTarget.Member.map((marker) => {
      return (
        <option key={marker.id} value={marker.name}>
          {marker.name}
        </option>
      );
    });
    return (
      <div className='title'>
        <select
          className='assTarget'
          id='mySelect'
          style={{ width: '40%' }}
          onChange={(e) => this.props.setTarget(e.target.value)}
        >
          <option value={this.props.assTarget.groupName}>
            {this.props.assTarget.groupName}
          </option>
          {options}
        </select>
        <ClockCount
          time={this.props.assTime}
          minutes={this.props.minutes}
          seconds={this.props.seconds}
          start={this.props.start}
        />
        <span className='score'>{this.totalScore()}</span>
      </div>
    );
  }
}

export default MarkingTitle;
