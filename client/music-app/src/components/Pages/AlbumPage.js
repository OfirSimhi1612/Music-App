import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AlbumPage.css';
import LikeButton from '../LikesButton/LikesButton'

function SongInAlbum(props) {

    const [liked, setLiked] = useState(false)

    const goToLink = React.useCallback(() => {
        props.playVideo(props.link);
    }, [props.link]);


    return (
        <>
            <div className='songInAlbum' onClick={goToLink}>
                <span className='songIndex'>{props.index + 1}</span>
                <img className='SongImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='songDetails'>
                    <div className='SongName'>{props.name}</div>
                </div>
                <span className='SongLength'>{parseInt(props.length.slice(0, 2)) > 0 ? props.length : props.length.slice(3)}</span>
                <LikeButton
                    id={props.id}
                    table={'songs'}
                />
            </div>
        </>
    );
}

function AlbumPage(props) {

    const [Liked, setLiked] = useState('false')
    const [displayedAlbum, setDisplayedAlbum] = useState({});
    const [AlbumSongs, setAlbumSongs] = useState([]);

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/Albums/${props.match.params.id}`);
            console.log(data)
            setDisplayedAlbum(data[0]);
            console.log(data);
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/songsInAlbum/${props.match.params.id}`);
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

    const AlbumTime = React.useCallback(() => {
        let length = [0, 0, 0];
        AlbumSongs.map((song) => {
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


    }, [AlbumSongs])


    return (
        <>

            <div>{props.match.params.id}</div>
            <div id='albumHead'>
                <img src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='albumDetails'>
                    <h2 className='albumName'>{displayedAlbum.name}
                        <span className='albumArtist'>{AlbumSongs.length > 0 && AlbumSongs[0].artist}</span>
                    </h2>
                    <span className='albumLength'>{AlbumSongs.length} Songs</span>
                    <span className='albumTime'>{AlbumTime()}</span>
                    <div className='bottomDetails'>
                        <span className='albumLikes'>{displayedAlbum.likes} Likes</span>
                        <LikeButton
                            id={displayedAlbum.album_id}
                            table={'albums'}
                            updateLikes={updateLikes}
                        />
                    </div>
                </div>
            </div>
            <div className='albumSongs'>
                {AlbumSongs.map((song, index) => {
                    return <SongInAlbum
                        name={song.name}
                        length={song.length}
                        link={song.link}
                        cover_img={song.cover_img}
                        index={index}
                        id={song.id}
                    />
                })}
            </div>
        </>
    );

}

export default AlbumPage;