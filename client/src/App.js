import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MainApp from './pages/MainApp';
import SignIn from './pages/SignIn';
import Loading from './components/Loading';

function App(props) {
  let signInRouteComponent;
  let otherRoutesComponent;

  switch(props.authStatus) {
    case 'unauthorized':
      signInRouteComponent = <SignIn />;
      otherRoutesComponent = <Redirect to="/sign-in" />;
      break;
    case 'pending':
      signInRouteComponent = <Loading />;
      otherRoutesComponent = <Loading />;
      break;
    case 'authorized':
      signInRouteComponent = <Redirect to="" />;
      otherRoutesComponent = <MainApp />;
      break;
    default:
      break;
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/sign-in" render={() => signInRouteComponent} />
        <Route path="*" render={() => otherRoutesComponent} />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authStatus: state.auth.authState
  };
}

const AppContainer = connect(mapStateToProps)(App);

export default withRouter(AppContainer);
