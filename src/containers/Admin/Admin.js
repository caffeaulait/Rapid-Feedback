import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import Projects from './Projects/Projects';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Admin extends React.Component {
  state = {
    date: new Date(),
  };

  selectDate = (newDate) => {
    this.setState({ date: newDate });
    console.log(this.state.date);
  };

  render() {
    let url = this.props.match.url;
    return (
      <>
        <Header></Header>
        <p>This is admin page</p>
        <DatePicker
          selected={this.state.date}
          onChange={this.selectDate}
        ></DatePicker>
        <Switch>
          <Route path={url + '/projects'} component={Projects}></Route>
        </Switch>
      </>
    );
  }
}

export default Admin;
