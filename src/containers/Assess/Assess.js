import React from 'react';
import Header from '../../components/Header/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Marking from './Marking/Marking';


class Assess extends React.Component {

  state = {};


  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace('/login');
    }
    let url = this.props.match.url;
    return (
      <>
        <Header></Header>
        <Switch>
          <Route
            path={url + '/marking'}
            component={Marking}
          ></Route>

          <Redirect from={url} to={url + '/marking'}></Redirect>

        </Switch>

      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Assess);
