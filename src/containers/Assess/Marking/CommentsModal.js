import React, { Component } from 'react';
import CommentsInput from './CommentsInput';
import CommentsList from './CommentsList';
import {nextID} from "../../../util/array";


class Modal extends Component {
    state = {
        comments: [{id: "1", content: "good", type:"Well"},
        {id: "2", content: "need improve", type:"Need Improve"},
        {id: "3", content: "so so", type:"Normal"},
        {id: "4", content: "great", type:"Well"},
        {id: "5", content: "beautiful", type:"Normal"},
        {id: "6", content: "normal", type:"Normal"}],
        item:''
    }

    handelChange = e => {
        this.setState({item:e.target.value});
    }

    addNewComments = (comments,type) => {
        let id = nextID(this.state.comments.map((item) => {
            return Number(item.id);
        }));
        const newId = id.toString();

        let target = {id:newId,content:comments,type:type};
        this.setState({comments:[...this.state.comments,target]});

    }

    



    render() {
        return (
            <div className="modal fade" id={"commentsModal"+this.props.id} tabIndex="0" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Comments Library</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <CommentsInput addComments={this.addNewComments}/>
                            <CommentsList comments={this.state.comments} upItem = {this.props.updateItem} setId = {this.props.setId} id = {this.props.id} updateItem={this.props.updateItem} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" style={{ fontSize: '10px', padding: '5px 10px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "20%", verticalAlign: 'center' }} data-dismiss="modal">Close</button>
                            <button type="button" style={{ fontSize: '10px', padding: '5px 10px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "20%", verticalAlign: 'center' }} data-dismiss="modal" onClick={this.props.addComments}>Add Comments</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;