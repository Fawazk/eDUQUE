import React, { useState, useCallback, useRef, useEffect } from 'react';
// import cropper from '../Cropper/Cropper';
// crop image imports
import 'react-image-crop/dist/ReactCrop.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"


import './AddTasks.css';


export default function AddTasks() {

    const navigate = useNavigate()
    const [weekTitle, setweekTitle] = useState('');
    // const [course, setCourse] = useState('');
    const [weekdiscription, setweekdiscription] = useState('')
    const [alerts, setAlert] = useState('');

    const Addtask_cid = useSelector(state=> state.Addtask_cid.value)
    console.log(Addtask_cid,"i am redux at addtask page")
    const handleAddTasks = (event) => {
        event.preventDefault();
        console.log('Success')
        const access_token = localStorage.getItem('access')
        const data = new FormData();
        data.append('weekTitle', weekTitle);
        data.append('weekdiscription', weekdiscription);
        data.append('course',Addtask_cid)
        axios.post("http://127.0.0.1:8000/api/admin/task/", data, { headers: {"Authorization": `Bearer  ${access_token}` } }).then((res) => {
            console.log(res.data)
            navigate('/Courses')
        })
    }

    return (
        <div className="AddTasks">
            <Container maxWidth='lg' sx={{}} >
                <div style={{ margin: '5%', textAlign: 'center' }}>
                    <Typography gutterBottom variant="bold" component="h1">
                        Add Tasks
                    </Typography>
                </div>
                <Box
                    onSubmit={handleAddTasks}
                    component="form"
                    noValidate
                    autoComplete="off"
                    alignItems='center'
                    sx={{ alignItems: 'center', textAlign: 'center' }}
                >
                    {/* {alerts ? <Alert className="mb-3" severity="error">{alerts}</Alert> : ''} */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={weekTitle}
                        onChange={(e) => { setweekTitle(e.target.value) }}
                        sx={{ width: '70%', margin: '1%' }}
                        name="Week weekTitle"
                        label="Week weekTitle"
                        type="Week weekTitle"
                        id="Week weekTitle"
                    />
                    
                    <TextField
                        value={weekdiscription} onChange={(e) => { setweekdiscription(e.target.value); setAlert('') }}
                        margin="normal"
                        required
                        fullWidth
                        sx={{ width: '70%', margin: '1%' }}
                        name="weekdiscription"
                        label="weekdiscription"
                        type="weekdiscription"
                        id="weekdiscription"
                        multiline
                        rows={5}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        className="btn"
                        style={{
                            margin: '2%',
                            padding: '1.5%'
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </div >
    );
}
