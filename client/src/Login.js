import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './styleSheets/Login.css'
import SignUpComponent from "./components/SignUp";
import axios from 'axios';
import Home from './components/Home'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      signUpPermission: true
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateWarning = this.updateWarning.bind(this);
    this.onGoSignUp = this.onGoSignUp.bind(this);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onGoSignUp(e) {
    ReactDOM.render(<SignUpComponent/>, document.getElementById('root'));
  }

  updateWarning(errors) {
    var x = document.getElementById("warnText");
    x.innerHTML = errors;
  }

  onSubmit(e) {
    e.preventDefault();

    const loginRequestDude = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post("http://localhost:5000/account/login", loginRequestDude)
      .then(response => {
        const {status, person} = response.data;
        this.updateWarning(status);
      
        const succ = status.substring(0, 11) === "Logged IN!!";
        if (succ) {
          ReactDOM.render(<Home userLoggedIn={person}/>, document.getElementById('root'));
        }
      });

    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
    return (
      <div className="container-login">
        <div>
          <br></br>
          <h1 className="login-group"> Welcome to EmotiBlog!</h1>
          <br></br>
          <h3 className="login-group">Login</h3>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="login-group m-2">
            <label><strong>Email: </strong></label>
            <input type="text"
              required
              className="m-2"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
          </div>

          <div className="login-group m-2">
            <label><strong>Password: </strong></label>
            <input type="password"
              required
              className="m-2"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
          </div>

          <label className="warning-login" id="warnText"><strong></strong></label>
          <br></br>

          <div className="login-group m-2">
            <input type="submit"
              value="Login"
              className="login-group"
              />
          </div>
        </form>

        <br></br>
        <div className="login-group">
          <button type="button"
            onClick={this.onGoSignUp}>Don't Have An Account? Sign Up Today!</button>
        </div>
        <br></br>
      </div>
    );
  }
}

export default Login;
