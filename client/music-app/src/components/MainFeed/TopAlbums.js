import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './TopAlbums.css'

function AlbumDisplay(props){

    function goToLink(){
        //go to props.link
    }

    return (
        <>
            <div className='album' onClick={goToLink}>
                <img className='albumImage' src={ 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='albumDetails'>
                    <div className='albumtName'>{props.name}</div>
                    <div className='albumArtist'>{props.artist}</div>
                    <div className='albumLikes'>{props.likes} Likes</div>
                </div>
            </div>
        </>
    );
}

function TopAlbums(props){

    const [Albums, setAlbums] = useState([])

    useEffect(() => {
        async function fetch(){
            const { data } = await axios.get(`/topAlbumsList`);
            console.log(data)
            setAlbums(data);
        }
        fetch()
    }, [])

    return (
        <>
            <div id='topAlbums'>
                <h3 className='topAlbumsHead'>Top Albums</h3>
                <div className='albums'>
                {Albums.map(album => {
                    return <AlbumDisplay
                            name={album.name}
                            cover_img={album.cover_img}
                            artist={album.artist} 
                            likes={album.likes}/>
                    })
                }
                </div>
            </div>
        </>
    );

}

export default TopAlbums;