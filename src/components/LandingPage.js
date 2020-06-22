import React from 'react';

import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink } from "react-router-dom";
import {connect} from 'react-redux';
import Loader from './UI/Loader';
import Copyright from './Copyright'


const useStyles = makeStyles((theme) => ({
'@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  icon: {
    marginRight: theme.spacing(2),
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
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  }
}));


function LandingPage(props) {
  const classes = useStyles();
  
  return (
    <React.Fragment>    
      <main>            
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Task App
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             Built using nodejs, mongodb and reactjs.
            </Typography>
            {props.loader ? <Loader /> : 
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                {props.isAuth ? 
                    <Grid item>                 
                      <RouterLink to="/taskApp">
                        <Button variant="contained" color="primary">
                        taskApp</Button>
                      </RouterLink>                  
                    </Grid> : 
                  <> 
                    <Grid item>                 
                      <RouterLink to="/signin">
                        <Button variant="contained" color="primary">
                        Signin</Button>
                      </RouterLink>                   
                    </Grid>          
                    <Grid item>       
                      <RouterLink to="/signup">
                          <Button variant="outlined" color="primary"> Signup</Button>
                      </RouterLink>   
                    </Grid>     
                  </> }
                </Grid>
              </div>
            }
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>                
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {  
  return {
    isAuth : state.authReducer.isAuth,
    loader : state.authReducer.loader
  }
}

export default connect(mapStateToProps, null)(LandingPage);