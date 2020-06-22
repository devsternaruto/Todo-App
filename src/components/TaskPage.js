import React,{useEffect, useState} from 'react';
import Modal from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TodoList from './TodoList';
import {connect} from 'react-redux';
import * as taskActionCreators from '../actions/taskActions';
import {bindActionCreators} from 'redux';
import AddTask from './AddTask';
import Loader from './UI/Loader'

import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles(()=>({
    modalWrap : {
        marginBottom : '40px',
        display:'flex',
        justifyContent: 'center'
    }
}))

const TaskPage = (props) => {
    const {dispatch} = props;    
    const taskActions = bindActionCreators(taskActionCreators, dispatch)
    const [editMode, setEditMode] = useState({});
    const [checkedItems, setCheckedItems] = useState({});
    const [description, setDescription] = useState({}); 
    const [searchValue, setSearchValue] = useState('');    

    const classes = useStyles();    

    const addTask = async (data) => {
        await taskActions.addTask(data);
        await taskActions.fetchTaskList(props.page, props.limit, props.sortBy, props.search );
    }
    const deleteTask = async (id) => {
        await taskActions.deleteTask(id);
        setTimeout(async ()=>{
            await taskActions.fetchTaskList(props.page, props.limit, props.sortBy, props.search );
        },500)
        
    }

   

    const setTaskCompleteToggle = async (id, checked) => {
        await taskActions.setTaskCompleteToggle(id, checked);
        await taskActions.fetchTaskList(props.page, props.limit, props.sortBy, props.search );
    }
    
    const saveTaskData = async (id, description) => {
        await taskActions.saveTaskData(id, description)
    }

    const fetchTaskList = async (page, limit) => {        
        await taskActions.fetchTaskList(page, limit);        
    }


    const addTaskContent = (handleClose) => {
        return (
        <AddTask
          {...props}
          handleClose={handleClose}
          addTask={addTask}
        />
        )
    }

    const setLimitChangeHandler = async (e) => {        
        await taskActions.setPageLimit(e.target.value);
        await taskActions.fetchTaskList(props.page, e.target.value, props.sortBy, props.search );
    }

    const searchTaskHandler = async (searchText, sortBy) => {                            
        await taskActions.fetchTaskList(1, props.limit, sortBy, searchText);
        props.history.push('/taskapp?page=1&limit='+props.limit+'&sortBy='+props.sortBy+'&search='+searchText);
    }
    
    const sortByChangeHandler = async (e) => {
        await taskActions.changePage(1)     
        await taskActions.setSortBy(e.target.value);
        await taskActions.fetchTaskList(1,props.limit, e.target.value, props.search);
        props.history.push('/taskapp?page=1&limit='+props.limit+'&sortBy='+e.target.value+'&search='+props.search);
    }

    const paginationChangeHandler = async (value) => {
        await taskActions.changePage(value);
        await taskActions.fetchTaskList(value,props.limit, props.sortBy, props.search);
        props.history.push('/taskapp?page='+value+'&limit='+props.limit+'&sortBy='+props.sortBy+'&search='+props.search);
    }

    const fetchDataByOrder = async () => {
        const query = new URLSearchParams(props.location.search);   

        if(query.get('page')) {
            taskActions.changePage(query.get('page'))
        }
        
        if(query.get('limit')) {
            taskActions.setPageLimit(query.get('limit'))
        }
        
        if(query.get('search')) {
            setSearchValue(query.get('search'))
        }      
        
        if(query.get('sortBy')) {            
            taskActions.setSortBy(query.get('sortBy'))
        }  

        taskActions.fetchTaskList(query.get('page') ? query.get('page') : 1, query.get('limit') ? query.get('limit') : 10, query.get('sortBy'), query.get('search'));
    }


    useEffect(()=>{                    
        fetchDataByOrder();        
    },[])    
    if(!props.user) {
        return  <Loader /> 
    }
    return (
        <>            
            {props.errorMessage && <Alert severity="error" onClose={() => {taskActions.setTaskError('')}}>{props.errorMessage}</Alert>     }
            <Container maxWidth="sm" className={'container'}>                                                
                <div className={classes.modalWrap}>
                    <Modal 
                        fetchTaskList={fetchTaskList}    
                        addTask={addTask}                                      
                        btnContent={('Add')}
                        pageToRender={addTaskContent}
                        loader = {props.loader}
                    />
                </div>                                        
                {props.user && props.count === 0 && props.totalCount === 0 && props.taskList.length === 0 ? 
                    <div className="center">
                        <p className="lead-landing-page">Please add a task to see the <span className="strike-thru"> magic</span>, Logic </p> 
                    </div> : 
                <TodoList 
                    taskList={props.taskList}                    
                    fetchTaskList={fetchTaskList}
                    deleteTask={deleteTask}      
                    setTaskCompleteToggle={setTaskCompleteToggle}
                    saveTaskData={saveTaskData}
                    searchTaskHandler={searchTaskHandler}  
                    changePage={taskActions.changePage}
                    
                    editMode={editMode}
                    setEditMode={setEditMode}
                    checkedItems={checkedItems}
                    setCheckedItems={setCheckedItems}
                    description={description}
                    setDescription={setDescription}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    
                    count = {props.count}           
                    limit = {props.limit}
                    sortBy = {props.sortBy}
                    page = {props.page}
                    setLimitChangeHandler = {setLimitChangeHandler}
                    sortByChangeHandler = {sortByChangeHandler}      
                    paginationChangeHandler={paginationChangeHandler}                           
                    setSearchValueAction = {taskActions.setSearch}
                    searchIsOnFetch={props.searchIsOnFetch}
                    loader = {props.loader}
                    totalCount={props.totalCount}
                />      
                              
                }
                               
                       
            </Container>
        </>
    )
}
const mapStateToProps = (state) =>{
    return {
        user : state.authReducer.user,
        taskList : state.taskReducer.taskList,
        count : state.taskReducer.count,
        limit : state.taskReducer.limit,
        page : state.taskReducer.page,
        sortBy : state.taskReducer.sortBy,
        search : state.taskReducer.search,
        loader : state.taskReducer.loader,
        errorMessage : state.taskReducer.errorMessage,    
        totalCount : state.taskReducer.totalCount    
    }
}

export default connect(mapStateToProps)(TaskPage);