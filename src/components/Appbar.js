import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AssignmentTurnedInOutlined from '@material-ui/icons/AssignmentTurnedInOutlined';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';


import { deepOrange } from '@material-ui/core/colors';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import * as authActionCreators from '../actions/authActions'
import ProfileMenu from './ProfileMenu'

// import {Link as RouterLink } from "react-router-dom";
// import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
      },
      appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },      
      toolbar: {
        flexWrap: 'wrap',
      },
      toolbarTitle: {
        flexGrow: 1,
        color: theme.palette.primary.main,
      },
      link: {
        margin: theme.spacing(1, 1.5),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      },
      purple: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
}));
    

function Appbar(props) {    
    const classes = useStyles();

    const { dispatch } = props
    const authActions = bindActionCreators(authActionCreators, dispatch)

    const signOutHandler = async () => {    
      await authActions.signout()
        .then(res=>{
          if(res === 'Logged out') {
            props.history.push('/'); 
          }
        })
    }     
    return (
        <>
            <CssBaseline />
            <AppBar 
              position="static" color="default" elevation={0} className={['classes.appBar', 'appbar'].join(' ')}
              user = {props.user}
              signOutHandler={props.signOutHandler}
            >
            <Toolbar className={[classes.toolbar, 'toolbar'].join(' ')}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>                  
                  <Link to="/"><AssignmentTurnedInOutlined className={classes.icon} /></Link>                  
                </Typography>            
              {props.isAuth ? 
                <>           
                  <div style={{marginRight:'15px'}}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>                  
                      <Link to="/taskapp">Task App</Link>                  
                    </Typography>   
                  </div>
                                          
                    <ProfileMenu
                      {...props}
                      user = {props.user}
                      signOutHandler = {signOutHandler}
                    />                                       
                    
                  </>                
                : null }
            </Toolbar>
            </AppBar>
        </>
    )
}

const mapStateToProps = (state) => {
  return {
    isAuth :  state.authReducer.isAuth,
    user : state.authReducer.user
  }
}

export default connect(mapStateToProps)(Appbar);