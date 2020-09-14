import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './TopSongs.css'
import Video from '../Video';

function SongDisplay(props){

    const [liked, setLiked] = useState(false)

    const goToLink = React.useCallback(() => {
        props.playVideo(props.link);
    },[props.link]);

    const addLike = React.useCallback(async () => {
        try{
            setLiked(true);
            axios.put(`/like/songs/${props.id}`);
        } catch(error){
            console.log(error.message);
        }
    }, [props.id]);

    const disLike = React.useCallback(async () => {
        try{
            setLiked(false);
            axios.put(`/dislike/songs/${props.id}`);
        } catch(error){
            console.log(error.message);
        }
    }, [prop.id]);


    return (
        <>
            <div class='song' onClick={goToLink}>
                <img className='SongImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='songDetails'>
                    <div className='SongName'>{props.name}</div>
                    <div className='SongArtist'>{props.artist} / {props.album}</div>
                </div>
                <span className='SongLength'>{parseInt(props.length.slice(0,2))>0 ? props.length : props.length.slice(3)}</span>
                {liked ? 
                        <img className='likeButton' onClick={disLike} src='https://cdn.pixabay.com/photo/2013/07/13/10/27/dislike-157252_1280.png'></img>
                        : <img className='likeButton' onClick={addLike} src='https://jeannecolemanlaw.com/wp-content/uploads/2015/07/hand-like-thumb-up-confirm-okay-go-green.png'></img>
                }
            </div>
        </>
    );
}

function SongsList(){

    const [SongsList, setSongsList] = useState([])
    const [VideoSrc, setVideoSrc] = useState(null);

    const playVideo = React.useCallback((src) =>  {
        setVideoSrc(src);
    }, []);

    const closeVideo = React.useCallback(() => {
        setVideoSrc(null);
    }, [])

    useEffect(() => {
        async function fetch(){
            const { data } = await axios.get(`/topSongsList`);
            console.log(data)
            setSongsList(data);
        }
        fetch()
    }, [])

    return (
        <>
            <div id='topSongsList'>
                {
                    VideoSrc && <Video src={VideoSrc} closeVideo={closeVideo}/>
                }
                <h3 class='topSongsHead'>Top Songs</h3>
                {SongsList.map(song => {
                    return <SongDisplay
                            name={song.song_name}
                            artist={song.artist}
                            album={song.album}
                            length={song.length}
                            link={song.link} 
                            cover_img={song.cover_img}
                            id={song.id}
                            playVideo={playVideo}
                            />
                    })
                }
            </div>
        </>
    );

}

export default SongsList;