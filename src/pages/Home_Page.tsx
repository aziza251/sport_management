import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Header_Main from "../components/Header_Main";
import Footer from "../components/Footer";
import  './pages_styles/home.css';

import Team from "../components/Team";



const Home_Page = () => {
  interface Team {
    id: number;
    team_name: string;
  }

  const [teams, setTeams] = useState<Team[]>([]);
  const apiUrl = "http://localhost:5000/teams";

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);


  return (
    <>
      <Header_Main />
      {teams.map((team) => (
        <div className="parent-container" key={team.id}
      >
        <Link to={`/team/${team.id}`}
style={{
  width: '80vw', 
  height: '70px', 
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '16px',
  backgroundColor: 'rgb(64,8,56)',
  display: 'flex',
  alignItems: 'center', 
   
  textAlign: 'center', 
  marginLeft: '50px',
  borderColor: 'aliceblue',
  fontSize: '25px',
  color: 'white',
  textEmphasis: 'bold',
  
}} 
        >{team.team_name}</Link>  
         </div>
      ))}
      <Footer />
  
    </>
  );
};

export default Home_Page;
