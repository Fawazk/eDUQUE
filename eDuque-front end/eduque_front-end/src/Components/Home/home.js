import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';

// import background from "..../static images/Meet-Instructors-Header.png"
import './home.css';

export default function Home() {
    const navigate = useNavigate()
    const [courseList, setCourseList] = useState([])

    const instructorForm = (event) => {
        event.preventDefault();
        navigate('/instructor-Form')
    }
    useEffect(() => {
        const access = localStorage.getItem('access')
        try {
          axios.get('http://localhost:8000/api/admin/courses', { headers: { "Authorization": `Bearer  ${access}` } }).then((response) => {
            setCourseList(response.data)
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
            <div className="home">
                <div className="topbody">
                    <div style={{ padding: '1%' }}>
                        <Navbar />
                    </div>
                    <div className="title" style={{ paddingTop: '6%' }}>
                        <h1 className="heading" >About Us</h1>
                        <div>
                            <div style={{ display: "flex", justifyContent: 'center' }}>
                                <p style={{ textAlign: 'center', width: '80%',color: 'white' }}>The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet. The characters are spread out evenly so that the reader's attention is focused on the layout of the text instead of its content.</p>
                            </div>
                        </div>
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                            <Button style={{ color: 'white', backgroundColor: '#94CAC5', margin: '2%' }} onClick={instructorForm}><strong>Be a Instructors</strong></Button>
                            </Box>
                        </div>
                    </div>
                </div>
                <div container maxWidth="sm" className="ourDetails" >
                    <h1 >Be Self-Taught</h1>
                    <Container maxWidth="md" sx={{ boxShadow: 4, marginBottom: 10 }}>
                        <Box sx={{
                            textAlign: 'center',
                            padding: 5,
                        }}>
                            <p >The lorem ipsum is a placeholder text used in publishing and graphic design.
                                This filler text is a short paragraph that contains all the letters of the alphabet.
                                The characters are spread out evenly so that the reader's attention is focused
                                The characters are spread out evenly so that the reader's attention is focused on the layout of the text instead of its content.</p>
                        </Box>
                    </Container>
                    <h1>Popular Courses</h1>
                    <Container maxWidth="lg" className="container">
                        <div className="row">
                            {/* <Card className="courseCard">
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image=""
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card> */}
                            {courseList && courseList.map((obj, index) => {
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
            </div>
        </div>
    );
}