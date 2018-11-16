import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
class PrivateRoute extends Component {
    state = {
        isAuthentic: false
    }

    componentWillMount() {
        const token = getCookie('result_email');
        if (token && !this.state.isAuthentic) {
            axios.get('/user', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res) {
                    this.setState({ isAuthentic: true });
                }
            });
        }
    }

    render() {
        const { component: ActualComponent, ...rest } = this.props;
        return <Route {...rest} render={(props) => (
            this.state.isAuthentic
                ? <ActualComponent {...props} />
                : <Redirect to={{ pathname: '/login' }} />
        )} />

    }
}

export default PrivateRoute;