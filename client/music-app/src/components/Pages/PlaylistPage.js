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
            const { data } = await axios.get(`/playlists/${props.match.params.id}`);
            console.log(data[0])
            setDisplayedPlaylist(data[0]);
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/songsInPlaylist/${props.match.params.id}`);
            console.log(data)
            setPlaylistSongs(data);
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
                <img src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='playlistDetails'>
                    <h2 className='playlistName'>{displayedPlaylist.name}
                        <span className='palylistGenre'>{displayedPlaylist.genre}</span>
                    </h2>
                    <span className='playlistLength'>{playlistSongs.length} Songs</span>
                    <span className='playlistTime'>{playlistTime(playlistSongs)}</span>
                    <div className='bottomDetails'>
                        <span className='playlistLikes'>{displayedPlaylist.likes} Likes</span>
                        <LikeButton
                            id={displayedPlaylist.playlist_id}
                            table={'playlists'}
                            updateLikes={updateLikes}
                        />
                    </div>
                </div>
            </div>
            <div className='playlistSongs'>
                {playlistSongs.map((song) => {
                    return <Song
                        name={song.name}
                        artist={song.artist}
                        album={song.album}
                        length={song.length}
                        link={song.link}
                        cover_img={song.cover_img}
                        index={song.index}
                        id={song.id}
                        orgin={`playlist=${displayedPlaylist.playlist_id}`}
                    />
                })}
            </div>
        </>
    );

}

export default PlaylistPage;