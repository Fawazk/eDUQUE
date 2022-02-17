import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';

// Card
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// reduxcroppedBlob
import { useDispatch } from "react-redux"
import { change_Addquestion_tid } from "../../Redux/Addquestion_tid/Addquestion_tidSlice"
// form Validator
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
// Alert
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function List_questions() {
    const navigate = useNavigate()
    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [question, setquestion] = useState('');
    const [task, setTask] = useState([])
    const [questions, setQuestions] = useState([])
    // Delete Questions
    const [deleteopen, setDeleteopen] = useState(false);
    const handleOpenDelete = () => setDeleteopen(true);
    const handleCloseDelete = () => setDeleteopen(false);
    // Delete task
    const [deleteopentask,setDeleteopentask] = useState(false);
    const handleOpenDeletetask = () => setDeleteopentask(true);
    const handleCloseDeletetask = () => setDeleteopentask(false);

    const { id } = useParams();
    const dispatch = useDispatch()
    dispatch(change_Addquestion_tid({
        task_id: id
    }))
    // Submit add questions
    const handleSubmit = () => {
        const access_token = localStorage.getItem('access')
        const data = new FormData();
        data.append('week', id)
        data.append('question', question);
        axios.post("http://127.0.0.1:8000/api/admin/Question", data, { headers: { "Authorization": `Bearer  ${access_token}` } }).then((res) => {
            setAlertMessage(res.data.message);
            handleClose()
            setOpenalert(true);
        })
    }
    // Delete Questions
    const [openalert,setOpenalert] = useState(false);
    const [alertMessage,setAlertMessage] = useState('')
    const handleSubmitDelete = (question_id) => {
        const access = localStorage.getItem('access')
        try {
            axios.delete('http://localhost:8000/api/admin/modify_Question/' + question_id, { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
                console.log(response.data);
                handleCloseDelete()
                setAlertMessage(response.data.message);
                setOpenalert(true);
            })
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    const handleSubmitDeletetask = (task_id) =>{
        const access = localStorage.getItem('access')
        try {
            axios.delete('http://localhost:8000/api/admin/modify_task/' + task_id, { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
                console.log(response.data);
                handleCloseDeletetask()
                navigate('/courses')
            })
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    useEffect(() => {
        const access = localStorage.getItem('access')
        try {
            axios.get('http://localhost:8000/api/admin/modify_task/' + id, { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
                setTask(response.data);
            })
            axios.get('http://localhost:8000/api/admin/modify_Question/' + id, { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
                setQuestions(response.data);
            })
        }
        catch (error) {

            console.log(error);
            return error;
        }
    }, [open,deleteopen])
    
    return (
        <div className="List_questions">
            <div style={{ margin: '5%' }}>
                <Typography gutterBottom variant="bold" component="h1">
                    Questions
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>

                
                    {task && task.map((obj, index) => {
                        return (
                            <Card style={{ maxWidth: '60%', margin: '1.5%',padding: '1.5%',textAlign: 'center' }}>
                                <CardContent style={{ padding: '1.5%', paddingRight: '1.5%',}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {obj.weekTitle}
                                    </Typography>
                                    <DeleteIcon style={{justifyContent: 'end'}} onClick={handleOpenDeletetask} />
                                <Modal
                                    open={deleteopentask}
                                    onClose={handleCloseDeletetask}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-question"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Are you sure to delete this course?
                                        </Typography>
                                        <Button type="button" color='error' onClick={() => { handleSubmitDeletetask(obj.id) }} variant="contained">Delete</Button>
                                        <Button type="button" style={{ margin: '1%' }} onClick={() => handleCloseDeletetask()} variant="contained">Cancel</Button>
                                    </Box>
                                </Modal>
                                    <Typography variant="body2" color="text.secondary">
                                        {obj.weekdiscription}
                                    </Typography>
                                   
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
                <Button color='error' variant="contained" onClick={handleOpen}>Add Question</Button>
                <Collapse in={openalert}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenalert(false);
                                        setAlertMessage('')
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {alertMessage}
                        </Alert>
                    </Collapse>
                {questions && questions.map((obj, index) => {
                    return (
                        <Card style={{ margin: '1%', width: "100%" }}>
                            <Box style={{ display: 'flex' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h6">
                                        {index + 1}. {obj.question}
                                    </Typography>
                                </CardContent>
                                <DeleteIcon style={{ margin: '2%' }} onClick={handleOpenDelete} />
                                <Modal
                                    open={deleteopen}
                                    onClose={handleCloseDelete}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-question"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Are you sure to delete this course?
                                        </Typography>
                                        <Button type="button" color='error' onClick={() => { handleSubmitDelete(obj.id) }} variant="contained">Delete</Button>
                                        <Button type="button" style={{ margin: '1%' }} onClick={() => handleCloseDelete()} variant="contained">Cancel</Button>
                                    </Box>
                                </Modal>
                            </Box>
                        </Card>
                    )
                })}

                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-question"
                    >
                        <Box sx={style}>
                            <ValidatorForm

                                onSubmit={handleSubmit}
                            >
                                <h2>Simple form</h2>
                                <TextValidator
                                    label="question"
                                    name="question"
                                    value={question}
                                    onChange={(e) => { setquestion(e.target.value) }}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <br />
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </ValidatorForm>
                        </Box>
                    </Modal>
                </div>
            </div>


        </div>
    )
}

