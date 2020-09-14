import React from 'react';

function songInPlaylist(props){
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

function Playlist(props){
    return(
        <>
        </>
    );
}