import React from 'react';
import Dashboard from '../Components/Dashboard/Dashboard';
import Adminpanel from '../Components/Adminpanel/Adminpanel';


function DashboardPage() {
    return (
      <div>
        <Adminpanel>
        <Dashboard/>
        </Adminpanel>
      </div>
    );
  }
  
  export default DashboardPage;