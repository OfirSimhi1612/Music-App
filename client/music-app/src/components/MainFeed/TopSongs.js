import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TopSongs.css'
import Video from '../Video';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SongDisplay(props) {

    const [liked, setLiked] = useState(false);

    // const addLike = React.useCallback(async (e) => {
    //     e.stopPropagation();
    //     try {
    //         setLiked(true);
    //         axios.put(`/like/songs/${props.id}`);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }, [props.id]);

    // const disLike = React.useCallback(async (e) => {
    //     e.stopPropagation();
    //     try {
    //         setLiked(false);
    //         axios.put(`/dislike/songs/${props.id}`);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }, [props.id]);


    return (
        <>
            <Link to={`/song/${props.id}?playlist=topSongs`}>
                <div class='song'>
                    <img className='TopSongImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                    <div className='songDetails'>
                        <div className='SongName'>{props.name}</div>
                        <div className='SongArtist'>{props.artist} / {props.album}</div>
                    </div>
                    <span className='SongLength'>{parseInt(props.length.slice(0, 2)) > 0 ? props.length : props.length.slice(3)}</span>
                </div>
            </Link>
        </>
    );
}

function SongsList() {

    const [SongsList, setSongsList] = useState([])
    const [VideoSrc, setVideoSrc] = useState(null);

    const playVideo = React.useCallback((src) => {
        setVideoSrc(src);
    }, []);

    const closeVideo = React.useCallback(() => {
        setVideoSrc(null);
    }, [])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/topSongsList`);
            console.log(data)
            setSongsList(data);
        }
        fetch()
    }, [])

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        speed: 500
    };

    return (
        <>
            <div id='topSongsList'>
                {
                    VideoSrc && <Video src={VideoSrc} closeVideo={closeVideo} />
                }
                <h3 class='topSongsHead'>Top Songs</h3>
                <Slider {...settings}>
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
                </Slider>
            </div>
        </>
    );

}

export default SongsList;