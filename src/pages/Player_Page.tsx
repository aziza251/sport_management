import React from 'react'
import Header_Main from '../components/Header_Main'
import Footer from '../components/Footer'
import Player from '../components/Player';
import TeamStatus from '../components/TeamStatus';


const Player_Page = () => {
    return (
        <div>
          <Header_Main />
          <div className="parent-container"
            style={{
              width: '100%', 
              height: '250vh', 
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center', 
              padding: 0 
            }}
          >
            <Player />
          </div>
          <Footer />
        </div>
      );
}

export default Player_Page
