import React from 'react';
import './index.css';

import config from '../../config';
import cookie from '../../cookie';

import ReactTable from "react-table";
import "react-table/react-table.css";

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import AddUserPopup from '../../components/AddUserPopup';
import EditUserPopup from '../../components/EditUserPopup';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isAddUserDialogOpened: false,
      isEditUserDialogOpened: false,
      isRemoveUserDialogOpened: false,
      deletableUser: {},
      editableUser: {},
      openStateNotifier: false,
      errorText: ''
    }

    this.roles = {
      admin: 'Админ',
      user: 'Пользователь'
    }
  }

  componentDidMount() {
    const self = this;
    fetch(`${config.serverURI}/api/users`, {
      method: 'GET',
      headers: { 'Authorization': `JWT ${cookie.get(config.authCookieName)}` }
    })
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
      else {
        return null;
      }
    })
    .then(data => {
      if(data) self.setState({ users: data });
    })
    .catch(err => console.log(err));
  }

  getDateFromMs(ms) {
    const data   = new Date(ms);
    const day    = this.addZero(data.getDate());
    const month  = this.addZero(data.getMonth() + 1);
    const year   = data.getFullYear();
    const hour   = this.addZero(data.getHours());
    const minute = this.addZero(data.getMinutes());
    const second = this.addZero(data.getSeconds());

    return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
  }

  addZero(number) {
    return (number < 10) ? `0${number}` : number;
  }

  showAddUserPopup = () => {
    this.setState({ isAddUserDialogOpened: true });
  }

  handleAddUserSubmit = data => {
    const self = this;

    fetch(`${config.serverURI}/api/sign-up`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${cookie.get(config.authCookieName)}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
      else {
        return response.text();
      }
    })
    .then(data => {
      if(typeof data === 'object') {
        let users = self.state.users;
        users.push(data);
        this.setState({ users, isAddUserDialogOpened: false });
      }
      else {
        self.setState({
          openStateNotifier: true,
          errorText: data
        });
      }
    })
    .catch(err => console.log(err));
  }

  closeAddUserDialog = () => {
    this.setState({ isAddUserDialogOpened: false });
  }

  showEditUserPopup = (props) => {
    const user = props.original;
    this.setState({
      isEditUserDialogOpened: true,
      editableUser: user
    });
  }

  handleEditUserSubmit = (data, callback) => {
    const self = this;

    if(!data.password) delete data.password;

    fetch(`${config.serverURI}/api/user/${self.state.editableUser._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `JWT ${cookie.get(config.authCookieName)}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
      else {
        return response.text();
      }
    })
    .then(data => {
      if(typeof data === 'object') {
        let users = self.state.users;
        const index = users.findIndex(user => self.state.editableUser._id === user._id);
        users[index] = data;
        self.setState({ users, isEditUserDialogOpened: false, editableUser: {} });
        if(typeof callback === 'function') callback(true);
      }
      else {
        self.setState({
          openStateNotifier: true,
          errorText: data
        });
        if(typeof callback === 'function') callback(false);
      }
    })
    .catch(err => console.log(err));
  }

  closeEditUseDialog = () => {
    this.setState({ isEditUserDialogOpened: false, editableUser: {} });
  }

  showRemoveUserPopup = (props) => {
    const user = props.original;
    this.setState({
      isRemoveUserDialogOpened: true,
      deletableUser: user
    });
  }

  confirmRemoveUserDialog = () => {
    const self = this;

    fetch(`${config.serverURI}/api/user/${self.state.deletableUser._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${cookie.get(config.authCookieName)}`
      }
    })
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
      else {
        return response.text();
      }
    })
    .then(data => {
      if(typeof data === 'object') {
        const index = this.state.users.findIndex(user => user._id === data._id);

        let users = this.state.users;
        users.splice(index, 1);
        self.setState({ users });
      }
      else {
        self.setState({
          openStateNotifier: true,
          errorText: data
        });
      }
      self.setState({
        isRemoveUserDialogOpened: false,
        deletableUser: {}
      });
    })
    .catch(err => console.log(err));
  }

  closeRemoveUserDialog = () => {
    this.setState({ isRemoveUserDialogOpened: false });
  }

  handleCloseNotifier = () => {
    this.setState({ openStateNotifier: false });
  }

  render() {
    const tableColumns = [
      {
        Header: 'ID',
        accessor: '_id',
        show: false,
        headerClassName: 'table-header-cell'
      },
      {
        Header: 'Логин',
        accessor: 'login',
        className: 'cell-container',
        headerClassName: 'table-header-cell'
      },
      {
        Header:'Имя',
        accessor: 'name',
        className: 'cell-container',
        headerClassName: 'table-header-cell'
      },
      {
        Header: 'Роль',
        accessor: user => this.roles[user.role],
        id: 'Role',
        className: 'cell-container',
        headerClassName: 'table-header-cell'
      },
      {
        Header: 'Создан',
        accessor: user => this.getDateFromMs(user.created),
        id: 'Created',
        className: 'cell-container',
        headerClassName: 'table-header-cell'
      },
      {
        Header: 'Действия',
        Cell: props => {
          return (
            <div className="cell-container">
              <IconButton onClick={() => this.showEditUserPopup(props)}>
                <i className="material-icons">mode_edit</i>
              </IconButton>
              <IconButton onClick={() => this.showRemoveUserPopup(props)}>
                <i className="material-icons">delete</i>
              </IconButton>
            </div>
          )
        },
        headerClassName: 'table-header-cell'
      }
    ];

    const removeUserActions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onClick={this.closeRemoveUserDialog}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.confirmRemoveUserDialog}
      />
    ];

    return (
      <div className="user-content">
        <div className="add-user-btn-container">
          <RaisedButton
            label="Добавить"
            primary={true}
            onClick={this.showAddUserPopup}
          />
        </div>
        <ReactTable
          data={this.state.users}
          showPagination={this.state.users.length > 20}
          minRows={1}
          columns={tableColumns}
        />
        <AddUserPopup
          modal={true}
          open={this.state.isAddUserDialogOpened}
          onClose={this.closeAddUserDialog}
          onSubmit={this.handleAddUserSubmit}
        />
        <EditUserPopup
          modal={true}
          open={this.state.isEditUserDialogOpened}
          onClose={this.closeEditUseDialog}
          onSubmit={this.handleEditUserSubmit}
          user={this.state.editableUser}
        />
        <Dialog
          title="Удаление пользователя"
          actions={removeUserActions}
          modal={false}
          open={this.state.isRemoveUserDialogOpened}
          onRequestClose={this.closeRemoveUserDialog}
          contentStyle={{ width: '95%', maxWidth: '480px' }}
          titleStyle={{ textAlign: 'center' }}
          autoScrollBodyContent={true}
        >
          Вы действительно хотите удалить пользователя<br/>
          "{this.state.deletableUser.name}"?
        </Dialog>
        <Snackbar
          open={this.state.openStateNotifier}
          message={this.state.errorText}
          autoHideDuration={4000}
          onRequestClose={this.handleCloseNotifier}
          bodyStyle={{ minWidth: 'auto' }}
        />
      </div>
    );
  }
}

export default UsersPage;
