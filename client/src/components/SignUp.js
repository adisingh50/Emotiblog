import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '.././styleSheets/SignUp.css'
import LogInComponent from ".././Login";
import ReactDOM from 'react-dom';
import axios from 'axios';
import Home from "./Home";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.goLogIn = this.goLogIn.bind(this);
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
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

    goLogIn() {
        ReactDOM.render(<LogInComponent/>, document.getElementById('root'));
    }

    updateWarning(errors) {
        var x = document.getElementById("warnText");
        x.innerHTML = errors;
    }

    onSubmit(e) {
        e.preventDefault();

        const signUpDude = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        axios.post("http://localhost:5000/account/signup", signUpDude)
            .then(response => {
                this.updateWarning(response.data);

                const {status, person} = response.data;
                const succ = status.substring(0, 11) === "Signed Up !";
                if (succ) {
                    ReactDOM.render(<Home userLoggedIn={person}/>, document.getElementById('root'));
                }
            });

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
    }

    render() {
        return (
            <div className="container-signup">
                <div>
                    <br></br>
                    <h1 className="sign-up-group"> Welcome to EmotiBlog!</h1>
                    <br></br>
                    <h3 className="sign-up-group">Sign Up</h3>
                </div>

                <form onSubmit={this.onSubmit}>
                    <div className="sign-up-group">
                        <label><strong>First Name: </strong></label>
                        <input type="text"
                            required
                            className="m-2"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                            />
                    </div>

                    <div className="sign-up-group">
                        <label><strong>Last Name: </strong></label>
                        <input type="text"
                            required
                            className="m-2"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                            />
                    </div>

                    <div className="sign-up-group">
                        <label><strong>Email: </strong></label>
                        <input type="text"
                            required
                            className="m-2"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            />
                    </div>

                    <div className="sign-up-group">
                        <label><strong>Password: </strong></label>
                        <input type="text"
                            required
                            className="m-2"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                    </div>

                    <label id="warnText" className="warning-signup"><strong></strong></label>
                    <br></br>
                    <br></br>
                    <div className="sign-up-group">
                        <input type="submit"
                            value="Sign Up"
                            onClick={this.onSubmit}
                            />
                    </div>
                    <br></br>
                    <div className="login-group">
                    <button type="button"
                        onClick={this.goLogIn}>Already Have An Accout? Log In!</button>
                    </div>
                    <br></br>
                </form>
            </div>
        )
    }
}

export default SignUp;