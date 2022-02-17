import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
// import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import { loginGoogle } from '../../Axios/GoogleLogin';


// import google login
import GoogleLogin from 'react-google-login'
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const navigate = useNavigate()
  const theme = createTheme();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alerts,setAlert] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
        const fromdata = new FormData();
        fromdata.append('email', data.email);
        fromdata.append('password', data.password);
        axios.post("http://127.0.0.1:8000/api/token/",fromdata).then((res)=>{
            console.log(res)
            console.log('hai iam fawaz')
            localStorage.setItem('access',res.data['access']);
            localStorage.setItem('refresh',res.data['refresh']);
            navigate('/home')})
        }
    
    const responseGoogle = (response) => {
        loginGoogle(response.profileObj);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="strong">
            Sign in
          </Typography>
          <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <GitHubIcon sx={{ m:2 }}/>
              <GoogleLogin
              clientId="609160327024-g3tbn2t98pf3ffpvsjs2kqgn3b8k7psv.apps.googleusercontent.com"
              buttonText='Login'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              />
              <LinkedInIcon sx={{ m:2 }}/>
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0">Or</p>
          </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
                label="Email"
                type="email"
                id="email"
              />
              {errors.email && (
                <span style={{ color: 'red' }} className="error">{errors.email.message}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("password", {
                  required: "This field is required",
                  
                })}
                label="Password"
                type="password"
                id="password"
              />
              {errors.password && (
                <span style={{ color: 'red' }} className="error">{errors.password.message}</span>
              )}
            <input style={{ marginTop: '2%',marginBottom: '2%', width: '100%', padding: '3%', color: '#fff', backgroundColor: '#94CAC5', border: 'none' }} type="submit" label='Sign In ' />
            </form>
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() =>navigate('/register')} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}