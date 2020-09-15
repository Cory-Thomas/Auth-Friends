import React from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
    state = {
        credentials: {
          username: "",
          password: ""
        },
        error: ""
    };
    
    handleChange = event => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [ event.target.name ]: event.target.value
            },
            error: ""
        });
    };

    login = event => {
        event.preventDefault();

        axiosWithAuth()
            .post( "/api/login", this.state.credentials )
            .then( response => {
                localStorage.setItem( "token", response.data.payload );
                this.props.history.push( "/protected" );
            })
            .catch( err => {
                this.setState({
                    error: err.response.data.error
                });
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>Log in</button>
                </form>
                <p style={{ color: "red" }}>{this.state.error}</p>
            </div>
        )
    };
};

export default Login;