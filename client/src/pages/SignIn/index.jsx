import React from 'react';
import { connect } from 'react-redux';

import { signIn } from '../../actions';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import config from '../../config';

import './index.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.focusFieldHandler = this.focusFieldHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);

    this.state = {
      mainErrorText: ''
    };
  }

  focusFieldHandler(e) {
    this.setState({ mainErrorText: '' });
  }

  formSubmitHandler(e) {
    e.preventDefault();

    const self = this;
    const login = self.refs.login.input.value;
    const password = self.refs.password.input.value;

    fetch(`${config.serverURI}/api/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password })
    })
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
      else {
        self.setState({ mainErrorText: 'Неверные логин и/или пароль' });
        return null;
      }
    })
    .then(data => {
      if(data) {
        self.props.onSignIn(data.token, data.userObj);
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="paper-container">
          <Paper>
            <div className="header">
              <h3>Авторизация</h3>
            </div>
            {this.state.mainErrorText ? <p className="alert">{this.state.mainErrorText}</p> : ''}
            <form id="form" onSubmit={this.formSubmitHandler}>
              <TextField
                className="textFiled"
                fullWidth={true}
                type="text"
                ref="login"
                floatingLabelText="Логин"
                required
                onFocus={this.focusFieldHandler}
              />
              <TextField
                className="textFiled"
                fullWidth={true}
                type="password"
                ref="password"
                floatingLabelText="Пароль"
                required
                onFocus={this.focusFieldHandler}
              />
              <div className="button-container">
                <RaisedButton
                  label="Войти"
                  type="submit"
                  primary={true}
                />
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSignIn: (token, userObj) => dispatch(signIn(token, userObj))
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
