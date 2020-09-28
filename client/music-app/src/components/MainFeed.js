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
				{/* <div style={{ color: 'white' }}>
					{document.cookie.includes('test') ?
						<span>auth</span>
						: <span>no auth</span>}
				</div> */}
				<TopSongs></TopSongs>
				<TopPlaylists></TopPlaylists>
				<TopArtists></TopArtists>
				<TopAlbums></TopAlbums>

			</div>
		</>
	);
}

export default MainFeed;