import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import MainFeed from './components/MainFeed';
import AddAlbum from './components/AddComponents/AddAlbum';
import AddArtist from './components/AddComponents/AddArtist';
import AddSong from './components/AddComponents/AddSong';
import AddPlaylist from './components/AddComponents/AddPlaylist';
import PlaylistPage from './components/Pages/PlaylistPage';
import AlbumPage from './components/Pages/AlbumPage';
import ArtistPage from './components/Pages/ArtistPage';
import Video from './components/Video';
import SearchPage from './components/Pages/SearchPage';





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
            <Route path={'/playlist/:id'} exact component={PlaylistPage} />
            <Route path={'/album/:id'} exact component={AlbumPage} />
            <Route path={'/artist/:id'} exact component={ArtistPage} />
            <Route path={'/SearchPage'} exact component={SearchPage} />
            <Route path={'/song/:id'}>
              <Video />
            </Route>
            <Route
              render={() => {
                return <div style={{ color: 'white' }}>error 404, page not found</div>
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
