import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    
  }
  
}));

export default function PaginationControlled(props) {
  const classes = useStyles();  
  const handleChange = (event, value) => {    
    props.changePage(value)
    props.fetchTaskList(value)
  };
  let from = props.page * props.limit - props.limit + 1
  let to = props.page * props.limit  
  if(to > props.count ) {  
      to = props.count 
  }

 
  return (
    <div className={classes.root, 'paginationCountWrap'}>
      <Typography variant="sm">{from} - {to} of {props.count}</Typography>
      <Pagination count={Math.ceil(props.count / props.limit)} page={props.page} onChange={handleChange} />
    </div>
  );
}