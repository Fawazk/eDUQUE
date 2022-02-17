import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Navbar from '../Navbar/Navbar'
import { useSelector, useDispatch } from "react-redux";
import {change_courseredux} from '../../Redux/Coursesredux/Courseredux_Slice';

import './OurCourses.css';

export default function OurCourses() {

  // const [courseList, setCourseList] = useState([])

  const dispatch = useDispatch()
  const courseList = useSelector(state=> state.courseredux.value)

  const changecourse = (course) => {
      dispatch(change_courseredux({
          course: course,
      }))
  }


  useEffect(() => {
    const access = localStorage.getItem('access')
    try {
      axios.get('http://localhost:8000/api/admin/courses', { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
        changecourse(response.data)
        console.log(response.data);
      })

    }
    catch (error) {

      console.log(error);
      return error;
    }
  }, [])
  return (
    <div>
      <div className="Courseheader">
        <div style={{ padding: '1%' }}>
          <Navbar />
        </div>
        <div className='headings'>
          <Typography className="title" sx={{ fontSize: 40, fontWeight: 'bold' }} color='white' variant="h3" gutterBottom component="div">
            Our Courses
          </Typography>
        </div>
      </div>
      <Container maxWidth="lg" className="container">
        <div className="row">
          {courseList && courseList.map((obj) => {
            return (
              <Card className="courseCard">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height='auto'
                  width="100%"
                  image={obj.courseimage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {obj.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {obj.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="bold">Rs.{obj.price}/-</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
                )
              })
            }
          </div>
      </Container>
    </div>
  );
}