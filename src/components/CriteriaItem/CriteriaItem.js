import React from 'react';
import Modal from '../ModalCopy/modalcopy';
import './CriteriaItem.css';
export default class CriteriaItem extends React.Component {
    render() {
        console.log(this.props.criteria)
        return (

            <li className="list-group-item text-capitalize d-flex justify-content-between my-1" style={{ textAlign: "center" }}>
                <h6>{this.props.criteria.content}</h6>
                <div className="todo-icon">
                    <span>Points: {this.props.criteria.points}</span>
                    <span className="mx-2 text-success" data-toggle="modal" data-target="#testModal" onClick={this.props.editCriteria}>
                        <i className="fas fa-pencil-alt"></i>
                    </span>

                    <span className="mx-2 text-danger" onClick={this.props.deletCriteria}>
                        <i className="fas fa-trash-alt"></i>
                    </span>
                </div>
                <Modal
                    titleHandler={this.props.titleHandler}
                    pointHandler={this.props.pointHandler}
                    handleSubmit={this.props.handleSubmit}
                    item={this.props.item}
                    editItem={this.props.editItem}
                />
            </li>
        );
    }
}