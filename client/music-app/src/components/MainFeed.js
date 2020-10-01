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
				<TopPlaylists></TopPlaylists>
				<TopArtists></TopArtists>
				<TopAlbums></TopAlbums>

			</div>
		</>
	);
}

export default MainFeed;

try {
	const result = await new Promise((resolve, reject) => {
		this.connection.query('...', (error, results) => {
			if (error) {
				reject(error.message)
			} else {
				resolve(results)
			}
		})
	})
} catch (error) {
	return error
}
