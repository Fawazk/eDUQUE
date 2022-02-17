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
// import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios'


export default function SignIn() {
  const navigate = useNavigate()
  const theme = createTheme();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alerts,setAlert] = useState('');


  

  const handleLogin = (event)=>{
    event.preventDefault();
    if (email===''){
        setAlert('username is required')
        console.log(alerts)
    }
    else if (password===''){
        setAlert('password is required')
        console.log(alerts)
    }
    else {
        console.log('success')
        const data = {
            email : email,
            password : password,
        }
        axios.post("http://127.0.0.1:8000/api/token/",data).then((res)=>{
            console.log(res.data)
            localStorage.setItem('access',res.data['access']);
            localStorage.setItem('refresh',res.data['refresh']);
            navigate('/dashboard')})
        }
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
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          {alerts ? <Alert className="mb-3" severity="error">{alerts}</Alert> : ''}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value);setAlert('')}}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value);setAlert('')}}
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}