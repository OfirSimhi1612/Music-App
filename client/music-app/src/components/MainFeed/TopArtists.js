import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './TopArtists.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ArtistDisplay(props) {

    return (
        <>
            <Link to={`/artist/${props.id}`}>
                <div className='artist'>
                    <img className='topArtistImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                    <div className='topArtistDetails'>
                        <div className='topArtistName'>{props.name}</div>
                        <div className='topArtistLikes'>{props.likes} Likes</div>
                    </div>
                </div>
            </Link>
        </>
    );
}

function TopArtists(props) {

    const [Artists, setArtists] = useState([])

    useEffect(() => {
        async function fetch() {
            const { data } = await axios.get(`/artist/top`);
            console.log(data)
            setArtists(data);
        }
        fetch()
    }, [])

    const settings = {
        className: "center",
        centerMode: true,
        infinite: Artists.length > 3,
        centerPadding: "60px",
        slidesToShow: 4,
        speed: 500
    };

    return (
        <>
            <div id='topArtists'>
                <h3 className='topArtistsHead'>Top Artists</h3>
                <Slider {...settings}>
                    {Artists.map(artist => {
                        return <ArtistDisplay
                            name={artist.name}
                            cover_img={artist.coverImg}
                            likes={artist.likes}
                            id={artist.id}
                        />
                    })
                    }
                </Slider>
            </div>
        </>
    );

}

export default TopArtists;