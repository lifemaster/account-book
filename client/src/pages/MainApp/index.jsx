import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppHeader from '../../components/AppHeader';
import AppDrawer from '../../components/AppDrawer';
import NotFound from '../../pages/NotFound';
import MainPage from '../../pages/MainPage';
import UsersPage from '../../pages/Users';
import MenuItem3Page from '../../pages/menu-item3-page/menu-item3-page';
import MenuItem4Page from '../../pages/menu-item4-page/menu-item4-page';
import MenuItem5Page from '../../pages/menu-item5-page/menu-item5-page';

import './index.css';

function MainApp(props) {
  return(
    <div>
      <AppHeader />

      <AppDrawer />

      <div className="main-content">
        {
          props.userObj.role === 'admin'
          ?
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/admin/users" component={UsersPage} />
            <Route path="/admin-menu-item-3" component={MenuItem3Page} />
            <Route path="/admin-menu-item-4" component={MenuItem4Page} />
            <Route path="/admin-menu-item-5" component={MenuItem5Page} />
            <Route component={NotFound} />
          </Switch>
          :
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route component={NotFound} />
          </Switch>
        }
      </div>
    </div>
  );
}

function setStateToProps(state) {
  return {
    userObj: state.auth.userObj
  }
}

const MainAppContainer = connect(setStateToProps)(MainApp);

export default withRouter(MainAppContainer);
