
import React from "react";
import "./components_styles/create_team.css";
import { Button } from "@mui/material";


const handleSubmit = () => {
  console.log("Team created successfully!");
};
const Create_Team = () => {
  return (
    <>
      
      <div className="register-container" style={{ marginLeft: "340px" }}>
        <form>
          <h2 style={{color: 'white'}}>Create Team</h2>

          <div className="form-grid">
            <div className="form-column">
              <label htmlFor="team_name">Team Name</label>
              <input
                type="text"
                id="team_name"
                name="team_name"
                required
              />
            </div>

            <div className="form-column">
              <label htmlFor="num_of_members"> Number of Members </label>
              <input type="number" id="num_of_members" name="num_of_members" required />
            </div>
          </div>


          <div className="form-grid">
         
          <div className="form-column">
          <label htmlFor="members">Choose Members</label>
          <select id="members" name="members"   required></select>
       </div>
          </div>
      <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Create Team
          </Button>
        </form>
      </div>
    </>
  );
};

export default Create_Team;
