import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import "./signup.css";


class Login extends Component {
    state = {
        redirect: false
    };
    login(e) {
        e.preventDefault();
        const email = e.target.email.value,
            password = e.target.password.value,
            user = {
                email,
                password
            };
        axios.post('/user/login', user).then((res) => {
            document.cookie = `result_email=${res.data.token}`;
            this.setState({ redirect: true });
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/' }} />
        }
        return (

            <div>
                <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' rel='stylesheet' type='text/css' />
                <link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet" />

                <div className="testbox">
                    <h1>Login</h1>

                    <form onSubmit={this.login.bind(this)} >
                        <label id="icon" htmlFor="name"><i className="icon-envelope "></i></label>
                        <input type="text" name="name" id="email" placeholder="Email" required />
                        <label id="icon" htmlFor="name"><i className="icon-shield"></i></label>
                        <input type="password" name="name" id="password" placeholder="Password" required />
                        <button type="submit" className="button">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
