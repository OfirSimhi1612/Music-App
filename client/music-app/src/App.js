import React from 'react';
import './App.css';
import AddSong from './components/AddSong';
import AddArtist from './components/AddArtist';
import AddAlbum from './components/AddAlbum'
import AddPlaylist from './components/AddPlaylist'

function App() {
return (
  <>
    <AddSong></AddSong>
    <AddArtist></AddArtist>
    <AddAlbum></AddAlbum>
    <AddPlaylist></AddPlaylist>
  </>
);
}

export default App;
