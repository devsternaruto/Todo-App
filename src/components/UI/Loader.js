import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Loader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <div className={['loaderWrapper', props.absolute? 'absolute' : null].join(' ')}>
          <CircularProgress color="secondary" />
        </div>
    </div>
  );
}