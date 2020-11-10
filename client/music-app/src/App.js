import React, { useEffect } from 'react';
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
import SignUp from './components/UserInteractions/SignUp';
import LogIn from './components/UserInteractions/Login';
import UserSongs from './components/UserPages/UserSongs';
import UserPlaylists from './components/UserPages/UserPlaylists';
import { useUpdateUser } from './UserContext';
import cookie from 'react-cookies';
import network from './components/Network/network'
import BottomPlayer from './components/BottomPlayer'
import { useUpdateBottomPlayer } from './UserContext'







function App() {

  const updateUser = useUpdateUser()
  const updatePlayer = useUpdateBottomPlayer()

  useEffect(() => {

    // updatePlayer({
    //   Display: false,
    //   FullScreen: true,
    //   CurrentSong: {},
    //   Queue: null,
    //   LocationQuery: null
    // })

    async function getUser() {
      try {
        const userDetails = await network.get('/user/auth')
        updateUser(userDetails.data)
      } catch (error) {
        console.log(error)
      }

    }
    if (cookie.load('music_jwt')) {
      getUser()


    }

  }, [])

  return (
    <>

      <BrowserRouter>
        <div id='body'>
          <Header></Header>
          <BottomPlayer></BottomPlayer>
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
            <Route path={'/SignUp'} exact component={SignUp} />
            <Route path={'/LogIn'} exact component={LogIn} />
            <Route path={'/UserSongs'} exact component={UserSongs} />
            <Route path={'/UserPlaylists'} exact component={UserPlaylists} />
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
