import { Component } from 'react';

import Input from '../../components/Input/Input';
import classes from '../../main.module.css';

class Login extends Component {
    state = {
        UserName: '',
        Password: '',
        isLoggedIn: false,
        show: false,
    };

    OnInputHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    showForgotPassword = () => {
        this.setState({
            show: true
        });
    }

    loginHandler = () => {
        if (this.state.UserName === '' || this.state.Password === '') {
            alert("Please enter username or password");
        }
        else if (this.state.UserName !== 'mansi' || this.state.Password !== 'tatva123@') {
            alert("Invalid username or passwprd");
        }
        else {
            localStorage.setItem('authenticated', true);
            this.props.history.push("/manage-employees");
        }
    }

    passwordChangeHandler = () => {
        const newPass = this.state.Password;
        if (newPass.length !== 8) {
            alert('New password must be at least 8 characters long');
        }
        else {
            localStorage.setItem('authenticated', true);
            this.props.history.push("/manage-employees");
        }
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                {
                    this.state.show
                        ? <>
                            <Input label="New Password" name="Password" maxlength="8" fieldType="input" type="password" change={this.OnInputHandler} />
                            <button onClick={this.passwordChangeHandler} className={classes.btnForgorPass}>Change password</button>
                        </>
                        : <>
                            <h4>User login form</h4>
                            <Input label="UserName" name="UserName" fieldType="input" type="text" change={this.OnInputHandler} />
                            <Input label="Password" name="Password" fieldType="input" type="password" change={this.OnInputHandler} />
                            <button className={classes.btnLogin} onClick={this.loginHandler}>Login</button>&nbsp;&nbsp;
                            <p><button onClick={this.showForgotPassword} className={classes.btnForgorPass}>Forgot Password?</button></p>
                        </>
                }

            </div>
        );
    }
}

export default Login;