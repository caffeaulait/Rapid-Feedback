import React from 'react';
import CriteriaItem from '../CriteriaItem/CriteriaItem';
class CriteriaList extends React.Component {
  render() {
    const deletCriteria = this.props.deletCriteria;
    const editCriteria = this.props.editCriteria;
    const item = this.props.item;
    const titleHandler = this.props.titleHandler;
    const pointHandler = this.props.pointHandler;
    const handleSubmit = this.props.handleSubmit;
    const handleUpdate = this.props.handleUpdate;
    const id = this.props.id;
    const criterias = this.props.criterias.map((criteria) => {
      console.log(id + criteria.id);
      return (
        <CriteriaItem
          key={criteria.id}
          criteria={criteria}
          deletCriteria={() => deletCriteria(criteria)}
          editCriteria={() => editCriteria(criteria)}
          item={item}
          titleHandler={titleHandler}
          handleUpdate={handleUpdate}
          pointHandler={pointHandler}
          handleSubmit={handleSubmit}
          cid={criteria.id}
          id={id + criteria.id}
        />
      );
    });

    console.log(this.props.criterias);
    return (
      <ul className='list-group my-2' style={{ boxSizing: 'border-box' }}>
        {criterias}
      </ul>
    );
  }
}

export default CriteriaList;
