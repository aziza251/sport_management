import React from "react";
import Header_Main from "../components/Header_Main";
import Footer from "../components/Footer";
import  './pages_styles/home.css';
import Create_Team from "../components/Create_Team";
import '../components/components_styles/Teamlist.css';
const Home_Page = () => {
  return (
    <div>
      <Header_Main />
   <div className="parent-container">
        <Create_Team /></div>
      <Footer />
    </div>
  );
};

export default Home_Page;
