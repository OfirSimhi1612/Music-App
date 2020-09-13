import React from 'react';
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainFeed from './MainFeed';

function App() {
return (
  <>
    <Header></Header>
  <div id='body'>
    {/* <AddSong></AddSong>
    <AddArtist></AddArtist>
    <AddAlbum></AddAlbum>
    <AddPlaylist></AddPlaylist> */}
    <MainFeed></MainFeed>
  </div>
  </>
);
}

export default App;
