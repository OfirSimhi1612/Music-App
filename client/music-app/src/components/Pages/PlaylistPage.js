import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaylistPage.css';

function SongInPlaylist(props) {

    const [liked, setLiked] = useState(false)

    const goToLink = React.useCallback(() => {
        props.playVideo(props.link);
    }, [props.link]);

    const addLike = React.useCallback(async (e) => {
        e.stopPropagation();
        try {
            setLiked(true);
            axios.put(`/like/songs/${props.id}`);
        } catch (error) {
            console.log(error.message);
        }
    }, [props.id]);

    const disLike = React.useCallback(async (e) => {
        e.stopPropagation();
        try {
            setLiked(false);
            axios.put(`/dislike/songs/${props.id}`);
        } catch (error) {
            console.log(error.message);
        }
    }, [props.id]);

    return (
        <>
            <div className='songInPlaylist' onClick={goToLink}>
                <span className='songIndex'>{props.index}</span>
                <img className='SongImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='songDetails'>
                    <div className='SongName'>{props.name}</div>
                    <div className='SongArtist'>{props.artist} / {props.album}</div>
                </div>
                <span className='SongLength'>{parseInt(props.length.slice(0, 2)) > 0 ? props.length : props.length.slice(3)}</span>
                {liked ?
                    <img className='likeButton' onClick={(e) => disLike(e)} src='https://cdn.pixabay.com/photo/2013/07/13/10/27/dislike-157252_1280.png'></img>
                    : <img className='likeButton' onClick={(e) => addLike(e)} src='https://jeannecolemanlaw.com/wp-content/uploads/2015/07/hand-like-thumb-up-confirm-okay-go-green.png'></img>
                }
            </div>
        </>
    );
}

function PlaylistPage(props) {

    const [Liked, setLiked] = useState('false')
    const [displayedPlaylist, setDisplayedPlaylist] = useState({});
    const [playlistSongs, setPlaylistSongs] = useState([]);

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/playlists/${'2'}`);
            console.log(data)
            setDisplayedPlaylist(data[0]);
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/songsInPlaylist/${'2'}`);
            console.log(data)
            setPlaylistSongs(data);
        }
        fetch()
    }, [])

    const playlistTime = React.useCallback(() => {
        let length = [0, 0, 0];
        const totalLength = playlistSongs.map((song) => {
            const h = parseInt(song.length.slice(0, song.length.indexOf(':')));
            const m = parseInt(song.length.slice(3, 5));
            const s = parseInt(song.length.slice(6, 8));
            let remain = Math.floor((length[2] + s) / 60)
            length[2] = (length[2] + s) % 60;
            length[1] = length[1] + remain;
            remain = Math.floor((length[1] + m) / 60)
            length[1] = (length[1] + m) % 60;
            length[0] = length[0] + remain + h;
        });

        let lengthInWords = '';

        if (length[0]) {
            lengthInWords += `${length[0]} Hours `;
            if (length[1]) {
                lengthInWords += `and ${length[1]} Minutes`;
            }
        } else {
            lengthInWords += `${length[1]} Minutes`;
        }

        return lengthInWords


    }, [playlistSongs])

    const addLike = React.useCallback(async (e) => {
        e.stopPropagation();
        try {
            setLiked(true);
            axios.put(`/like/playlists/${props.id}`);
        } catch (error) {
            console.log(error.message);
        }
    }, [props.id]);

    const disLike = React.useCallback(async (e) => {
        e.stopPropagation();
        try {
            setLiked(false);
            axios.put(`/dislike/playlist/${props.id}`);
        } catch (error) {
            console.log(error.message);
        }
    }, [props.id]);

    return (
        <>
            <div id='playlistHead'>
                <img src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='playlistDetails'>
                    <h2 className='playlistName'>{displayedPlaylist.name}
                        <span className='palylistGenre'>{displayedPlaylist.genre}</span>
                    </h2>
                    <span className='playlistLength'>{playlistSongs.length} Songs</span>
                    <span className='playlistTime'>{playlistTime()}</span>
                    <div className='bottomDetails'>
                        <span className='playlistLikes'>{displayedPlaylist.likes} Likes</span>
                        {!Liked ?
                            <img className='likeButton' onClick={(e) => disLike(e)} src='https://cdn.pixabay.com/photo/2013/07/13/10/27/dislike-157252_1280.png'></img>
                            : <img className='likeButton' onClick={(e) => addLike(e)} src='https://jeannecolemanlaw.com/wp-content/uploads/2015/07/hand-like-thumb-up-confirm-okay-go-green.png'></img>
                        }
                    </div>
                </div>
            </div>
            <div className='playlistSongs'>
                {playlistSongs.map((song) => {
                    return <SongInPlaylist
                        name={song.name}
                        artist={song.artist}
                        album={song.album}
                        length={song.length}
                        link={song.link}
                        cover_img={song.cover_img}
                        index={song.index}
                        id={song.id}
                    />
                })}
            </div>
        </>
    );

}

export default PlaylistPage;