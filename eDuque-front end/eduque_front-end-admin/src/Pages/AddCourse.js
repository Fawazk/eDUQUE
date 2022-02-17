import React from 'react';
import AddCourse from '../Components/AddCourse/AddCourse';
import Adminpanel from '../Components/Adminpanel/Adminpanel';


function AddCoursePage() {
    return (
      <div>
        <Adminpanel>
        <AddCourse/>
        </Adminpanel>
      </div>
    );
  }
  
  export default AddCoursePage;