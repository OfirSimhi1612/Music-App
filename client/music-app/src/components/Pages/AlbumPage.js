import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AlbumPage.css';
import Song from './Song';
import playlistTime from './playlistTime';
import LikeButton from '../LikesButton/LikesButton'


function AlbumPage(props) {

    const [displayedAlbum, setDisplayedAlbum] = useState({});
    const [AlbumSongs, setAlbumSongs] = useState([]);

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/album/${props.match.params.id}`);
            console.log(data)
            setDisplayedAlbum(data);
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/album/songs/${props.match.params.id}`);
            console.log(data)
            setAlbumSongs(data);
        }
        fetch()
    }, [])

    function updateLikes(liked) {
        if (liked) {
            setDisplayedAlbum({
                ...displayedAlbum,
                likes: displayedAlbum.likes + 1
            })
        } else {
            setDisplayedAlbum({
                ...displayedAlbum,
                likes: displayedAlbum.likes - 1
            })
        }
    }


    return (
        <>

            <div>{props.match.params.id}</div>
            <div id='albumHead'>
                <img className='albumPageImg' src={displayedAlbum.coverImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='albumDetails'>
                    <h2 className='albumName'>{displayedAlbum.name}
                        <span className='albumArtist'>{AlbumSongs.length > 0 && AlbumSongs[0].artist}</span>
                    </h2>
                    <span className='albumLength'>{AlbumSongs.length} Songs</span>
                    <span className='albumTime'>{playlistTime(AlbumSongs)}</span>
                    <div className='bottomDetails'>
                        <span className='albumLikes'>{displayedAlbum.likes} Likes</span>
                        <LikeButton
                            id={displayedAlbum.id}
                            model={'album'}
                            updateLikes={updateLikes}
                        />
                    </div>
                </div>
            </div>
            <div className='albumSongs'>
                {AlbumSongs.map((song, index) => {
                    return <Song
                        name={song.title}
                        length={song.length}
                        cover_img={song.coverImg}
                        id={song.id}
                        orgin={`album=${displayedAlbum.id}`}
                    />
                })}
            </div>
        </>
    );

}

export default AlbumPage;