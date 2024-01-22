import React, {useContext} from 'react';
// import {Router} from '@reach/router';
import MainPage from '../containers/MainPage/index'
import Login from '../containers/Login/index'
import Signup from '../containers/Signup/index'
import { AuthProvider, } from "../contexts/AuthContext"

import PrivateRoute from "../containers/PrivateRoute/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
const RouterScreen = () => {
    return (
        <Router> 
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={MainPage} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </AuthProvider>         
        </Router>
    )
}

export default RouterScreen;