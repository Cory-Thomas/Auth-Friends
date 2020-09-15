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
            <section>
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
        )
    };
};

export default FriendsList;