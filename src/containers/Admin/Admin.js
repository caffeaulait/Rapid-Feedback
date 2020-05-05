import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Projects from './Projects/Projects';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProjectDetail from './ProjectDetail/ProjectDetail';
import ProjectEdit from './ProjectEdit/ProjectEdit';

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
        {/* <DatePicker
          selected={this.state.date}
          onChange={this.selectDate}
        ></DatePicker> */}
        <Switch>
          <Route
            path={url + '/projects/:id/edit'}
            component={ProjectEdit}
          ></Route>
          <Route path={url + '/projects/:id'} component={ProjectDetail}></Route>
          <Route path={url + '/projects'} component={Projects}></Route>
          <Redirect from={url} to={url + '/projects'}></Redirect>
        </Switch>
      </>
    );
  }
}

export default Admin;
