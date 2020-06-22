import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import AssignmentTurnedInOutlined from '@material-ui/icons/AssignmentTurnedInOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Loader from './UI/Loader';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddTask(props) {
  const classes = useStyles();
  const [description, setDescription] = useState('');  
  

  const handleSubmitHelper = async (e) => {
    e.preventDefault();

    let formData = {
        description
    }    
    await props.addTask(formData);
    props.handleClose();
  }
  
  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentTurnedInOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a Task
        </Typography>
        <form 
            className={classes.form} 
            noValidate
            onSubmit={handleSubmitHelper}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="off"
                name="description"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                autoFocus
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
              />
            </Grid>                 
          </Grid>
          {props.loader ? <Loader /> : null }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled = {props.loader}
            className={classes.submit}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}