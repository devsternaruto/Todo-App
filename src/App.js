import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Signup from './components/Signup'
import SignIn from './components/SignIn'
import TaskPage from './components/TaskPage';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/ProfilePage'
import Appbar from './components/Appbar';
import './App.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import {bindActionCreators} from 'redux';
import * as authActionCreators from './actions/authActions';
import * as userActionCreators from './actions/userActions';
import {connect} from 'react-redux';

class App extends React.Component {
  
  authActions = bindActionCreators(authActionCreators, this.props.dispatch)
  userActions = bindActionCreators(userActionCreators, this.props.dispatch)

  async componentDidMount () {
    if(window.localStorage.getItem('token')) {
      await this.authActions.authenticate();        
    }  
  }
  
  render() {    
    // console.log(this.props, 'props from App.js')
    return (
      <Router>
          <div>
            <Appbar/>
            <Switch>          
              <ProtectedRoutes
                isAuth = {this.props.isAuth}                
                component={TaskPage} 
                path="/taskapp"
                exact
              />
              <ProtectedRoutes
                isAuth = {this.props.isAuth}                
                component={ProfilePage} 
                path="/profile"
                exact
              />
              <PublicRoutes
                isAuth = {this.props.isAuth}                
                component={SignIn} 
                path="/signin"
                exact
              />
              <PublicRoutes
                isAuth = {this.props.isAuth}                
                component={Signup} 
                path="/signup"
                exact
              />           
              <Route path="/" render={()=> <LandingPage />}/>
            </Switch>
          </div>
    </Router>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    isAuth : state.authReducer.isAuth
  }
}
export default connect(mapStateToProps)(App);
