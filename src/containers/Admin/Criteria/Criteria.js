import React from 'react';
import ProjectInfoCard from '../../../components/ProjectInfoCard/ProjectInfoCard';
import CriteriaList from '../../../components/CriteriaList/CriteriaList';
import CriteriaAdd from '../../../components/CriteriaAdd/CriteriaAdd';
import Modal from '../../../components/Modal/Modal.js';
import uuid from 'uuid';
import './Criteria.css';
import * as actions from '../../../store/actions/criteria';
import { connect } from 'react-redux';

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';




class Criteria extends React.Component {

  state = {
    // project: {
    //   subject_code: 'COMP90049',
    //   subject_name: 'Knowledge Technology',
    //   proj_name: 'Assignment2',
    //   duration_min: 30,
    //   duration_sec: 30,
    //   is_group: 1,
    //   proj_description:
    //     'a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque',
    //   id: 1,
    //   date: new Date(),
    // },
    project: {},

    author: '',

   

    id: 0,
    item: { id:"",content: "", points: "" },
    editItem: false

  }

  // subject_code: 'COMP90049',
  //   subject_name: 'Knowledge Technology',
  //   proj_name: 'Assignment2',
  //   duration_min: 30,
  //   duration_sec: 30,
  //   is_group: 1,
  //   proj_description:
  //     'a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque.a comparison of different advanced machine learning techinque',
  //   id: 1,
  //   date: new Date(),


  componentDidMount() {
    const pid = this.props.match.params.pid;
    this.setState({ id: pid });
    const foundProj = this.props.projects.find((el) => el.id == pid);
    const author = this.props.author;
    console.log(foundProj);
    this.setState({ project: foundProj });
    this.setState({author: author });
    if (this.props.criteriaLists.length === 0) {
      console.log('fetching criterias');
      this.props.fetchCriteria();
    }
  }


  goBack = () => {
    this.props.history.goBack();
  };

  goToConfirm = () => {
    this.props.history.push(`/admin/projects/${this.state.id}/criteriaConfirm`);
  };



  titleHandler = (e) => {
    this.setState({ item: { content: e.target.value || '', points: this.state.item.points || "" } });
  }

  pointHandler = (e) => {
    this.setState({ item: { content: this.state.item.content || '', points: e.target.value || "" } });
  }

  nextID = (list) => {
    console.log(Math.max.apply(Math, list));
    return Math.max.apply(Math, list) + 1; 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.item);
    // this.setState({ criteriaLists: [...this.state.criteriaLists, this.state.item], editItem: false, item: { content: "", points: "" } })
    this.props.createCriteria(this.state.item);
    this.setState({editItem: false, item: { content: "", points: "" }})
    console.log("Add Successful")
    console.log(this.props.criteriaLists)
  }

  findCriteriaIndex = (criteria) => {
    let array = this.props.criteriaLists.map(a => a.content);
    var index = array.indexOf(criteria.content);

    return this.props.criteriaLists[index].id;
  }

  handleDelet = (criteria) => {
    // let backUp = [...this.state.criteriaLists];
    // let index = this.findCriteriaIndex(criteria);
    // if (index !== -1) {
    //   backUp.splice(index, 1);
    //   this.setState({ criteriaLists: backUp });
    // }
    let id = this.findCriteriaIndex(criteria);
    this.props.deletCriteria(id);
  }

  handleEdit = (criteria) => {
    // let backUp = [...this.state.criteriaLists];
    // let index = this.findCriteriaIndex(criteria);
    // if (index !== -1) {
    //   backUp.splice(index, 1);
    //   this.setState({
    //     criteriaLists: backUp,
    //     item: { content: criteria.content || "", points: criteria.points || "" },
    //     editItem: true
    //   });
    // }

    let id = this.findCriteriaIndex(criteria);
    this.props.deletCriteria(id);
    this.setState({
      item: { content: criteria.content || "", points: criteria.points || "" },
      editItem: true
    });


  }


  render() {
    return (
      <div>
        <div style={{ color: '#003F8A', marginLeft: '5%', marginTop: '3%', position: 'relative' }}>
          <h1 style={{ fontSize: "60px", marginBottom: "3%", display: 'inline-block', }}>Criteria List</h1>
          <div style={{ position: "absolute", right: "5%", bottom: "0", display: 'inline-block', width: "40%", textAlign: "right" }}>
            <button style={{ fontSize: '15px', padding: '10px 20px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "18%", verticalAlign: 'center', marginRight: "10%" }} onClick={this.goBack} >Back</button>
            <button style={{ fontSize: '15px', padding: '10px 20px', color: 'white', background: '#003F8A', borderRadius: '15px', width: "18%", verticalAlign: 'center' }} onClick={this.goToConfirm}>Continue</button>
          </div>

        </div>
        <div className="Box">
          <ProjectInfoCard project={this.state.project} author={this.state.author}/>
          <div className="CriteriaCard" style={{ boxSizing: "border-box" }}>
            <CriteriaAdd item={this.state.item} handleChange={this.handleChange} handleSubmit={this.handleSubmit} editItem={this.state.editItem}
              titleHandler={this.titleHandler} pointHandler={this.pointHandler} id={"exampleModal"} />
            <CriteriaList criterias={this.props.criteriaLists} deletCriteria={this.handleDelet} editCriteria={this.handleEdit}
              item={this.state.item} titleHandler={this.titleHandler} pointHandler={this.pointHandler} handleSubmit={this.handleSubmit} editItem={this.state.editItem} id={"testModal"} />
          </div>
        </div>


      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    projects: state.proj.projects,
    author: state.auth.lastName,
    criteriaLists: state.criteria.criterias
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCriteria: () => {
      dispatch(actions.onFetchCriterias());
    },
    createCriteria: (data) => {
      dispatch(actions.onCreateCriteria(data));
    },
    deletCriteria: (data) => {
      dispatch(actions.onDeleteCriteria(data));
    },
    updateCriteria: (data) => {
      dispatch(actions.onUpdateCriteria(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Criteria);