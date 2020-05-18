import React from 'react';
import Slider from './Slider';
import button from '../../../assets/images/aButton.png';
import './MarkingItem.css';
export default class MarkingItem extends React.Component {

    state= {
        point:null
    }

    componentDidMount() {
        this.setState({point: this.props.result.point});
    }

    render () {
        console.log(this.props.result);
        return (
           
            <div className="all">
                 <div className="first"><p className="content">{this.props.criteria.criteria}</p><p className="points">{this.props.result.point}</p><p className="bar">this is bar</p></div>
                 <div className="second"><Slider point={this.props.result.point} updatePoint = {this.props.updatePoint} fullPoint = {this.props.criteria.point} id={this.props.criteria.id}/><div className="comments"><textarea className="commentsArea" placeholder="Add comments here..."></textarea><input className="addButton" type="image" src={button} ></input></div></div>
            </div>
       
       )
    }
}