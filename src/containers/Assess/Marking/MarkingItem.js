import React from 'react';
import Slider from './Slider';
import button from '../../../assets/images/aButton.png';
import './MarkingItem.css';
import Modal from './CommentsModal.js';
export default class MarkingItem extends React.Component {

    state= {
        point:null
    }

    componentDidMount() {
        this.setState({point: this.props.result.point});
    }

  
    

    render () {
        console.log(this.props.result);
        console.log(this.props.criteria.id);
        return (
           
            <div className="all">
                 <div className="first"><p className="content">{this.props.criteria.content}</p><p className="points">{this.props.result.point}</p></div>
                 <div className="second"><Slider point={this.props.result.point} updatePoint = {this.props.updatePoint} fullPoint = {this.props.criteria.points} id={this.props.criteria.id}/><div className="comments"><textarea className="commentsArea" placeholder="Here is your comments..." disabled value={this.props.result.comment}></textarea>
                 <input data-toggle="modal" data-target={"#commentsModal"+this.props.criteria.id} className="addButton" type="image" src={button} onClick = {this.addComments}></input>
                 </div></div>
                 <Modal addComments = {this.props.addComments} setId = {this.props.setId} id = {this.props.criteria.id} content={this.props.criteria.content} updateItem={this.props.updateItem} />
            </div>
       
       )
    }
}