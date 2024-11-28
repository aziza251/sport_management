
import React from "react";
import "./components_styles/create_team.css";
import { Button } from "@mui/material";


const handleSubmit = () => {
  console.log("Player created successfully!");
};
const Create_Team = () => {
  return (
    <>
      
      <div className="register-container" style={{ marginLeft: "340px" }}>
        <form>
          <h2 style={{color: 'white'}}>Create Player</h2>

          <div className="form-grid">
            <div className="form-column">
              <label htmlFor="player_name">First Name</label>
              <input
                type="text"
                id="player_name"
                name="player_name"
                required
              />
            </div>
            <div className="form-column">
              <label htmlFor="exam_title"> Last Name</label>
              <input type="text" id="exam_title" name="exam_title" required />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-column">
              <label htmlFor="birth_date">Birth Date</label>
              <input type="date" id="birth_date" name="exam_date" required />
            </div>
            <div className="form-column">
              <label htmlFor="sport_field">Sport Field</label>
              <input type="text" id="sport_field" name="sport_field" required />
            </div>
          
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Create Player
          </Button>
          </form>
          </div>

      
            
          


       
     
    </>
  );
};

export default Create_Team;
