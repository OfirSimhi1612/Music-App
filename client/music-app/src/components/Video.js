import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Video.css';
import axios from 'axios';
import YouTube from 'react-youtube';
import LikeButton from './LikesButton/LikesButton'

function SongInQueue({ song, qParams }) {

    return (
        <>

            <div className='songInPlaylist' >
                <img className='displayedSongImage' src={song.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='displayedSongDetails'>
                    <Link to={`/song/${song.id}?${qParams}`}>
                        <div className='displayedSongName'>{song.name}</div>
                    </Link>
                    <div>
                        <span className='displayedSongArtist'>{song.artist}</span>
                        {(song.artist && song.album) && <span> / </span>}
                        <span className='displayedSongAlbum'>{song.album}</span>
                    </div>
                </div>
                <span className='displayedSongLength'>{parseInt(song.length.slice(0, 2)) > 0 ? song.length : song.length.slice(3)}</span>
            </div>

        </>
    );
}




function Video() {

    const [CurrentSong, setCurrentSong] = useState();
    const [Queue, setQueue] = useState([]);

    const location = useLocation();
    const params = useParams();
    const history = useHistory()
    const qParams = new URLSearchParams(location.search);
    let req = '';
    if (qParams.has('playlist')) {
        if (qParams.get('playlist') === 'topSongs') {
            req = '/topSongsList'
        } else {
            req = `/songsInPlaylist/${qParams.get('playlist')}`
        }
    } else if (qParams.has('artist')) {
        req = `/songsInArtist/${qParams.get('artist')}`
    } else if (qParams.has('album')) {
        req = `/songsInAlbum/${qParams.get('album')}`
    }

    useEffect(() => {
        async function fetch() {
            const song = await axios.get(`/songDetails/${params.id}`)
            setCurrentSong(song.data[0]);
        }

        fetch();
    }, [params])

    useEffect(() => {
        async function fetch() {
            let { data } = await axios.get(req);
            const index = data.findIndex((song) => song.id === parseInt(params.id))
            const beforeCurrent = data.splice(0, index);
            data = [...data, ...beforeCurrent];
            console.log(data);
            setQueue(data);

        }

        fetch();
    }, [])

    function updateLikes(liked) {
        if (liked) {
            setCurrentSong({
                ...CurrentSong,
                likes: CurrentSong.likes + 1
            })
        } else {
            setCurrentSong({
                ...CurrentSong,
                likes: CurrentSong.likes - 1
            })
        }
    }

    function getVideosId() {
        const link = CurrentSong.link
        let id = link.slice(link.indexOf('/watch?v=') + 9);
        if (id.indexOf('&') !== -1) {
            id = id.slice(0, id.indexOf('&'));
        }
        return id;
    }

    function nextSong() {
        let nextIndex = 0;
        Queue.forEach((song, index) => {
            if (song.id === CurrentSong.id && index < Queue.length - 1) {
                nextIndex = index + 1;
            }

        })
        if (nextIndex) {
            const nextSong = Queue[nextIndex];
            history.push(`/song/${nextSong.id}?${qParams}`)
        } else {
            return
        }

    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <>
            <div className='VideoPage'>
                {CurrentSong &&
                    <div className='Video'>
                        <YouTube className='player' videoId={getVideosId()} opts={opts} onEnd={nextSong} />
                        <div className='playnigSongDetails'>
                            <div>
                                <span className='songName'>{CurrentSong.name}</span>
                                <span className='playedSongLength'>{CurrentSong.length}</span>
                            </div>
                            <div>
                                <span className='songArtist'>Artist: {CurrentSong.artist}</span>
                                <span className='songAlbum'>Album: {CurrentSong.album}</span>
                            </div>

                            <div className='likesDiv'>
                                <LikeButton
                                    id={CurrentSong.id}
                                    table={'songs'}
                                    updateLikes={updateLikes}
                                />
                                <span className='songLikes'>{CurrentSong.likes} Likes</span>
                            </div>
                        </div>
                    </div>
                }
                <div className='queue'>
                    {Queue.map((song) => {
                        return <SongInQueue
                            song={song}
                            qParams={qParams}
                        />
                    })}
                </div>
            </div>
        </>
    );

}

export default Video;