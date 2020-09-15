import React from 'react';
import TopSongs from './components/MainFeed/TopSongs';
import TopPlaylists from './components/MainFeed/TopPlaylists';
import TopArtists from './components/MainFeed/TopArtists';
import TopAlbums from './components/MainFeed/TopAlbums';
import PlaylistPage from './components/Pages/PlaylistPage'
import AlbumPage from './components/Pages/AlbumPage'



import './MainFeed.css'


function MainFeed(props) {

    return (
        <>
            <div id='feed'>
                <AlbumPage></AlbumPage>
                <PlaylistPage></PlaylistPage>
                {/* <TopSongs></TopSongs>
                <TopPlaylists></TopPlaylists>
                <TopArtists></TopArtists>
                <TopAlbums></TopAlbums> */}

            </div>
        </>
    );
}

export default MainFeed;