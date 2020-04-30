import React from 'react';
import styles from './Student.module.css';

class StudentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  Add = () => {
    console.log(this)
  if (this.props.Adds instanceof Function) this.props.Adds();
  }
  componentDidMount(){
    console.log(this)
  }
  render() {
  
    return (
      <div>    

        <div className={styles.main}>
          <h1>Student List</h1>
          <div className={styles.add} onClick={()=>this.Add()}>
            Add
          </div>
          <div className={styles.Import} onClick={()=>this.Import()}>
            Import
          </div>
        </div>

        <div className={styles.bar}>
          <p>Number</p>
          <p className={styles.pp}>Name</p>
          <p>Email</p>
        </div>

        <ul className={styles.ull}>
          <li>999999</li>
          <li className={styles.lii}>James</li>
          <li>james@gmail.com<span>delate</span></li>
        </ul>
       
      </div>
    );
  }
}

export default StudentList;