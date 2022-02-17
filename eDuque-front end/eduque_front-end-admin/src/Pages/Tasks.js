import React from 'react';
import Tasks from '../Components/Tasks/Tasks';
import Adminpanel from '../Components/Adminpanel/Adminpanel';



function TasksPage() {
    return (
      <div>
        <Adminpanel>
        <Tasks/>
        </Adminpanel>
      </div>
    );
  }
  
  export default TasksPage;