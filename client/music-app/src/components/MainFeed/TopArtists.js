import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './TopArtists.css'

function ArtistDisplay(props){

    function goToLink(){
        //go to props.link
    }

    return (
        <>
            <div className='artist' onClick={goToLink}>
                <img className='artistImage' src={ 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                
                    <div className='artistName'>{props.name}</div>
                    <div className='artistLikes'>{props.likes} Likes</div>
                
            </div>
        </>
    );
}

function TopArtists(props){

    const [Artists, setArtists] = useState([])

    useEffect(() => {
        async function fetch(){
            const { data } = await axios.get(`/top/artists`);
            console.log(data)
            setArtists(data);
        }
        fetch()
    }, [])

    return (
        <>
            <div id='topArtists'>
                <h3 className='topArtistsHead'>Top Artists</h3>
                <div className='artists'>
                {Artists.map(artist => {
                    return <ArtistDisplay
                            name={artist.name}
                            cover_img={artist.cover_img}
                            likes={artist.likes} 
                            likes={artist.likes}/>
                    })
                }
                </div>
            </div>
        </>
    );

}

export default TopArtists;