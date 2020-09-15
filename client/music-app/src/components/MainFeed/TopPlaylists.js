import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './TopPlaylists.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function PlaylistDisplay(props) {

    function goToLink() {
        //go to props.link
    }

    return (
        <>
            <div className='playlist' onClick={goToLink}>
                <img className='playlistImage' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='playlistDetails'>
                    <div className='playlistName'>{props.name}</div>
                    <div className='PlaylistGenre'>{props.genre}</div>
                    <div className='playlistLikes'>{props.likes} Likes</div>
                </div>
            </div>
        </>
    );
}

function TopPlaylists(props) {

    const [Playlists, setPlaylists] = useState([])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/top/playlists`);
            console.log(data)
            setPlaylists(data);
        }
        fetch()
    }, [])

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
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
                            cover_img={playlist.cover_img}
                            likes={playlist.likes} />
                    })
                    }
                </Slider>
            </div>
        </>
    );

}

export default TopPlaylists;