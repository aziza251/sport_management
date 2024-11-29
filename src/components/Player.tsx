import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./components_styles/player.css";

type Player = {
  id: number;
  name: string;
  birth: string;
  sport: string;
  team: string;
};

const Player = () => {
  // Initialize state with data from localStorage if available, or fallback to an empty array
  const [playerCard, setPlayerCard] = useState(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });

  // Delete player handler
  const handleDelete = (playerId: number) => {
    // Filter out the player with the given ID
    const updatedList = playerCard.filter((player: Player) => player.id !== playerId);

    // Update the state and save the updated list to localStorage
    setPlayerCard(updatedList);
    localStorage.setItem("players", JSON.stringify(updatedList));
  };

  return (
    <div className="player-card-container">
      {playerCard.length === 0 ? (
        <p>No players available.</p>
      ) : (
        playerCard.map((player: Player) => (
          <div className="player-card" key={player.id}>
            <h2 className="player-name" contentEditable>{player.name}</h2>
            <h4>Date of Birth: {player.birth}</h4>
            <h4>Sport Field: {player.sport}</h4>
            <h4>Team: {player.team}</h4>
            <Button
              variant="contained"
              type="button"
              onClick={() => handleDelete(player.id)}
            >
              Delete Player
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Player;
