import './App.css';
import Login from "./Pages/Login";
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import InstructorForm from "./Pages/instructorForm"
import OurCourses from './Pages/OurCourses';
import CourseDetails from './Pages/CourseDetails'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/instructor-Form" element={<InstructorForm />} />
      <Route exact path="/our-Courses" element={<OurCourses/>} />
      <Route exact path="/CourseDetails" element={<CourseDetails/>}/>
      </Routes>
  </Router>
    </div>
  );
}

export default App;
