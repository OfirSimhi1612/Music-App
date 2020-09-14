import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import MainFeed from './MainFeed';
import AddAlbum from './components/AddComponents/AddAlbum';
import AddArtist from './components/AddComponents/AddArtist';
import AddSong from './components/AddComponents/AddSong';
import AddPlaylist from './components/AddComponents/AddPlaylist';




function App() {
return (
  <>
    <BrowserRouter>
    <div id='body'>
    <Header></Header>
    <Switch>
      <Route path={'/'} exact component={MainFeed} />
      <Route path={'/addSong'} exact component={AddSong} />
      <Route path={'/addArtist'} exact component={AddArtist} />
      <Route path={'/addAlbum'} exact component={AddAlbum} />
      <Route path={'/addPlaylist'} exact component={AddPlaylist} />
    </Switch>
    </div>
    </BrowserRouter>


    {/* <Header></Header>
  <div id='body'>
    <AddSong></AddSong>
    <AddAlbum></AddAlbum> 
    <AddArtist></AddArtist>
    <AddPlaylist></AddPlaylist>
     <MainFeed></MainFeed>
  </div> */}
  </>
);
}

export default App;
