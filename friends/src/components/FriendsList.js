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
            <div>Friend</div>
        )
    };
};

export default FriendsList;