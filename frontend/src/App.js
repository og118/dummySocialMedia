import React from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import Posts from './Containers/Posts/Posts';
import { Route, Switch } from 'react-router-dom'
import Authenticate from './Containers/Authentication/Authenticate';


function App() {
  return (
    <Layout>
        <Route path="/" exact component={Posts} />
        <Route path="/authenticate" component={Authenticate} />

      {/* <Route path="/authenticate/signup" component={Signup} /> */}
    </Layout>
  );
}

export default App;
