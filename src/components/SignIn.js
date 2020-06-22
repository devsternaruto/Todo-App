import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as authActionCreators from '../actions/authActions';
import * as commonActionsCreators from '../actions/commonActions'
import {Link as RouterLink } from "react-router-dom";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn (props) {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  

  const { dispatch } = props
  const authActions = bindActionCreators(authActionCreators, dispatch);
  const commonActions = bindActionCreators(commonActionsCreators, dispatch);


  const handleSubmitHelper = async (e) => {
    e.preventDefault();    
    let formData = {
        email,
        password
    }
    await commonActions.clearError();
    await authActions.signIn(formData)
    .then(res => {      
      if(res.token) {   
        props.history.push('/'); 
      }        
    }).catch(e=>{
      console.log(e)
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
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(e)=>{handleSubmitHelper(e)}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {props.loader ? <Loader /> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}     
              disabled= {props.loader}       
            >
              Sign In
            </Button>          
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <RouterLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
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

export default connect(mapStateToProps)(SignIn);