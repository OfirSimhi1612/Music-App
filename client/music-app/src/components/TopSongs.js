import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './TopSongs.css'

function SongDisplay(props){

    const [liked, setLiked] = useState(false)

    function goToLink(){
        //go to props.link
    }

    async function addLike(){
        try{
            setLiked(true);
            axios.put(`/like/${props.id}`);
        } catch(error){
            console.log(error.message);
        }
    }

    async function disLike(){
        try{
            setLiked(false);
            axios.put(`/dislike/${props.id}`);
        } catch(error){
            console.log(error.message);
        }
    }


    return (
        <>
            <div class='song' onClick={goToLink}>
                <img className='SongImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='songDetails'>
                    <div className='SongName'>{props.name}</div>
                    <div className='SongArtist'>{props.artist} / {props.album}</div>
                </div>
                <span className='SongLength'>{Math.floor(props.length/60)}:{props.length%60}</span>
                {liked ? 
                        <img className='likeButton' onClick={disLike} src='https://cdn.pixabay.com/photo/2013/07/13/10/27/dislike-157252_1280.png'></img>
                        : <img className='likeButton' onClick={addLike} src='https://jeannecolemanlaw.com/wp-content/uploads/2015/07/hand-like-thumb-up-confirm-okay-go-green.png'></img>
                }
            </div>
        </>
    );
}

function SongsList(props){

    const [SongsList, setSongsList] = useState([])

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
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/89_KXT5ztTU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <h3 class='topSongsHead'>Top Songs</h3>
                {SongsList.map(song => {
                    return <SongDisplay
                            name={song.song_name}
                            artist={song.artist}
                            album={song.album}
                            length={song.length}
                            link={song.link} 
                            cover_img={song.cover_img}
                            id={song.id}/>
                    })
                }
            </div>
        </>
    );

}

export default SongsList;