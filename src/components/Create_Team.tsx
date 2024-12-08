import React, { useEffect, useState } from "react";
import "./components_styles/create_team.css";
import { Button } from "@mui/material";
import axios from "axios";

type Player = {
  id: number;
  name: string;
  birth: string;
  sport: string;
  team: string;
};


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

const Create_Team = () => {
  const [teamState, setTeamState] = useState<Team[]>([]);
  const [teamCard, setTeamCard] = useState<Team>({
    id: 0,
    team_name: "",
    num_of_members: 0,
    member1: "",
    member2: "",
    member3: "",
    member4: "",
    member5: "",
    member6: "",
    member7: "",
    member8: "",
    member9: "",
    member10: "",
    member11: "",
  });

  const apiUrl = "http://localhost:5000/teams"; // JSON Server API endpoint

  const fetchTeams = async () => {
    try {
      const response = await axios.get(apiUrl);
      setTeamState(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      alert("Failed to fetch teams. Please check your server connection.");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get<Player[]>("http://localhost:5000/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
  
    fetchPlayers();
  }, []);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const team_name = (document.getElementById("team_name") as HTMLInputElement).value;
    const num_of_members = parseInt(
      (document.getElementById("num_of_members") as HTMLInputElement).value
    );
  
    // Fetch selected members from the dropdown
    const membersDropdown = document.getElementById("members") as HTMLSelectElement;
    const selectedOptions = Array.from(membersDropdown.selectedOptions).map(
      (option) => option.value
    );
  
    // Log the selected options to check
    console.log("Selected Players:", selectedOptions);
  
    // Check if the number of selected members matches the specified count
    if (selectedOptions.length !== num_of_members) {
      alert(`You selected ${selectedOptions.length} members but specified ${num_of_members}.`);
      return;
    }
  
    // Prepare the team member fields (fill in empty members if necessary)
    const teamMembers = [...selectedOptions, ...Array(11 - selectedOptions.length).fill("")];
  
    const newTeam: Team = {
      id: teamState.length + 1,
      team_name,
      num_of_members,
      member1: teamMembers[0],
      member2: teamMembers[1],
      member3: teamMembers[2],
      member4: teamMembers[3],
      member5: teamMembers[4],
      member6: teamMembers[5],
      member7: teamMembers[6],
      member8: teamMembers[7],
      member9: teamMembers[8],
      member10: teamMembers[9],
      member11: teamMembers[10],
    };
  
    // Send the new team data to the server
    axios
      .post(apiUrl, newTeam)
      .then((response) => {
        console.log(response);
        alert("Team created successfully!");
  
        // Fetch the updated list of teams
        fetchTeams();  // Call the fetchTeams function to refresh the team list
  
        // Reset the form and state
        setTeamCard({
          id: 0,
          team_name: "",
          num_of_members: 0,
          member1: "",
          member2: "",
          member3: "",
          member4: "",
          member5: "",
          member6: "",
          member7: "",
          member8: "",
          member9: "",
          member10: "",
          member11: "",
        });
  
        // Reset selected members
        (document.getElementById("members") as HTMLSelectElement).selectedIndex = -1;
      })
      .catch((error) => {
        console.error("Error creating team:", error);
        alert("Failed to create the team.");
      });
  };
  
  
  return (
    <>
      <div className="register-container" style={{ marginLeft: "340px" }}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: "white" }}>Create Team</h2>

          <div className="form-grid">
            <div className="form-column">
              <label htmlFor="team_name">Team Name</label>
              <input type="text" id="team_name" name="team_name" 
              value={teamCard.team_name} onChange={(e) => setTeamCard({ ...teamCard, team_name: e.target.value })}
              required />
            </div>

            <div className="form-column">
              <label htmlFor="num_of_members">Number of Members</label>
              <input type="number" id="num_of_members" name="num_of_members" 
              value={teamCard.num_of_members} onChange={(e) => setTeamCard({ ...teamCard, num_of_members: parseInt(e.target.value) })}
              required />
            </div>
          </div>

          <div className="form-grid">
  <div className="form-column">
    <label htmlFor="members">Choose Members</label>
    <select id="members" name="members" required multiple = {true}>
      {players.map((player) => (
        <option key={player.id} value={player.name}>
          {player.name}
        </option>
      ))}
    </select>
  </div>
</div>

          <Button variant="contained" color="primary" type="submit">
            Create Team
          </Button>
        </form>
      </div>
    </>
  );
};

export default Create_Team;
