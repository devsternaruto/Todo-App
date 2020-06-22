import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import SelectInput from '../components/Forms/Select';
import FormControl from '@material-ui/core/FormControl';
import Pagination from './Pagination';
import Loader from './UI/Loader';

const useStyles = makeStyles({
  root: {
    width:'100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  desriptionForm : {
    display : 'inline-block'
  },
  desriptionFormWrap : {
    display:'flex',
    justifyContent: 'space-between',
  }
});


export default function TodoList(props) {

  const classes = useStyles();

  const searchTaskHandler = async (e) => {          
    let value = e.target.value
    props.setSearchValue(e.target.value);     
    
    await props.searchTaskHandler(e.target.value, props.taskStatus)
    await props.setSearchValueAction(value)    
    await props.changePage(1)
  }

  const toggleTaskStateHanlder = async (event, id)=> { 
    props.setCheckedItems({...props.checkedItems, [event.target.name + id] : event.target.checked });         
    await props.setTaskCompleteToggle(id, event.target.checked)    
  }

  const inputHandler = (e,id) => {
    props.setDescription({...props.description, [id] : e.target.value })
  }

  const deleteTaskHandler = async (id) => {
    await props.deleteTask(id);
  }

  const saveDescription = async (e, id, description) => {
    if(e) { e.preventDefault(); }    
    props.saveTaskData(id,description);    
  }

  const sortByData = [{value: 'all', label : 'All'}, {value: 'completed', label : 'Completed'}, {value: 'incomplete', label : 'Incomplete'}];
  const paginationData = [{value: 5, label : 5 }, {value: 10, label : 10}, {value: 50, label : 50}];


  return (
    
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className="header">
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Tasks
            </Typography>
        </div>        
        <div className={'actions-wrapper'}>
          <SelectInput 
            changeHandler = {props.sortByChangeHandler}
            value={props.sortBy}
            optionsData={sortByData}
            labelId={'taskStatus'}
            labelName={'Sort by'}
          />
          
          <FormControl>
            <TextField 
              id="searchTask" 
              label="Search"   
              value={props.searchValue}
              onChange={(e)=>{
                searchTaskHandler(e)
              }}            
            />
          </FormControl>
        
        </div>

        <div className="body todo-list">          
            {props.loader ? <Loader absolute={true} /> : null }
            {props.count === 0 && props.totalCount > 0 ? <p>No results for <strong> {props.searchValue}  </strong>  </p>: null }            
            {props.taskList && props.taskList.length > 0 && props.taskList.map((task, i)=>{
                return (
                <div key={task._id} className={classes.desriptionFormWrap}> 
                  {props.editMode[task.description+i] ?
                    <form 
                      className={classes.desriptionForm}
                      onSubmit={(e)=>{saveDescription(e, task._id, props.description[task._id])}} noValidate autoComplete="off"
                    >
                     <TextField                        
                       name={task._id} label="Description" 
                       value={props.description[task._id]} 
                       defaultValue={task.description}
                       onChange={(e)=>{inputHandler(e, task._id)}} />
                   </form>
                  
                    :
                    <FormControlLabel
                      control={
                      <Checkbox
                          className="todoCheckbox"
                          name={task.description}
                          checked={task.completed}                        
                          onChange={(e)=>{toggleTaskStateHanlder(e,task._id )}}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                          color="primary"
                        />
                      }
                        label={task.description}                        
                    />
                   
                    }
                  
                   
                    {
                        props.editMode[task.description+i] ?
                        <div className="task-edit-icons-wrapper">
                           <IconButton aria-label="Save" onClick={(e)=>{saveDescription(e, task._id, props.description[task._id])}}>                            
                            <CheckIcon fontSize="small"/>                            
                          </IconButton>
                          <IconButton aria-label="Cancel" onClick={()=>{props.setEditMode({...props.editMode, [task.description+i] : false  })}}>                            
                            <ClearIcon fontSize="small"/>                            
                          </IconButton>                                                        
                        </div>
                        : 
                        <div>
                           <IconButton aria-label="Edit" onClick={()=>{props.setEditMode({...props.editMode, [task.description+i] : true  })}}>                            
                            <EditIcon fontSize="small"/>                            
                          </IconButton>
                          <IconButton aria-label="Delete" onClick={()=>{deleteTaskHandler(task._id)}}>                            
                            <DeleteIcon fontSize="small"/>                            
                          </IconButton>                               
                        </div>
                    }
                    
                </div>
                )
            })}
            {props.totalCount > 5 ?            
              <div className="paginationWrap">
                <div className="rowsPerPageWrap">
                  <Typography variant="sm">Rows per page</Typography>
                  <SelectInput 
                    changeHandler = {props.setLimitChangeHandler}
                    value={props.limit}
                    optionsData={paginationData}
                    labelId={'paginationTask'}  
                    className={'rowsPerPageSelect'}  
                    wrapperClass={'rowsPerPageSelectWrapper'}                
                  />
                </div>
                <Pagination page={props.page} count={props.count}  limit={props.limit} changePage={props.paginationChangeHandler} fetchTaskList={props.fetchTaskList}/>
              </div>
            : null} 
            

            
        </div>
      </CardContent>
    </Card>
  );
}