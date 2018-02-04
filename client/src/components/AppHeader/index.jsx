import React from 'react';
import { connect } from 'react-redux';

import { appDrawerToggle, signOut } from '../../actions';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

function AppHeader(props) {
  return (
    <div>
      <AppBar
        title={props.title}
        onLeftIconButtonTouchTap={props.onMenuClick}
        iconElementRight={<FlatButton label="Выход" primary={true} onClick={props.onSignOut} />}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    title: state.currentPage.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onMenuClick: () => dispatch(appDrawerToggle(true)),
    onSignOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
