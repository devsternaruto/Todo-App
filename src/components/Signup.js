import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import {Link as RouterLink } from "react-router-dom";
import { bindActionCreators } from 'redux'
import * as commonActionsCreators from '../actions/commonActions'
import * as authActionCreators from '../actions/authActions'
import Loader from './UI/Loader';
import Alert from '@material-ui/lab/Alert';
import Copyright from './Copyright';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp (props) {
  const { dispatch } = props
  const authActions = bindActionCreators(authActionCreators, dispatch)
  const commonActions = bindActionCreators(commonActionsCreators, dispatch);

  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmitHelper = async (e) => {    
    e.preventDefault();

    let formData = {
        name,
        email,
        password
    }
    await commonActions.clearError();
    await authActions.signUp(formData)
      .then(res=>{
        console.log(res, 'res')
        if(res.token) {
          props.history.push('/')
        }        
      }).catch(e=>{
        console.log(e);
      })
  }
  
  return (
    <div>
      {props.errorMessage && <Alert severity="error" onClose={() => {commonActions.clearError()}}>{props.errorMessage}</Alert>     }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          <RouterLink to="/taskApp"> 
            Sign up
          </RouterLink>
          </Typography>
          <form 
              className={classes.form} 
              onSubmit={handleSubmitHelper}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </Grid>          
            </Grid>
            {props.loader ? <Loader /> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled= {props.loader}   
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/signin" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loader : state.authReducer.loader,
    errorMessage : state.authReducer.errorMessage
  }
}

export default connect(mapStateToProps)(SignUp);