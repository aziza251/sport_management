import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
 import './components_styles/teamlist.css'; // Import the CSS file
import { Button } from '@mui/material';


type Team = {
  id: number;
  team_name: string;
  num_of_members: number;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  member5: string;
  member6: string;
  member7: string;
  member8: string;
  member9: string;
  member10: string;
  member11: string;
};
const Teamlist = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  
  const Url = "http://localhost:5000/teams";
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get<Team[]>(Url);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);
    return (
<div>
 
      <div className="team-card-container"
      >
        {teams.map((team) => (
          <a href={`/teams/${team.id}`} key={team.id} className="team-card">
            <h2 className="team-card-header">{team.team_name}</h2>
            <div className="team-card-info">
              <h4>Players: {team.num_of_members}</h4>
            </div>
          </a>
        ))}
      </div>


       

        
        </div> 
      );
};

export default Teamlist;
