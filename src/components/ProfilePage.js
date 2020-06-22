import React, {useState,useEffect } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import * as bindUserActions from '../actions/userActions';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Loader from './UI/Loader';
import Modal from './Modal';

const ProfilePage = (props) => {    
    const userActions = bindActionCreators( bindUserActions,props.dispatch);
    let initName = props.user && props.user.name ? props.user.name : '';
    
    const [state, setState] = useState({name : initName, password : '', newPassword : '', imageUrl : '', imageHash : ''});
    const [name,setName] = useState(initName);
    const [submitDisabled,setSubmitDisabled] = useState(true);


    useEffect(()=>{
        if(props.user && props.user.name) {         
            setName(props.user.name)                     
        }        
        
    },[props.user]);

    useEffect(()=>{
        userActions.setSuccessMessage('');
        userActions.setErrorMessage('');     
        
        if(props.user && props.user.name !== state.name || state.password.length > 0 || state.newPassword.length > 0) {
            setSubmitDisabled(false);
        }   
    },[])



    useEffect(()=>{         
        let imageU = state.imageUrl;
        if(!state.imageUrl) {
            if(props.user ){
                imageU = `${process.env.REACT_APP_BACKEND_URL}/users/${props.user._id}/avatar`
            }             
        }        
        setState( {...state, 'imageUrl' : imageU, imageHash : Date.now() })     
    },[state.imageUrl, props.user]);

    const changeHandler = (e) => {        
        setState({...state, [e.target.name] : e.target.value})
        if(e.target.name === 'name') {
            setName(e.target.value);
        }

        if(props.user && props.user.name !== e.target.value || state.password.length > 0 || state.newPassword.length > 0) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()        
        let formData = {
            name : state.name,
            password : state.password,
            newPassword : state.newPassword
        }
        userActions.updateUser(formData)
    }

    const profileImageHandler = async (e) => {
        let formData = new FormData()
        
        if(e.target.files && e.target.files.length == 1) {            
            formData.append('avatar', e.target.files[0])
            await userActions.addProfileAction(formData);            
        }
        
    }

    const removeProfilePicHandler = async () => {
        await userActions.removeProfilePictureAction();  
    }

    const deletAccountHandler = async () => {
        await userActions.deleteAccountAction();  
    }

    const deleteAccountModalContent = (handleClose) => {
        return (
            <div className="deleteAccountModalContent">
                <p>Are you sure you want to delete your account </p>
                <div className="btns-group">
                    <Button 
                        variant="contained" 
                        size="small"
                        color="primary" 
                        type={'button'}  
                        onClick={deletAccountHandler}                  
                    >Delete</Button>
                    <Button 
                        size="small"
                        variant="contained" 
                        color="primary" 
                        type={'button'}    
                        onClick={()=>{handleClose()}}  
                    >Cancel</Button>
                </div>
            </div>
        )
    }

   

    return (        
        <>  
            {props.gSuccessMessage && 
            <Alert severity="success" onClose={() => {userActions.setSuccessMessage('')}}>{props.gSuccessMessage}</Alert>}            

            {props.gErrorMessage && 
            <Alert severity="error" onClose={() => {userActions.setErrorMessage('')}}>{props.gErrorMessage}</Alert>}

            {props.successMessage && <Alert severity="success" onClose={() => {userActions.setAuthSuccess('')}}>{props.successMessage}</Alert>}
            {props.errorMessage && <Alert severity="error" onClose={() => {userActions.setAuthError('')}}>{props.errorMessage}</Alert>     }
            <Container maxWidth="xs" className={'container'}>
                <div>
                    <Grid container spacing={3}>
                       
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                <div className="center">
                                    <h1>Profile Page</h1>  
                                    <div className="avatar-wrapper">       
                                            {props.profileImageLoader ? <Loader absolute={true} /> : null}                                 
                                            <div className={['avatar-img-wrap', props.user && !props.user.avatar ? 'defaultAvatar' : null].join(' ')}>
                                                {props.user && props.user.avatar ? 
                                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/users/${props.user._id}/avatar?${state.imageHash}`}/>                                                    
                                                    : 
                                                    <span className="avatar-name">{props.user && props.user.name ? props.user.name.slice(0,1).toUpperCase() : ''}</span>
                                                }
                                                {props.user && props.user.avatar ? <span className="remove-label" onClick={removeProfilePicHandler}>Remove</span> : null }
                                                
                                                <label for="avatar" className="avatar-label"> {props.user && props.user.avatar ? 'Change' : 'Upload' } </label>
                                            </div>
                                        
                                        <input type="file" id="avatar" accept="image/*" onChange={profileImageHandler} />  
                                    </div>
                                    <form autoComplete="off" onSubmit={submitHandler} className="profile-form">
                                        <div className="input-fields">   
                                            <TextField 
                                                id="name" 
                                                label="Name" 
                                                name="name"
                                                value={name}
                                                onChange={(e)=>{changeHandler(e)}}
                                                // onChange={(e)=>{setName(e.target.value)}}
                                                fullWidth
                                            />
                                        </div>
                                        <div className="input-fields">
                                            <TextField                                             
                                                name="password"
                                                id="password" 
                                                label="Password" 
                                                value={state.password}
                                                onChange={(e)=>{changeHandler(e)}}
                                                required={state.newPassword.length >0}
                                                fullWidth
                                            />                                        
                                    </div>
                                        <div className="input-fields">
                                            <TextField 
                                                name="newPassword"
                                                id="newPassword" 
                                                label="New Password"
                                                value={state.newPassword}
                                                onChange={(e)=>{changeHandler(e)}}
                                                required={state.password.length >0}
                                                fullWidth
                                            />
                                        </div>
                                        <Button 
                                            className="submit-btn" 
                                            variant="contained" 
                                            color="primary" 
                                            type={'submit'}
                                            fullWidth
                                            disabled={submitDisabled}
                                            
                                        >Submit</Button>
                                        <div style={{marginTop:'30px'}}>
                                            <Modal 
                                                // fetchTaskList={fetchTaskList}    
                                                // addTask={addTask}                                      
                                                btnContent={'Delete Account'}
                                                btnColor= {'secondary'}
                                                fullWidth={true}
                                                pageToRender={deleteAccountModalContent}
                                            />
                                        </div>
                                    </form>  
                                </div>
                                </CardContent>
                            
                            </Card>
                           
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {      
    return {
        user : state.authReducer.user,
        errorMessage : state.authReducer.errorMessage,
        successMessage : state.authReducer.successMessage,
        gSuccessMessage : state.authReducer.gSuccessMessage,
        gErrorMessage : state.authReducer.gErrorMessage,
        profileImageLoader : state.authReducer.profileImageLoader                
    }
}
export default connect(mapStateToProps)(ProfilePage);