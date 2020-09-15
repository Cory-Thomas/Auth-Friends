import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

const StyledSection = styled.section`
    width: 80%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-wrap: wrap;

    .friend {
        width: 30%;
        padding: 4%;
        margin: 2%;
        background-color: lightblue;

        div {
            padding: 2%;
        }
    }
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
            })//
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
                <form onSubmit={ this.handleSubmit }>
                    <div>
                        <label htmlFor='name'>Name: </label>
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
                        <label htmlFor='email'>Email: </label>
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
                        <label htmlFor='age'>Age: </label>
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
                </form>
                <h2>Friends List</h2>
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