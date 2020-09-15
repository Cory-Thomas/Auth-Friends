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

class FriendsList extends React.Component {
    state = {
        friends: []
    }

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

    render() {
        return (
            <>
                <form>
                    <div>
                        <label htmlFor='name'>Name: </label>
                        <input id='name' />
                    </div>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input id='email' />
                    </div>
                    <div>
                        <label htmlFor='age'>Age: </label>
                        <input id='age' />
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