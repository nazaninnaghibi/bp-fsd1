import React, {useState} from 'react';
import {Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''};

export const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const[formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }; 


    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);

    return (
      <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {
                        isSignup && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus xs={6}/>
                            <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus xs={6}/> 
                        </>
                        )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    {
                        isSignup &&  <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                    }
                  </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {
                        isSignup ? 'Sign Up' : 'Sign In'
                    }
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
              </form>
          </Paper>
      </Container>
    );
};

export default Auth;
