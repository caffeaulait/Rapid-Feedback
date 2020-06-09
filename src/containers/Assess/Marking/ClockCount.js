import React from 'react';
import Clock from '../../../assets/images/clock.png';

export default class ClockCount extends React.Component {
  // state = {
  //     minutes: null,
  //     seconds: null,
  // }

  // start = () => {
  //     this.myInterval = setInterval(() => {
  //         const { seconds, minutes } = this.state

  //         if (seconds > 0) {
  //             this.setState(({ seconds }) => ({
  //                 seconds: seconds - 1
  //             }))
  //         }
  //         if (seconds === 0) {
  //             if (minutes === 0) {
  //                 window.confirm('Presentation time out!!!')
  //                 clearInterval(this.myInterval)
  //             } else {
  //                 this.setState(({ minutes }) => ({
  //                     minutes: minutes - 1,
  //                     seconds: 59
  //                 }))
  //             }
  //         }
  //     }, 1000)
  // }

  // componentDidMount() {

  //     this.setState({ minutes: this.props.time.min, seconds: this.props.time.sec });

  // }

  // componentWillUnmount() {
  //     clearInterval(this.myInterval)
  // }

  render() {
    //const { minutes, seconds } = this.state
    return (
      <span className='clock'>
        <img onClick={this.props.start} src={Clock} alt='clock' />
        {this.props.minutes === 0 && this.props.seconds === 0 ? (
          <label className='timeOut time'>Time out</label>
        ) : (
          <label className='timeRemain time'>
            Time Remaining: {this.props.minutes}:
            {this.props.seconds < 10
              ? `0${this.props.seconds}`
              : this.props.seconds}
          </label>
        )}
      </span>
    );
  }
}
