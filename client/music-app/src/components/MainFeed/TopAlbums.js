import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './TopAlbums.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AlbumDisplay(props) {


    return (
        <>
            <Link to={`/album/${props.id}`}>
                <div className='album'>
                    <img className='topAlbumImage' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                    <div className='topAlbumDetails'>
                        <div className='topAlbumtName'>{props.name}</div>
                        <div className='topAlbumArtist'>{props.artist}</div>
                        <div className='topAlbumLikes'>{props.likes} Likes</div>
                    </div>
                </div>
            </Link>
        </>
    );
}

function TopAlbums(props) {

    const [Albums, setAlbums] = useState([])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/topAlbumsList`);
            console.log(data)
            setAlbums(data);
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
            <div id='topAlbums'>
                <h3 className='topAlbumsHead'>Top Albums</h3>
                <Slider {...settings}>
                    {Albums.map(album => {
                        return <AlbumDisplay
                            name={album.name}
                            cover_img={album.cover_img}
                            artist={album.artist}
                            likes={album.likes}
                            id={album.id} />
                    })
                    }
                </Slider>
            </div>
        </>
    );

}

export default TopAlbums;