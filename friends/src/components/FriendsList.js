import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

const StyledForm = styled.form`
    width: 50%;
    margin: 0 auto;
    text-align: center;

    div {
        margin: 2%;

        input {
            padding: .6%;
        }
    }

    button {
        padding: 1.5%;
        width: 150px;
    }
`;

const StyledSection = styled.section`
    width: 80%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-wrap: wrap;

    .friend {
        width: 30%;
        padding: 4%;
        margin: 1% auto;
        background-color: lightblue;

        div {
            padding: 2%;
        }
    }
`;

const StyledH2 = styled.h2`
    text-align: center;
`;

const initialValue = {
    name: '',
    age: '',
    email: '',
    id: Date.now
};

class FriendsList extends React.Component {
    state = {
        friends: [],
        form: initialValue
    };

    componentDidMount() {
        this.getData();
    };
    
    getData = () => {
        axiosWithAuth()
          .get( "/api/friends" )
          .then( response => {
            this.setState({
                friends: response.data
            })
          })
          .catch( error => {
              console.log( error )
          });
    };

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            form: {
                ...this.state.form,
                [ name ]: value
            }
        })
    };

    handleSubmit = event => {
        event.preventDefault()

        axiosWithAuth()
            .post("/api/friends", this.state.form)
            .then( response => {
                console.log(response.data)
                this.setState({
                    friends: response.data
                })
                this.setState({form: initialValue})
            })
    };

    render() {
        return (
            <>
                <StyledForm onSubmit={ this.handleSubmit }>
                    <div>
                        <label htmlFor='name'><strong>Name: </strong></label>
                        <input 
                            id='name' 
                            name='name'
                            value={this.state.form.name}
                            onChange={this.handleChange}
                            type='text'
                            placeholder='Enter name'
                        />
                    </div>
                    <div>
                        <label htmlFor='email'><strong>Email: </strong></label>
                        <input 
                            id='email' 
                            name='email'
                            value={this.state.form.email}
                            onChange={this.handleChange}
                            type='email'
                            placeholder='Enter email'
                        />
                    </div>
                    <div>
                        <label htmlFor='age'><strong>Age: </strong></label>
                        <input 
                            id='age' 
                            name='age'
                            value={this.state.form.age}
                            onChange={this.handleChange}
                            type='number'
                            placeholder='Enter age'
                        />
                    </div>
                    <button type='submit'>add friend</button>
                </StyledForm>
                <StyledH2>Friends List</StyledH2>
                <StyledSection>
                    { this.state.friends.map( friend => {
                        return (
                            <div className='friend'>
                                <div><strong>name:</strong> { friend.name }</div>
                                <div><strong>email:</strong> { friend.email }</div>
                                <div><strong>age:</strong> { friend.age }</div>
                            </div>
                        )
                    })}
                </StyledSection>
            </>
        )
    };
};

export default FriendsList;