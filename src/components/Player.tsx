import React from 'react'
import { Button } from "@mui/material";
import './components_styles/player.css'
const Player = () => {
    const handleSubmit = () => {
        console.log("Player deleted successfully!");};


    return (
        <div className="player-card-container">
         <h2 className="player-name">Player Name</h2>
          <h4 >Date of Birth:</h4>
          <h4>Sport Field: </h4>
          <h4 >Team:</h4>
       

        <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Delete Player
          </Button>
         </div>

     

      );

}

export default Player;
