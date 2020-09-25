import React from "react";
import styled from 'styled-components';
import { axiosWithAuth } from "../utils/axiosWithAuth";

const StyledForm = styled.form`
    width: 30%;
    margin: 0 auto;
    text-align: center;

    div {
        padding: 1%;
        margin: 1%;
    }
    
    button {
        padding: 2%;
        margin: 2%;
        width: 125px;
    }
`;
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
                <StyledForm onSubmit={this.login}>
                    <div>
                        <label htmlFor='username'><strong>Username: </strong></label>
                        <input
                            type="text"
                            name="username"
                            id='username'
                            value={this.state.credentials.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'><strong>Password: </strong></label>
                        <input
                            type="password"
                            name="password"
                            id='password'
                            value={this.state.credentials.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button>Log in</button>
                </StyledForm>
                <p style={{ color: "red" }}>{this.state.error}</p>
            </div>
        )
    };
};

export default Login;