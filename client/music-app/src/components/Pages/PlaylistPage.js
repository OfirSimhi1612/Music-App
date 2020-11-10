import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaylistPage.css';
import playlistTime from './playlistTime';
import LikeButton from '../LikesButton/LikesButton';
import Song from './Song';


function PlaylistPage(props) {

    const [displayedPlaylist, setDisplayedPlaylist] = useState({});
    const [playlistSongs, setPlaylistSongs] = useState([]);

    useEffect(() => {
        async function fetch() {
            console.log(props.match.params.id)
            const songs = await axios.get(`/playlist/songs/${props.match.params.id}`);
            const playlist = await axios.get(`/playlist/${props.match.params.id}`);
            setDisplayedPlaylist(playlist.data);
            setPlaylistSongs(songs.data);
        }
        fetch()
    }, [])

    function updateLikes(liked) {
        if (liked) {
            setDisplayedPlaylist({
                ...displayedPlaylist,
                likes: displayedPlaylist.likes + 1
            })
        } else {
            setDisplayedPlaylist({
                ...displayedPlaylist,
                likes: displayedPlaylist.likes - 1
            })
        }
    }

    return (
        <>
            <div id='playlistHead'>
                <img className='playlistPageImage' src={displayedPlaylist.coverImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='playlistDetails'>
                    <h2 className='playlistName'>{displayedPlaylist.name}
                        <span className='palylistGenre'>{displayedPlaylist.genre}</span>
                    </h2>
                    <span className='playlistLength'>{playlistSongs.length} Songs</span>
                    <span className='playlistTime'>{playlistTime(playlistSongs)}</span>
                    <div className='bottomDetails'>
                        <span className='playlistLikes'>{displayedPlaylist.likes} Likes</span>
                        <LikeButton
                            id={displayedPlaylist.id}
                            model={'playlist'}
                            updateLikes={updateLikes}
                        />
                    </div>
                </div>
            </div>
            <div className='playlistSongs'>
                {playlistSongs.map((song) => {
                    return <Song
                        name={song.title}
                        artist={song.Artist.name}
                        album={song.Album.name}
                        length={song.length}
                        link={song.youtubeLink}
                        cover_img={song.coverImg}
                        index={song.Songs_in_playlist.index}
                        id={song.id}
                        orgin={`playlist=${displayedPlaylist.id}`}
                        artistId={song.artistId}
                        albumId={song.albumId}
                    />
                })}
            </div>
        </>
    );

}

export default PlaylistPage;