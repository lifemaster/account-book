import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddUserPopup extends React.Component {
  constructor(props) {
    super(props);

    this.formSubmitHandler = this.formSubmitHandler.bind(this);

    this.state = {
      role: 'user',
      openStateNotifier: false,
      errorText: ''
    };
  }

  handleRoleChange = (e, index, value) => {
    this.setState({ role: value });
  }

  formSubmitHandler(e) {
    e.preventDefault();
    const login = this.refs.login.input.value;
    const name = this.refs.name.input.value;
    const role = this.state.role;
    const password = this.refs.password.input.value;
    const confirmedPassword = this.refs.confirmPassword.input.value;

    if(password !== confirmedPassword) {
      this.setState({
        openStateNotifier: true,
        errorText: 'Пароли не совпадают!'
      });
      return;
    }

    this.props.onSubmit({ login, name, role, password });
  }

  closeHandler = e => {
    this.setState({ role: 'user' });
    this.props.onClose();
  }

  handleCloseNotifier = () => {
    this.setState({ openStateNotifier: false });
  }

  render() {
    const form = 
    <form onSubmit={this.formSubmitHandler}>
      <TextField
        className="textFiled"
        fullWidth={true}
        type="text"
        ref="login"
        floatingLabelText="Логин"
        required
      />
      <TextField
        className="textFiled"
        fullWidth={true}
        type="text"
        ref="name"
        floatingLabelText="Имя"
        required
      />
      <SelectField
        floatingLabelText="Роль"
        value={this.state.role}
        onChange={this.handleRoleChange}
      >
        <MenuItem value="admin" primaryText="Админ" />
        <MenuItem value="user" primaryText="Пользователь" />
      </SelectField>
      <TextField
        className="textFiled"
        fullWidth={true}
        type="password"
        ref="password"
        floatingLabelText="Пароль"
        required
      />
      <TextField
        className="textFiled"
        fullWidth={true}
        type="password"
        ref="confirmPassword"
        floatingLabelText="Подтвердите пароль"
        required
      />
      <div className="button-container">
        <RaisedButton
          label="Добавить"
          type="submit"
          primary={true}
        />
      </div>
    </form>

    return(
      <div>
        <Dialog
          title="Добавление пользователя"
          modal={this.props.modal}
          open={this.props.open}
          onRequestClose={this.closeHandler}
          contentStyle={{ width: '95%', maxWidth: '480px' }}
          bodyStyle={{ height: '100%' }}
          titleStyle={{ textAlign: 'center' }}
          autoScrollBodyContent={true}
        >
          <div className="form-container">
            <IconButton className="close-btn" onClick={this.closeHandler}>
              <i className="material-icons">close</i>
            </IconButton>
            {form}
          </div>
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

AddUserPopup.propTypes = {
  modal: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AddUserPopup;
