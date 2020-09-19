import React from 'react';
import './AlbumPage.css';
import LikeButton from '../LikesButton/LikesButton'
import './Song.css';
import { Link } from 'react-router-dom';


function Song(props) {

    return (
        <>
            <div className='songRow'>
                <img className='songImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='songDetails'>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={`/song/${props.id}?${props.orgin}`}><div className='SongName'>{props.name}</div></Link>
                    <div className='SongArtist'>
                        {props.artist && <span>{props.artist}</span>}
                        {(props.artist && props.artist) && <span> / </span>}
                        {props.album && <span>{props.album}</span>}
                    </div>
                </div>
                {props.length && <span className='songLength'>{parseInt(props.length.slice(0, 2)) > 0 ? props.length : props.length.slice(3)}</span>}
                {/* <LikeButton
                    id={props.id}
                    table={'songs'}
                /> */}
            </div>
        </>
    );
}

export default Song