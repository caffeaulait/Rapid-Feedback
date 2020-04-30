import React from 'react';
import styles from './Stu.module.css';
import ReactDom from 'react-dom';
import Header from '../Header/Header';
import StudentList from './StudentList';
import AddStudent from './AddStudent';
class Stu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stu:0,
      addst:1
    };

   
  }

  
componentDidMount(){
  console.log(this)
}
  Addst = () => {
   this.setState({
     stu:1,
     addst:0
   })
  }
Subs=()=>{
  this.setState({
    stu:0,
    addst:1
  })
}
  render() {
    return (
      <div>
        <Header />
         <div className={this.state.stu === 1 ? styles.Addst : styles.Addsts}>
          <AddStudent Sub={this.Subs}/>
        </div>
        <div className={this.state.addst === 1 ? styles.List : styles.Lists}>
          <StudentList Adds={this.Addst}/>
        </div>
        


      </div>
    );
  }
}

export default Stu;