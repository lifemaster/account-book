import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { appDrawerToggle } from '../../actions';

import { teal500 } from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';

import Menu from '../Menu';

const subHeaderStyles = {
  height: '64px',
  padding: 0,
  background: teal500,
  color: '#FFF',
  textAlign: 'center',
  fontSize: '18px',
  lineHeight: '64px'
}

function AppDrawer(props) {
  return (
    <Drawer
      docked={false}
      width={250}
      open={props.opened}
      onRequestChange={open => props.onToggle(open)}>

      <Subheader style={subHeaderStyles}>Меню</Subheader>

      <Menu />

    </Drawer>
  );
}

function mapStateToProps(state) {
  return {
    opened: state.drawer.opened
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onToggle: isOpened => dispatch(appDrawerToggle(isOpened))
  }
}

const AppDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(AppDrawer);

export default withRouter(AppDrawerContainer);
