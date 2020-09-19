import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Video.css';
import axios from 'axios';
import YouTube from 'react-youtube';
import LikeButton from './LikesButton/LikesButton'

function SongInQueue(props) {

    return (
        <>

            <div className='songInPlaylist' >
                <img className='displayedSongImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='displayedSongDetails'>
                    <Link to={`/song/${props.id}?${props.qParams}`}>
                        <div className='displayedSongName'>{props.name}</div>
                    </Link>
                    <div>
                        <span className='displayedSongArtist'>{props.artist}</span>
                        {(props.artist && props.album) && <span> / </span>}
                        <span className='displayedSongAlbum'>{props.album}</span>
                    </div>
                </div>
                <span className='displayedSongLength'>{parseInt(props.length.slice(0, 2)) > 0 ? props.length : props.length.slice(3)}</span>
                {/* <LikeButton
                    id={props.id}
                    table={'songs'}
                /> */}
            </div>

        </>
    );
}




function Video() {

    const [CurrentSong, setCurrentSong] = useState();
    const [Queue, setQueue] = useState([]);

    const location = useLocation();
    const params = useParams();
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
            const { data } = await axios.get(req);
            const song = await axios.get(`/songDetails/${params.id}`)
            console.log(data);
            setCurrentSong(song.data[0]);
            setQueue(data);

        }

        fetch();
    }, [params])

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
                        <YouTube className='player' videoId={getVideosId()} opts={opts} />
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
                            name={song.name}
                            artist={song.artist}
                            album={song.album}
                            length={song.length}
                            link={song.link}
                            cover_img={song.cover_img}
                            id={song.id}
                            qParams={qParams}
                        />
                    })}
                </div>
            </div>
        </>
    );

}

export default Video;