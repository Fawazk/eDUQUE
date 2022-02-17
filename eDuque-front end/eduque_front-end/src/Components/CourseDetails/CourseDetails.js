import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import image from '../../Assets/download.png'
import Typography from '@mui/material/Typography';
import Navbar from '../Navbar/Navbar'


import './CourseDetails.css';

export default function OurCourses() {
  return (
    <div>
      <div className="backgroundImage">
        <div style={{ padding: '1%' }}>
          <Navbar />
        </div>

        <div className='headings'>
          <Typography className="title" sx={{ fontSize: 40, fontWeight: 'bold' }} color='white' variant="h3" gutterBottom component="div">
            Course Details
          </Typography>
        </div>
      </div>

      <div>
        <Container maxWidth="lg" className="container">
          <div className="row">
            <Card className="coursedetailCard">
              <Typography gutterBottom variant="h5" component="div">
                Python
              </Typography>
              <CardMedia
                component="img"
                alt="green iguana"
                width='100%'
                height='100%'
                image={image}
              />
              
            </Card>
          </div>
        </Container>
      </div>
    </div>
  );
}