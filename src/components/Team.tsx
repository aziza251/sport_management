import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import TeamStatus from '../components/TeamStatus';

type Team = {
  id: number;
  team_name: string;
  num_of_members: number;
  member1?: string;
  member2?: string;
  member3?: string;
  member4?: string;
  member5?: string;
  member6?: string;
  member7?: string;
  member8?: string;
  member9?: string;
  member10?: string;
  member11?: string;
};

const TeamDetails = () => {
  const { teamId } = useParams(); // Get teamId from the URL
  const [team, setTeam] = useState<Team | null>(null);
  const [editTeamId, setEditTeamId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Team>>({});
  const apiUrl = `http://localhost:5000/teams`; // Updated URL to generalize

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${teamId}`);
        setTeam(response.data); // Set the specific team data
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    if (teamId) {
      fetchTeam();
    }
  }, [teamId]); // Re-fetch if the teamId changes

  if (!team) {
    return <div>Loading team details...</div>; // Loading state if team data is not yet available
  }

  // Delete a team
  const handleDelete = async (teamId: number) => {
    try {
      await axios.delete(`${apiUrl}/${teamId}`);
      setTeam(null); // Clear team data after delete
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  // Edit button handler
  const handleEditClick = (team: Team) => {
    setEditTeamId(team.id); // Set the ID of the team being edited
    setEditFormData(team); // Populate form with existing team data
  };

  // Handle changes in the edit form
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  // Save updated team
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeamId || !editFormData) return;
  
    try {
      const updatedTeam = { ...editFormData, id: editTeamId };
      await axios.put(`${apiUrl}/${editTeamId}`, updatedTeam);
      setTeam(updatedTeam as Team);
      setEditTeamId(null); // Exit editing mode
      setEditFormData({}); // Reset form data after saving
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };
  

  // Cancel editing
  const handleCancelEdit = () => {
    setEditTeamId(null);
    setEditFormData({});
  };


  const handleRemovePlayer = (memberKey: keyof Team) => {
    setEditFormData((prev) => {
      // Remove the player from the state
      const updatedFormData = { ...prev };
      delete updatedFormData[memberKey];
  
      // Update the num_of_members field
      const updatedNumOfMembers = (prev.num_of_members || 0) - 1;
  
      return {
        ...updatedFormData,
        num_of_members: updatedNumOfMembers,
      };
    });
  };
  

  const handleAddPlayer = () => {
    setEditFormData((prev) => {
      const updatedFormData: Partial<Team> = { ...prev };
  
      // Determine the next available member key
      const nextMemberKey = `member${(prev.num_of_members || 0) + 1}`;
  
      // Add the new member with a placeholder value (e.g., "New Player")
      (updatedFormData as any)[nextMemberKey] = "New Player";
  
      // Increment the num_of_members field
      const updatedNumOfMembers = (prev.num_of_members || 0) + 1;
  
      return {
        ...updatedFormData,
        num_of_members: updatedNumOfMembers,
      };
    });
  };
  
  
  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "10px",
        minHeight: "180vh",
        marginTop: "450px",
      
      }}
    >
      
      
        
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          padding: "20px",
          backgroundColor: "rgb(64, 8, 56)",
          borderRadius: "8px",
          marginBottom: "70px",
          gap: "5px",
         
        }}
      >



<p>
  <strong style={{ color: "white", marginRight: "10px" }}>Team Name:</strong>
  {editTeamId ? (
    <input
      type="text"
      name="team_name"
      value={editFormData.team_name || ""}
      onChange={handleFormChange}
      style={{ width: "300px", marginLeft: "25px" }}
    />
  ) : (
    <span style={{ fontSize: "20px", color: "white" }}> {team.team_name}</span>
  )}
</p>

      


        <p>
  <strong style={{ color: "white", marginRight: "10px" }}>Number of Members:</strong>
  {editTeamId ? (
    <input
      type="number"
      name="num_of_members"
      value={editFormData.num_of_members || ""}
      onChange={handleFormChange}
      style={{ width: "300px", marginLeft: "25px" }}
    />
  ) : (
    <span style={{ fontSize: "20px", color: "white" }}> {team.num_of_members}</span>
  )}
</p>

    
        {team.num_of_members < 11 ? (
          <TeamStatus type="warning" message="The team has less than 11 players." />
        ) : (
          <TeamStatus type="info" message="The team has a sufficient number of players." />
        )}


        <ul
    style={{
    display: "flex",
    flexWrap: "wrap",
    padding: 5,
    margin: "10px 0",
    listStyleType: "none",
    gap: "10px", // Space between list items
    borderRadius: "5px",
  }}
>
  {[...Array(team.num_of_members)].map((_, index) => {
    const memberKey = `member${index + 1}` as keyof Team;
    return (
      <li
        key={index}
        style={{
          flex: "1 1 calc(50% - 10px)", // Two columns with space between them
          padding: "10px",
          margin: "5px 0",
          backgroundColor: "white",
          borderRadius: "5px",
          color: "rgb(64, 8, 56)",
          boxSizing: "border-box",
          position: "relative", // To position the Remove button
        }}
      >
        {editTeamId ? (
          <>
            <input
              type="text"
              name={memberKey}
              value={editFormData[memberKey] || ""}
              onChange={handleFormChange}
              style={{
                width: "80%",
                padding: "5px",
                borderRadius: "5px",
                color: "rgb(64, 8, 56)",
              }}
            />
            <button
              onClick={() => handleRemovePlayer(memberKey)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </>
        ) : (
          <span>{team[memberKey]}</span>
        )}
      </li>
    );
  })}
</ul>

{/* Add Player Button */}
{editTeamId && (
  <div style={{ marginTop: "10px" }}>
    <button
      onClick={handleAddPlayer}
      style={{
        padding: "10px",
        width: "20%",
        backgroundColor: "white",
        color: "rgb(64, 8, 56)",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "18px",
       }}
    >
      Add Player
    </button>
  </div>
)}


        {/* Conditional rendering for Save/Cancel buttons */}
        {editTeamId && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100px", marginLeft: "17px", marginRight: "15px" }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelEdit}
              style={{ width: "100px", marginLeft: "17px", marginRight: "15px" }}
            >
              Cancel
            </Button>
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleDelete(team.id)}
            style={{ width: "100px" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleEditClick(team)}
            style={{ width: "100px" }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
