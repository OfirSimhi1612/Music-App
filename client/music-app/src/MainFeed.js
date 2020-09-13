import React from 'react';
import TopSongs from './components/MainFeed/TopSongs';
import TopPlaylists from './components/MainFeed/TopPlaylists';
import TopArtists from './components/MainFeed/TopArtists';
import TopAlbums from './components/MainFeed/TopAlbums';


import './MainFeed.css'


function MainFeed(props) {
    
    return (
        <>
        <div id='feed'>
            <TopSongs></TopSongs>
            <div id='rightSection'>
                <TopPlaylists></TopPlaylists>
                <TopArtists></TopArtists>
                <TopAlbums></TopAlbums>
            </div>
        </div>
        </>
    );
}

export default MainFeed;