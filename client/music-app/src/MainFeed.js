import React from 'react';
import TopSongs from './components/TopSongs';
import TopPlaylists from './components/TopPlaylists';
import './MainFeed.css'


function MainFeed(props) {
    
    return (
        <>
        <div id='feed'>
            <TopSongs></TopSongs>
            <TopPlaylists></TopPlaylists>
        </div>
        </>
    );
}

export default MainFeed;