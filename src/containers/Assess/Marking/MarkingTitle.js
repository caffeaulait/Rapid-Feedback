import React from 'react';
import ClockCount from './ClockCount';
import './MarkingTitle.css';

class MarkingTitle extends React.Component {
  assTargetBuild = () => {
    let str = '';
    str = str.concat(this.props.assTarget.name);
    str = str.concat('    ');
    str = str.concat(this.props.assTarget.number);
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
    console.log('running');
    return (
      <div className='title'>
        {/* <DropdownButton className="assTarget" id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton> */}
        <span className='assTarget'>
          <pre>{this.assTargetBuild()}</pre>
        </span>
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
