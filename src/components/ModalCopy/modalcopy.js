import React, { Component } from 'react';

class Modal extends Component {
    // constructor(props) {
    //     super(props);
    //     this.handleSave = this.handleSave.bind(this);
    //     this.state = {
    //         title: '',
    //         msg: '',
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         title: nextProps.title,
    //         msg: nextProps.msg,
    //     });
    // }

    // titleHandler(e) {
    //     this.setState({ title: e.target.value });
    // }

    // msgHandler(e) {
    //     this.setState({ msg: e.target.value });
    // }

    // handleSave() {
    //     const item = this.state;
    //     this.props.saveModalDetails(item)
    // }

    render() {
        return (
            <div className="modal fade" id="testModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create New Criteria</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p style={{ textAlign: "left" }}><span style={{ display: 'inline-block', width: "15%" }} className="modal-lable">Criteria:</span><input value={this.props.item.content} onChange={this.props.titleHandler} /></p>
                            <p style={{ textAlign: "left" }}><span style={{ display: 'inline-block', width: "15%" }} className="modal-lable">Points:</span><input value={this.props.item.points} onChange={this.props.pointHandler} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" style={{ fontSize: '10px', padding: '5px 10px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "20%", verticalAlign: 'center' }} data-dismiss="modal">Close</button>
                            <button type="button" style={{ fontSize: '10px', padding: '5px 10px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "20%", verticalAlign: 'center' }} data-dismiss="modal" onClick={this.props.handleSubmit}> Save changes </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;