import React from 'react';
import styles from './Student.module.css';

class AddStudent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stuId: '',
      stuName: '',
      email: ''
    };

    this.handleInputChange1 = this.handleInputChange1.bind(this);
    this.handleInputChange2 = this.handleInputChange2.bind(this);
    this.handleInputChange3 = this.handleInputChange3.bind(this);
  }
componentDidMount(){
  console.log(this)
}
  handleInputChange1(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      stuId: value,
    });
  }

  handleInputChange2(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      stuName: value,
    });
  }

  handleInputChange3(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      email: value
    });
  }

  Submit = () => {
    console.log(this.state)
    if (this.props.Sub instanceof Function) this.props.Sub();
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.title}>
          <h1>Add New Student</h1>
        </div>

        <div>
          <form>
            <label>
              StudentId:
                <input
                name="stuId"
                type="text"
                value={this.state.stuId}
                onChange={this.handleInputChange1} />
            </label>
            <label>
              Student Name:
                <input
                name="stuName"
                type="text"
                value={this.state.stuName}
                onChange={this.handleInputChange2}/>
            </label>
            <br />
            <label>
              Email:
                <input
                name="Email"
                type="text"
                value={this.state.Email}
                onChange={this.handleInputChange3} />
            </label>
          </form>
        </div>

        <div className="submit" onClick={this.Submit}>
          submit
        </div>


      </div>
    );
  }
}

export default AddStudent;