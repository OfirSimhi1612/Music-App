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
                    <img className='artistImage' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                    <div className='artistDetails'>
                        <div className='artistName'>{props.name}</div>
                        <div className='artistLikes'>{props.likes} Likes</div>
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
            const { data } = await axios.get(`/top/artists`);
            console.log(data)
            setArtists(data);
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
            <div id='topArtists'>
                <h3 className='topArtistsHead'>Top Artists</h3>
                <Slider {...settings}>
                    {Artists.map(artist => {
                        return <ArtistDisplay
                            name={artist.name}
                            cover_img={artist.cover_img}
                            likes={artist.likes}
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