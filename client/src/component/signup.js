import React, { Component } from "react";
import axios from "axios";
import "./signup.css";

class Signup extends Component {
    register(e) {
        e.preventDefault();
        console.log(e.target.firstname.value);
        const fname = e.target.firstname.value,
            lname = e.target.lastname.value,
            email = e.target.email.value,
            password = e.target.password.value,
            rollno = e.target.rollno.value,
            user = {
                fname,
                lname,
                email,
                rollno,
                password
            };
        axios.post('/user/register', user).then((res) => {
            console.log(res);
            //token extract from res.data
            var token = res.data.token;
            //save in cookie
            document.cookie = `result_email=${token}`;
        });
    }
    render() {
        return (

            <div>
                <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' rel='stylesheet' type='text/css' />
                <link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet" />


                <div className="testbox">
                    <h1>Registration</h1>

                    <form onSubmit={this.register} >
                        <hr />
                        <label id="icon" htmlFor="name"><i className="icon-user"></i></label>
                        <input type="text" name="name" id="firstname" placeholder="First Name" required />
                        <label id="icon" htmlFor="name"><i className="icon-user"></i></label>
                        <input type="text" name="name" id="lastname" placeholder="Last Name" required />
                        <label id="icon" htmlFor="name"><i className="icon-user"></i></label>
                        <input type="text" name="name" id="rollno" placeholder="Roll no" required />
                        <label id="icon" htmlFor="name"><i className="icon-envelope "></i></label>
                        <input type="text" name="name" id="email" placeholder="Email" required />
                        <label id="icon" htmlFor="name"><i className="icon-shield"></i></label>
                        <input type="password" name="name" id="password" placeholder="Password" required />

                        <button type="submit" className="button">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;
