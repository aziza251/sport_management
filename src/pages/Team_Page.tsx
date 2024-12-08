import React from "react";
import Header_Main from "../components/Header_Main";
import Footer from "../components/Footer";
import  './pages_styles/home.css';
import Team from "../components/Team";
import '../components/components_styles/teamlist.css';
import TeamStatus from '../components/TeamStatus';

const Team_Page = () => {
  
  return (
    <div>
      <Header_Main />
      <div className="parent-container" style={{ marginTop: '100px', marginBottom: '30px' }}>
        <Team />
      </div>
      <Footer />
    </div>
  );
};
export default Team_Page;