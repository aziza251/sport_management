import React, { useState, useEffect } from "react";
import "./components_styles/create_team.css";
import { Button } from "@mui/material";

// Default import of players
import players from "../data/players"; // Initial player data

type Player = {
  id: number;
  name: string;
  birth: string;
  sport: string;
  team: string;
};

const Create_player = () => {
  // Initialize the players state with localStorage data if available, otherwise fallback to default players data
  const [playersState, setPlayersState] = useState(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : players;
  });

  const [playerCard, setPlayerCard] = useState({
    id: playersState.length + 1,
    name: "",
    birth: "",
    sport: "",
    team: "",
  });

  // Handle input changes in form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerCard({ ...playerCard, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all fields are filled in before adding the player
    if (playerCard.name && playerCard.team && playerCard.birth && playerCard.sport) {
      // Create new player object
      const newPlayer = { ...playerCard, id: playersState.length + 1 };
      const updatedPlayers = [...playersState, newPlayer];

      // Update the state
      setPlayersState(updatedPlayers);

      // Save updated players to localStorage
      localStorage.setItem("players", JSON.stringify(updatedPlayers));

      alert("Player created successfully!");

      // Reset the form fields after submission
      setPlayerCard({
        id: updatedPlayers.length + 1,
        name: "",
        birth: "",
        sport: "",
        team: "",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    console.log("Players in localStorage:", localStorage.getItem("players"));
  }, [playersState]);

  return (
    <>
      <div className="register-container" style={{ marginLeft: "340px" }}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: "white" }}>Create Player</h2>

          <div className="form-grid">
            <div className="form-column">
              <label htmlFor="player_name">Player Name</label>
              <input
                type="text"
                id="player_name"
                name="name"
                value={playerCard.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-column">
              <label htmlFor="team">Team</label>
              <input
                type="text"
                id="team"
                name="team"
                value={playerCard.team}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-column">
              <label htmlFor="birth_date">Birth Date</label>
              <input
                type="date"
                id="birth_date"
                name="birth"
                value={playerCard.birth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-column">
              <label htmlFor="sport_field">Sport Field</label>
              <input
                type="text"
                id="sport_field"
                name="sport"
                value={playerCard.sport}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <Button variant="contained" color="primary" type="submit">
            Create Player
          </Button>
        </form>
      </div>

      {/* Display the players list */}
      <div>
        <h3>Players List</h3>
        <ul>
          {playersState.map((player: Player) => (
            <li key={player.id}>
              {player.name} ({player.sport}) - {player.team}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Create_player;
