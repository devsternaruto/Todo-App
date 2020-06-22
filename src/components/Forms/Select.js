import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      margin:0
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function SelectInput (props) {
    const classes = useStyles();
    return (

    <FormControl className={[classes.formControl,props.wrapperClass ].join(' ')}>
        <InputLabel id="taskStatus">{props.labelName}</InputLabel>
        <Select
            className={props.className}
            labelId={props.labelId}
            name={props.labelId}
            id={props.labelId}
            value={props.value}            
            onChange={(e)=>{props.changeHandler(e)}} 
        >
            {props.optionsData.map(option=><MenuItem value={option.value}>{option.label}</MenuItem>)}            
        </Select>
    </FormControl>

    )
}
export default SelectInput

