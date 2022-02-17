import React from 'react';
import Courses from '../Components/Courses/Courses';
import Adminpanel from '../Components/Adminpanel/Adminpanel';


function CoursesPage() {
    return (
      <div>
        <Adminpanel>
        <Courses/>
        </Adminpanel>
      </div>
    );
  }
  
  export default CoursesPage;