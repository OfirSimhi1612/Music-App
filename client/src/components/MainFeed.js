import React from 'react';
import TopSongs from './MainFeed/TopSongs';
import TopPlaylists from './MainFeed/TopPlaylists';
import TopArtists from './MainFeed/TopArtists';
import TopAlbums from './MainFeed/TopAlbums';



import './MainFeed.css'


function MainFeed(props) {

	return (
		<>
			<div id='feed'>
				<TopSongs></TopSongs>
				<TopArtists></TopArtists>
				<TopPlaylists></TopPlaylists>
				<TopAlbums></TopAlbums>

			</div>
		</>
	);
}

export default MainFeed;


