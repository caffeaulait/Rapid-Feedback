import React from 'react';
import CriteriaList from '../CriteriaList/CriteriaList';
import Modal from '../Modal/Modal.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class CriteriaAdd extends React.Component {
    render() {
        const { item, handleChange, handleSubmit, editItem, titleHandler, pointHandler, id} = this.props
        return (



            <div style={{ textAlign: "center" }}>
                <button data-toggle="modal" data-target={"#" + id} className="mt-3 text-white" style={{ width: "100%", backgroundColor: "#003F8A", padding: "10px" }}>Add Criteria</button>
                <Modal
                    titleHandler={titleHandler}
                    pointHandler={pointHandler}
                    handleSubmit={handleSubmit}
                    item={item}
                    id={id}
                />
            </div>



        );
    }
}

export default CriteriaAdd;