import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./Login";
import FriendsList from './FriendsList'
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={FriendsList} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
