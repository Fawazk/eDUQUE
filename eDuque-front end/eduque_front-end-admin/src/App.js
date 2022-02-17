import './App.css';
import Login from "./Pages/Login";
import Courses from "./Pages/Courses";
import Dashboard from './Pages/Dashboard';
import AddCourse from './Pages/AddCourse'
import Tasks from './Pages/Tasks';
import AddTasks from './Pages/AddTasks';
import List_questions from './Pages/List_questions';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/Courses" element={<Courses />} />
      <Route exact path="/Dashboard" element={<Dashboard />} />
      <Route exact path="/Add_Course" element={<AddCourse />} />
      <Route exact path="/Tasks" element={<Tasks />} />
      <Route exact path="/AddTasks" element={<AddTasks />} />
      <Route exact path="/List_questions/:id" element={<List_questions />} />
      </Routes>
  </Router>
    </div>
  );
}

export default App;
