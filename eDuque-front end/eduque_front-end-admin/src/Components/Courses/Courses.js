import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import ModalUnstyled from '@mui/base/ModalUnstyled';
// icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { styled, Box } from '@mui/system';
import Modal from '@mui/material/Modal';
import Divider from "@material-ui/core/Divider";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux"
import { change_Addtask_cid } from "../../Redux/Addtask_cid/Addtask_cidSlice"

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


// import CardMedia from '@material-ui/core/CardMedia';

import './Courses.css';


const StyledModal = styled(ModalUnstyled)`
position: fixed;
z-index: 1300;
right: 0;
bottom: 0;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
`;

const Backdrop = styled('div')`
z-index: -1;
position: fixed;
right: 0;
bottom: 0;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.2) !important ;
  -webkit-tap-highlight-color: transparent;
  `;



export default function Courses() {
    const navigate = useNavigate()
    // Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // alert 
    const [alertMessage,setAlertMessage] = useState('')
    const [openalert,setOpenalert] = useState(false);
    

    // Normal states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [courseList, setCourseList] = useState([])
    const [tasksList, setTasksList] = useState([])
    // delete course
    const [id, setId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const dispatch = useDispatch()
    const changecourse_id = (c_id) => {
        dispatch(change_Addtask_cid({
            course_id: c_id
        }))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        const access = localStorage.getItem('access')
        try {
            axios.get('http://localhost:8000/api/admin/courses', { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
                setCourseList(response.data);
                console.log(response.data);
                
            })

        }
        catch (error) {

            console.log(error);
            return error;
        }
    }, [id])
    const viewtaskHandle = (course_id) => {
        const access = localStorage.getItem('access');
        try {
            axios.get('http://localhost:8000/api/admin/GetCourse_TaskView/' + course_id, { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
                setTasksList(response.data);
                changecourse_id(course_id);
            })
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    const handleAddtask = () => {
        navigate('/AddTasks')
    }
    const handleDelete = (course_id) => {
        const access = localStorage.getItem('access')
        try {
            axios.delete('http://localhost:8000/api/admin/modify_course/' + course_id, { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
                console.log(response.data.message);
                setAlertMessage(response.data.message);
                setId('')
                setOpenalert(true);
            })
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    // handle question page 
    const handleQuestionpage = (task_id) => {
        navigate('/List_questions/' + task_id)
    }
    return (
        <div className='Course'>
            <div className="Courses">
                <div>
                    <div style={{ margin: '5%' }}>
                        <Typography gutterBottom variant="bold" component="h1">
                            Courses
                        </Typography>
                    </div>


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
                    {/* <Button
                        disabled={openalert}
                        variant="outlined"
                        onClick={() => {
                            setOpenalert(true);
                        }}
                    >
                        Re-open
                    </Button> */}




                    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '4%' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            SI.No
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            Course Name
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            Course Image
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            Description
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            Price
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            Instructors
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            Task
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            Delete
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center', fontSize: 'larger' }}>
                                            Edit
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courseList && courseList.map((obj, index) => {
                                        return (
                                            <TableRow >
                                                <TableCell style={{ textAlign: 'center' }}>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>
                                                    {obj.title}
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>
                                                    <img src={obj.courseimage} width='100' height='50%' alt=''></img>
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>
                                                    {obj.description}
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>
                                                    {obj.price}
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>
                                                    <Button type="button" color='error' variant="contained">
                                                        view
                                                    </Button>
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>
                                                    <Button type="button" color='primary' variant="contained" onClick={() => { handleOpen(); viewtaskHandle(obj.id) }}>
                                                        view
                                                    </Button>
                                                    <StyledModal
                                                        aria-labelledby="unstyled-modal-title"
                                                        aria-describedby="unstyled-modal-description"
                                                        open={open}
                                                        onClose={() => { handleClose(); setTasksList('') }}
                                                        BackdropComponent={Backdrop}
                                                    >
                                                        <Box style={{
                                                            width: '50%',
                                                            height: 'auto',
                                                            backgroundColor: '#FFF',
                                                            borderRadius: '1%',
                                                            textAlign: 'center',
                                                            alignItems: 'center',
                                                            p: 2,
                                                            pb: 3,
                                                        }}>
                                                            <h1 id="unstyled-modal-title">TASKS</h1>
                                                            <div style={{ padding: '5%', paddingLeft: '10%' }} id="unstyled-modal-description">
                                                                <Box
                                                                    style={{
                                                                        display: 'flex',
                                                                        flexWrap: 'wrap',
                                                                        '& > :not(style)': {
                                                                            m: 1,
                                                                            width: 100,
                                                                            height: 30,
                                                                            textAlign: 'center',
                                                                            alignItems: 'center',
                                                                        },
                                                                    }}
                                                                >
                                                                    {tasksList && tasksList.map((obj) => {
                                                                        return (
                                                                            <Paper onClick={() => { handleQuestionpage(obj.id) }} style={{ marginLeft: '2%', padding: '1%' }}><h2>{obj.weekTitle}</h2></Paper>
                                                                        )
                                                                    })
                                                                    }
                                                                </Box>
                                                                <Divider style={{ margin: '2%' }} />
                                                                <Button type="button" color='error' onClick={() => { handleAddtask() }} variant="contained">Add Task</Button>
                                                            </div>
                                                        </Box>
                                                    </StyledModal>
                                                </TableCell>
                                                {/* Delete */}

                                                <TableCell style={{ textAlign: 'center' }}>
                                                    <DeleteIcon onClick={(e) => {
                                                        handleOpenModal()
                                                    }} />

                                                    <Modal
                                                        open={openModal}
                                                        onClose={handleCloseModal}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        BackdropComponent={Backdrop}
                                                    >
                                                        <Box sx={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            width: '30%',
                                                            bgcolor: '#fff',
                                                            p: 3,
                                                            alignItems: 'center',
                                                            textAlign: 'center',
                                                        }}>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                                Are you sure to delete this course?
                                                            </Typography>
                                                            <Box id="modal-modal-description" sx={{ mt: 2 }}>
                                                                <Button type="button" color='error' onClick={() => { setId(obj.id); handleDelete(obj.id); handleCloseModal() }} variant="contained">Delete</Button>
                                                                <Button type="button" style={{ margin: '1%' }} onClick={() => handleCloseModal()} variant="contained">Cancel</Button>
                                                            </Box>
                                                        </Box>
                                                    </Modal>
                                                </TableCell>
                                                <TableCell>
                                                    <EditIcon />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={courseList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        </div >
    );
}

