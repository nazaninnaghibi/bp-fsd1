import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';


const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        firstName:'',
        lastName:'', 
        phone:'', 
    });
    
    const post = useSelector((state)=> currentId ? state.posts.find((p)=>p._id == currentId): null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
       if(post) setPostData(post);
    },[post])

    const handleSubmit = (e) => {
       e.preventDefault();
     
       if(currentId == 0){
        dispatch(createPost({...postData, name: user?.result?.name}));
        clear();
       }else{
        dispatch(updatePost(currentId, {...postData, name: user?.result?.name})); 
        clear();
       } 
    };

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create, delete and update a user.
                </Typography>
            </Paper>
        )
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({
        firstName:'',
        lastName:'', 
        phone:'', })
    }

    return (
        <Paper className={classes.paper}>
           <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating' } a new user</Typography>

            <TextField 
                name="firstName" 
                variant="outlined"
                label="firstName" 
                fullWidth
                value={postData.firstName}
                onChange={(e) => setPostData({...postData, firstName: e.target.value})}
            />
            <TextField 
                name="lastName" 
                variant="outlined"
                label="lastName" 
                fullWidth
                value={postData.lastName}
                onChange={(e) => setPostData({...postData, lastName: e.target.value})}
            />
            <TextField 
                name="phone" 
                variant="outlined"
                label="phone" 
                fullWidth
                value={postData.phone}
                onChange={(e) => setPostData({...postData, phone: e.target.value})}
            />

               <Button 
                 className={classes.buttonSubmit}
                 variant="contained" 
                 color="primary"
                 size="large" 
                 type="submit" 
                 fullWidth>Submit
                </Button>

                <Button 
                 variant="contained" 
                 color="secondary" 
                 size="small" 
                 onClick={clear} 
                 fullWidth>Clear
                </Button>

           </form>
        </Paper>
    );
}

export default Form;