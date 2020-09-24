import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TopPlaylists.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function PlaylistDisplay(props) {

    return (
        <>
            <Link to={`playlist/${props.id}`}>
                <div className='playlist'>
                    <img className='topPlaylistImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                    <div className='topPlaylistDetails'>
                        <div className='topPlaylistName'>{props.name}</div>
                        <div className='topPlaylistGenre'>{props.genre}</div>
                        <div className='topPlaylistLikes'>{props.likes} Likes</div>
                    </div>
                </div>
            </Link>
        </>
    );
}

function TopPlaylists(props) {

    const [Playlists, setPlaylists] = useState([])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/playlist/top`);
            setPlaylists(data);
        }
        fetch()
    }, [])

    const settings = {
        className: "center",
        centerMode: true,
        infinite: Playlists.length > 3,
        centerPadding: "60px",
        slidesToShow: 4,
        speed: 500
    };


    return (
        <>
            <div id='topPlaylists'>
                <h3 className='topPlaylistsHead'>Top Playlists</h3>
                <Slider {...settings}>
                    {Playlists.map(playlist => {
                        return <PlaylistDisplay
                            name={playlist.name}
                            genre={playlist.genre}
                            cover_img={playlist.coverImg}
                            likes={playlist.likes}
                            id={playlist.id}
                        />
                    })
                    }
                </Slider>
            </div>
        </>
    );

}

export default TopPlaylists;