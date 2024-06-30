import React from 'react';
import Navbar from '../../components/reuseable/Navbar/Navbar';
import SidebarContainer from '../../components/reuseable/Sidebar/SidebarContainer';

function Home() {
  return (
    <div>
      <SidebarContainer>
        <Navbar />
        <div className="main-content">
          <div className="container">
            <h1 className="text-3xl font-bold underline text-green-600">
              Home
            </h1>
          </div>
        </div>
      </SidebarContainer>
    </div>
  );
}

export default Home;
