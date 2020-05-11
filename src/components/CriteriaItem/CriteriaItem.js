import React from 'react';
import Modal from '../Modal/Modal';
import './CriteriaItem.css';
export default class CriteriaItem extends React.Component {
    render() {
        console.log(this.props.criteria)
        return (

            <li className="list-group-item text-capitalize d-flex justify-content-between my-1" style={{ textAlign: "center" }}>
                <h6>{this.props.criteria.content}</h6>
                <div className="todo-icon">
                    <span>Points: {this.props.criteria.points}</span>
                    <span className="mx-2 text-success" data-toggle="modal" data-target={"#" + this.props.id} onClick={this.props.editCriteria}>
                        <i className="fas fa-pencil-alt"></i>
                    </span>
                    <Modal
                        titleHandler={this.props.titleHandler}
                        pointHandler={this.props.pointHandler}
                        handleSubmit={this.props.handleSubmit}
                        item={this.props.item}
                        editItem={this.props.editItem}
                        id={this.props.id}
                    />
                    <span className="mx-2 text-danger" onClick={this.props.deletCriteria}>
                        <i className="fas fa-trash-alt"></i>
                    </span>
                </div>

            </li>
        );
    }
}