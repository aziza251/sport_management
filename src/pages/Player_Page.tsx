import React from 'react'
import Header_Main from '../components/Header_Main'
import Footer from '../components/Footer'
import Player from '../components/Player';

const Player_Page = () => {
    return (
        <div>
          <Header_Main />
       <div className="parent-container">
            <Player/></div>
          <Footer />
        </div>
      );
}

export default Player_Page