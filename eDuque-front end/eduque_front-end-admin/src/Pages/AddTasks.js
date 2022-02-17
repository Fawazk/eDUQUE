import React from 'react';
import AddTasks from '../Components/AddTasks/AddTasks';
import Adminpanel from '../Components/Adminpanel/Adminpanel';


function AddTasksPage() {
    return (
      <div>
        <Adminpanel>
        <AddTasks/>
        </Adminpanel>
      </div>
    );
  }
  
  export default AddTasksPage;