import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./components_styles/player.css";
import Create_Team from "./Create_Team";


type Player = {
  id: number;
  name: string;
  birth: string;
  sport: string;
  team: string;
};


const Player = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [editPlayerId, setEditPlayerId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Player>>({});
  const apiUrl = "http://localhost:5000/players";

  // Fetch players from JSON Server on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get<Player[]>(apiUrl);
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  // Delete player handler
  const handleDelete = async (playerId: number) => {
    try {
      await axios.delete(`${apiUrl}/${playerId}`);
      setPlayers((prev) => prev.filter((player) => player.id !== playerId));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  // Edit button handler
  const handleEditClick = (player: Player) => {
    setEditPlayerId(player.id); // Set the ID of the player being edited
    setEditFormData(player); // Populate form with existing player data
  };

  // Handle changes in the edit form
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated player
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPlayerId) return;

    try {
      const updatedPlayer = { ...editFormData, id: editPlayerId };
      await axios.put(`${apiUrl}/${editPlayerId}`, updatedPlayer);
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === editPlayerId ? (updatedPlayer as Player) : player
        )
      );
      setEditPlayerId(null); // Exit editing mode
      setEditFormData({});
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditPlayerId(null);
    setEditFormData({});
  };

  return (
    
    <div className="player-card-container">
      {players.length === 0 ? (
        <p>No players available.</p>
      ) : (
        players.map((player) => (
          <div className="player-card" key={player.id}>
            {editPlayerId === player.id ? (
              <form onSubmit={handleSave}>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name || ""}
                  onChange={handleFormChange}
                  placeholder="Player Name"
                  
                  style={{ width: "250px" }}
                />
                <input
                  type="date"
                  name="birth"
                  value={editFormData.birth || ""}
                  onChange={handleFormChange}
                  
                  style={{ width: "250px" }}
                />
                <input
                  type="text"
                  name="sport"
                  value={editFormData.sport || ""}
                  onChange={handleFormChange}
                  placeholder="Sport Field"
                  
                  style={{ width: "250px" }}
                />
                <input
                  type="text"
                  name="team"
                  value={editFormData.team || ""}
                  onChange={handleFormChange}
                  placeholder="Team"
                
                  style={{ width: "250px" }}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Button type="submit" variant="contained" color="primary"
                 style={{ width: "100px", marginLeft:"17px", marginRight: "  15px"}}>
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelEdit}
                  style={{ width: "100px", marginLeft:"17px", marginRight: "  15px"}}
                >
                  Cancel
                </Button>
                </div>


              </form>
            ) : (
              <>
             
                <h2 className="player-name">{player.name}</h2>
                <h4>Date of Birth: {player.birth}</h4>
                <h4>Sport Field: {player.sport}</h4>
                <h4>Team: {player.team}</h4>
                <div style={{ display: "flex", gap: "5px", marginTop: "10px", marginRight: "  15px"}}>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => handleDelete(player.id)}
                
                  style={{ width: "100px"}}
                
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => handleEditClick(player)}
                  style={{ width: "100px"}}
                >
                  Edit
                </Button> </div>
                

              </>
             
            )}
          </div>
        ))
      )}
        
    </div>
    
  );

};

export default Player;
