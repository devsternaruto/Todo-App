import React,{useEffect} from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom'




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
    
  },
  menuWrap : {
    width:'200px',
  },
  profileIcon: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    borderRadius:'10%'
  },
}));

function ProfileMenu(parentProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [imageHash, setImageHash] = React.useState('');
  const anchorRef = React.useRef(null);

  useEffect(()=>{         
    let imageU = imageUrl;
    if(!imageUrl) {
        if(parentProps.user ){
            imageU = `${process.env.REACT_APP_BACKEND_URL}/users/${parentProps.user._id}/avatar`
        }
         
    }    
    setImageUrl(imageU)    
    setImageHash(Date.now()) 
  },[imageUrl, parentProps.user])

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {      
      return;
    }    
    setOpen(false);    
  };

  

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  const handleToggle = () =>{
    setOpen(!open)
  }

  const navigateHandler = (param) => {
    parentProps.history.push('/'+param)
    setOpen(false);
  }

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  return (
    <div className={classes.root}>
      
      <div>
        {/* <Avatar 
            ref={anchorRef}            
            onClick={handleToggle}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            className={classes.profileIcon}>
            {parentProps.user && parentProps.user.name ? parentProps.user.name.slice(0,1).toUpperCase() : null}
        </Avatar>  */}

        <div className="avatar-wrapper"
         ref={anchorRef}            
         onClick={handleToggle}
         aria-controls={open ? 'menu-list-grow' : undefined}
         aria-haspopup="true"
        
        >                                        
            <div className={['avatar-img-wrap', parentProps.user && !parentProps.user.avatar ? 'defaultAvatar' : null].join(' ')}>
                {parentProps.user && parentProps.user.avatar ? 
                    <img  src={`${imageUrl}?${imageHash}`} /> : 
                    <span className="avatar-name">{parentProps.user && parentProps.user.name ? parentProps.user.name.slice(0,1).toUpperCase() : ''}</span>
                }                
            </div>                        
        </div>
        <Popper 
            open={open} 
            anchorEl={anchorRef.current} 
            role={undefined} 
            transition 
            disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow            
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={()=>{navigateHandler('profile')}}>Profile</MenuItem>
                    <MenuItem onClick={parentProps.signOutHandler}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default withRouter(ProfileMenu)