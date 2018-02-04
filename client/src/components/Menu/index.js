import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { appDrawerToggle } from '../../actions';

import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import './index.css';

import menu from './menu';

function Menu(props) {
  function _buildMenuItem(item, index) {
    const listItemProps = {
      key: index,
      primaryText: item.title,
      leftIcon: <FontIcon className="material-icons">{item.iconName}</FontIcon>
    };

    if (item.route) {
      const navLinkProps = (item.route === '/') ? { exact: true } : {};
      listItemProps.containerElement = <NavLink to={item.route} {...navLinkProps} />;
      listItemProps.onClick = props.onCloseDrawer;
    } else {
      listItemProps.primaryTogglesNestedList = true;
      listItemProps.nestedItems = item.nestedItems.map(_buildMenuItem);
    }

    return <ListItem {...listItemProps} />;
  }

  const menuItems = menu[props.userObj.role];

  return (
    <List>
      {menuItems.map(_buildMenuItem)}
    </List>
  );
}

function mapStateToProps(state) {
  return {
    userObj: state.auth.userObj
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseDrawer: () => dispatch(appDrawerToggle(false))
  }
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default withRouter(MenuContainer);
