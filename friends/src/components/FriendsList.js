import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class FriendsList extends React.Component {
    state = {
        friends: []
    }

    componentDidMount() {
        this.getData();
    };
    
    getData = () => {
        axiosWithAuth()
          .get("/api/friends")
          .then((res) => {
            console.log(res.data)
            this.setState({
                friends: res.data
            })
          })
          .catch((err) => console.log(err));
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
                <section>
                    <h2>Friends List</h2>
                    {this.state.friends.map( friend => {
                        return (
                            <div>
                                <div>name: {friend.name}</div>
                                <div>email: {friend.email}</div>
                                <div>age: {friend.age}</div>
                            </div>
                        )
                    })}
                </section>
            </>
        )
    };
};

export default FriendsList;