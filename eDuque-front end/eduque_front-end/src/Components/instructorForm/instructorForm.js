import { useState, React } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Navbar from '../Navbar/Navbar';
import Modal from '@mui/material/Modal';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import cropper from '../../Cropper/Cropper';

import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import jwt_decode from "jwt-decode";
import axios from 'axios'

// validator
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import './instructorForm.css';

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

export default function SignInSide() {

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // crop image
  const [src, setSrc] = useState('');
  const [crop, setCrop] = useState({ aspect: 1 / 1 })
  const [result, setResult] = useState(null);
  const [Uploadphoto, setUploadphoto] = useState('');
  const [blobimage, setBlobimage] = useState('')
  const handleFileChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]))
  }
  async function getCroppedImg() {
    let blob = await cropper.getCroppedImg(Uploadphoto, crop)
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

  const courseList = useSelector(state => state.courseredux.value)
  var token = localStorage.getItem('access');
  var decoded = jwt_decode(token);
  localStorage.setItem('user', JSON.stringify(decoded));
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });
  const [uploadcv, setUploadcv] = useState('')
  const onSubmit = (data) => {
    console.log(data.aboutyou)
    console.log(uploadcv)
    const fromdata = new FormData();
    fromdata.append('user', user.user_id);
    fromdata.append('name', data.name);
    fromdata.append('phone', data.phone);
    fromdata.append('aboutyou', data.aboutyou);
    fromdata.append('coverletter', data.coverletter);
    fromdata.append('selectCourse', data.course);
    fromdata.append('experiance', data.experiance);
    fromdata.append('linkdinlink', data.linkdinlink);
    fromdata.append('githublink', data.githublink);
    fromdata.append('twitterlink', data.twitterlink);
    fromdata.append('uploadphoto', blobimage);
    fromdata.append('uploadcv', uploadcv);
    axios.post("http://127.0.0.1:8000/api/instructor", fromdata, { headers: { 'Content-Type': 'multipart/form-data', "Authorization": `Bearer  ${token}` } }).then((res) => {
      console.log(res.data)
      // navigate('/Courses')
    })
  }



  return (
    <div>
      <div className="headerimage">
        <div style={{ padding: '1%' }}>
          <Navbar />
        </div>
      </div>

      <Grid container component="main">
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} elevation={6} >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography component="h1" variant="bold" sx={{ mt: '5%' }}>
              INSTRUCTOR FORM
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("name", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 characters required",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum 15 characters allowed",
                  },
                })}
                label="name"
                type="Text"
                id="name"
              />
              {errors.name && (
                <span style={{ color: 'red' }} className="error">{errors.name.message}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("phone", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 10 characters required",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum 10 characters allowed",
                  },
                })}
                label="Phone Number"
                type="number"
                id="phone"
              />
              {errors.phone && (
                <span style={{ color: 'red' }} className="error">{errors.phone.message}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("aboutyou", {
                  required: "This field is required",
                })}
                multiline
                rows={5}
                label="About you"
                type="type"
                id="aboutyou"
              />
              {errors.aboutyou && (
                <span style={{ color: 'red' }} className="error">{errors.aboutyou.message}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                multiline
                rows={5}
                {...register("coverletter", {
                  required: "This field is required",
                })}
                label="Cover Letter"
                type="text"
                id="coverletter"
              />
              {errors.coverletter && (
                <span style={{ color: 'red' }} className="error">{errors.coverletter.message}</span>
              )}
              <FormControl fullWidth className='mt-3'>
                <InputLabel id='demo-simple-select-label'>
                  Select Course
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  // value={age}
                  {...register('course', { required: true })}
                  label='select Course'
                // onChange={handleChange}
                >
                  <MenuItem selected>Select Course</MenuItem>
                  {courseList && courseList.map((obj) => {
                    return (
                      <MenuItem value={obj.id}>{obj.title}</MenuItem>
                    )
                  })}
                </Select>
                {errors.course && (
                  <span style={{ color: 'red' }} className='error'>This field is required</span>
                )}
              </FormControl>
              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("experiance", {
                  required: "This field is required",
                })}
                label="Experiance in selected Domain"
                type="number"
                id="experiance"
              />
              {errors.experiance && (
                <span style={{ color: 'red' }} className="error">{errors.experiance.message}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("linkdinlink", {
                  required: "This field is required",
                })}
                label="Linkdin Link"
                type="url"
                pattern="https://.*"
                id="linkdinlink"
              />
              {errors.linkdinlink && (
                <span style={{ color: 'red' }} className="error">{errors.linkdinlink.message}</span>
              )}
              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("githublink", {
                  required: "This field is required",
                })}
                label="Github Link"
                type="url"
                pattern="https://.*"
                id="githublink"
              />
              {errors.githublink && (
                <span style={{ color: 'red' }} className="error">{errors.githublink.message}</span>
              )}

              <TextField
                margin="normal"
                fullWidth
                autoCapitalize="on"
                {...register("twitterlink", {
                  required: "This field is required",
                })}
                label="Twitter Link"
                type="url"
                pattern="https://.*"
                id="twitterlink"
              />
              {errors.twitterlink && (
                <span style={{ color: 'red' }} className="error">{errors.twitterlink.message}</span>
              )}



              <label htmlFor="upload-photo" sx={{ color: '#FFF' }}>
                <Button className="btn" color="inherit" variant="contained"
                  style={{ margin: '1%', padding: '1.5%' }} component="span">
                  <input
                    {...register("upload_photo", {
                      required: "This field is required",
                    })}
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                 
                  />
                  Upload image
                </Button>
              </label>


              {errors.upload_photo && (
                <span style={{ color: 'red' }} className="error">{errors.upload_photo.message}</span>
              )}

              <label htmlFor="uploadcv" sx={{ color: '#FFF' }}>
                <Button className="btn" color="inherit" variant="contained"
                  style={{ margin: '1%', padding: '1.5%' }} component="span">
                  <input
                    {...register("uploadcv", {
                      required: "This field is required",
                    })}
                    style={{ display: 'none' }}
                    id="uploadcv"
                    name="uploadcv"
                    type="file"
                    accept="image/*"
                    // onChange={handleFileChange}
                    onChange={(e) => {
                      setUploadcv(e.target.files[0])
                    }}
                  />
                  Upload C.V
                </Button>
              </label>


              {errors.uploadcv && (
                <span style={{ color: 'red' }} className="error">{errors.upload_photo.message}</span>
              )}
              <input style={{ marginTop: '2%', width: '100%', padding: '1.75%', color: '#fff', backgroundColor: '#94CAC5', border: 'none' }} type="submit" />
            </form>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          sx={{ alignItems: 'center' }}
        >
          <Box item
            xs={12}
            sm={4}
            md={4} container width="80%" sx={{
              boxShadow: 3,
              textAlign: 'center',
              borderRadius: '5px',
              mt: '15%',
              ml: '10%'
            }}>
            <h1>INSTRUCTIONS</h1>
          </Box>
          <Box Container maxWidth="md" width="80%"
            sx={{
              boxShadow: 3,
              ml: '10%',
              borderRadius: '5px',

            }}>
            <div style={{ padding: '4%', margin: '5%' }}>
              <p>-  we are working</p>
              <p>-  we are workingrfgtegetg</p>
              <p>-  we are working</p>
              <p>-  we are workingrfgtegetg</p>
              <p>-  we are working</p>
              <p>-  we are workingrfgtegetg</p>
            </div>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-question"
          >
            <Box sx={style}>
              {/* Crop image */}
              <div style={{ margin: '5%', marginTop: '0%', alignItems: 'center', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                {src &&
                  <div style={{ margin: '1%', alignItems: 'left', }}>
                    <ReactCrop style={{ width: '50%' }} src={src} onImageLoaded={setUploadphoto} crop={crop} onChange={setCrop} />

                  </div>
                }
                {result && <div style={{ margin: '2%', alignItems: 'right', }}><img src={result} alt='Cropped Image' ></img></div>}
              </div>
              <div style={{ textAlign: 'center' }}>
                <hr />
                <Button width="20%" style={{ width: '20%', height: '10%' }} variant="contained"
                  className="btn" onClick={getCroppedImg}>Crop Image</Button>
                <hr />
              </div>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </div>

  );
}