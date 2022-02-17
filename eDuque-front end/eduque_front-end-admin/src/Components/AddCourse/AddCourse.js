import React, { useState, useCallback, useRef, useEffect } from 'react';
import cropper from '../../Cropper/Cropper';
// crop image imports
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


import './AddCourse.css';

const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 360,
    height: 450,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    alignItems: "center",
};

export default function AddCourse() {

    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [courseimage, setCourseimage] = useState('');
    const [blobimage, setBlobimage] = useState('')
    const [alerts, setAlert] = useState('');


    const [src, setSrc] = useState('');
    const [crop, setCrop] = useState({ aspect: 1 / 1 })
    const [result, setResult] = useState(null);
    const handleFileChange = (e) => {
        console.log('i am here')
        setSrc(URL.createObjectURL(e.target.files[0]))
    }

    async function getCroppedImg() {
        let blob = await cropper.getCroppedImg(courseimage, crop)
        console.log(blob)

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            var base64data = reader.result;
            setResult(base64data);
        };
        var myFile = blobToFile(blob, "my-image.png");
        console.log(myFile, 'my file')
        setBlobimage(myFile)
    }

    function blobToFile(theBlob, fileName) {
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    }

    const handleAddCourse = (event) => {
        event.preventDefault();
        if (title === '') {
            setAlert('Title is required')
            console.log(alerts)
        }
        else if (description === '') {
            setAlert('Description is required')
            console.log(alerts)
        }
        else if (price === '') {
            setAlert('Price is required')
            console.log(alerts)
        }
        else if (blobimage === '') {
            setAlert('Course image is required')
            console.log(alerts)
        }
        else {
            console.log('success')
            const access_token = localStorage.getItem('access')
            const data = new FormData();
            // const data={
            //     'title': title,'description': description,'price': price,'courseimage': blobimage
            // }
            data.append('title', title);
            data.append('description', description);
            data.append('price', price);
            data.append('courseimage', blobimage);
            axios.post("http://127.0.0.1:8000/api/admin/courses", data, { headers: { 'Content-Type': 'multipart/form-data', "Authorization": `Bearer  ${access_token}` } }).then((res) => {
                console.log(res.data)
                navigate('/Courses')
            })
        }
    }

    return (
        <div className="AddCourse">
            <Container maxWidth='lg' sx={{}} >
                <div style={{ margin: '5%' }}>
                    <Typography gutterBottom variant="bold" component="h1">
                        Add Courses
                    </Typography>
                </div>
                <Box
                    onSubmit={handleAddCourse}
                    sx={{ alignItems: 'center' }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    {alerts ? <Alert className="mb-3" severity="error">{alerts}</Alert> : ''}
                    <TextField sx={{ width: '80%', margin: '1%' }} id="outlined-basic" value={title} onChange={(e) => { setTitle(e.target.value); setAlert('') }} fullWidth label="Title" variant="outlined" />
                    <TextField
                        value={description} onChange={(e) => { setDescription(e.target.value); setAlert('') }}
                        margin="normal"
                        required
                        fullWidth
                        sx={{ width: '80%', margin: '1%' }}
                        name="Description"
                        label="Description"
                        type="Description"
                        id="Description"
                        multiline
                        rows={5}
                    />
                    <TextField sx={{ width: '39%', margin: '1%' }}
                        value={price} onChange={(e) => { setPrice(e.target.value); setAlert('') }}
                        id="outlined-basic" type="number" fullWidth label="Price" variant="outlined" />

                    <label htmlFor="upload-photo" sx={{ color: '#FFF' }}>
                        <Button className="btn" color="inherit" variant="contained"
                            style={{ margin: '1%', padding: '1.5%' }} component="span">
                            <input
                                style={{ display: 'none' }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            Course image
                        </Button>
                    </label>
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
            {/* Crop image */}
            <div >
            {src &&
                <div>
                    <ReactCrop src={src} style={{
                        width: '50%',
                        height: '50%',
                    }} onImageLoaded={setCourseimage} crop={crop} onChange={setCrop} />
                    <hr/>
                    <Button width="20%" style={{width: '10%', height: '10%'}} variant="contained"
                        className="btn" onClick={getCroppedImg}>Crop Image</Button>
                    <hr/>

                </div>
            }
            {result && <div><img src={result} alt='Cropped Image' ></img></div>}
            </div>
        </div >
    );
}
