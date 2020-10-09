import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Video.css';
import axios from 'axios';
import LikeButton from './LikesButton/LikesButton';
import { useBottomPlayer, useUpdateBottomPlayer } from '../UserContext'


function SongInQueue({ song, qParams, CurrentSongId }) {

  return (
    <>

      <div className='songInPlaylist'>
        <img className='displayedSongImage' src={song.coverImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
        <div className='displayedSongDetails'>
          <Link to={`/song/${song.id}?${qParams}`}>
            <div className='displayedSongName' style={{ color: CurrentSongId === song.id && 'green' }}>{song.title}</div>
          </Link>
          <div>
            <span className='displayedSongArtist'>{song.Artist.name}</span>
            {(song.Artist.name && song.Album.name) && <span> / </span>}
            <span className='displayedSongAlbum'>{song.Album.name}</span>
          </div>
        </div>
        <span className='displayedSongLength'>{parseInt(song.length.slice(0, 2)) > 0 ? song.length : song.length.slice(3)}</span>
      </div>
    </>
  );
}


function Video() {

  const [bottomPlayer, fullScreen] = useBottomPlayer()
  const [updateBottomPlayer, updateFullScreen] = useUpdateBottomPlayer()


  const location = useLocation();
  const params = useParams();
  const qParams = new URLSearchParams(location.search);

  
  useEffect(() => {
    updateFullScreen(true)
    async function fetch() {
      let model = `${qParams.toString().slice(0, qParams.toString().indexOf('='))}`
      let req = '';

      if (qParams.get(model) === 'topSongs') {
        req = '/song/top';
      } else {
        req = `/${model}/songs/${qParams.get(model)}`
      }
      let { data: queue } = await axios.get(req);
      const { data: song } = await axios.get(`/song/${params.id}`);
      updateBottomPlayer({
        Display: true,
        LocationQuery: location,
        CurrentSong: song,
        Queue: queue
      })
    }
    fetch();

    return () => {
      updateFullScreen(false)
    }
  }, [location])

  // useEffect(() => {
  //   return () => {
  //     // console.log(history)
  //     if(history.location.pathname.slice(1,5) !== 'song'){
  //       const updatedPlayer = getPlayerDetails()
  //     updateBottomPlayer({
  //       ...updatedPlayer,
  //       FullScreen: false
  //     })
  //   }
  // }
  // }, [location])

  const updateLikes = React.useCallback((liked) => {
    if (liked) {
      updateBottomPlayer({
        ...bottomPlayer,
        CurrentSong: {
          ...bottomPlayer.CurrentSong,
          likes: bottomPlayer.CurrentSong.likes + 1
        }
      })
    } else {
      updateBottomPlayer({
        ...bottomPlayer,
        CurrentSong: {
          ...bottomPlayer.CurrentSong,
          likes: bottomPlayer.CurrentSong.likes - 1
        }
      })
    }
  }, [bottomPlayer.CurrentSong]);

  // const getVideosId = React.useCallback(() => {
  //   const link = CurrentSong.youtubeLink
  //   let id = link.slice(link.indexOf('/watch?v=') + 9);
  //   if (id.indexOf('&') !== -1) {
  //     id = id.slice(0, id.indexOf('&'));
  //   }
  //   return id;
  // }, [CurrentSong]);

  // function nextSong() {
  //   let nextIndex = 0;
  //   Queue.forEach((song, index) => {
  //     if (song.id === CurrentSong.id && index < Queue.length - 1) {
  //       nextIndex = index + 1;
  //     }
  //   })
  //   if (nextIndex) {
  //     const nextSong = Queue[nextIndex];
  //     history.push(`/song/${nextSong.id}?${qParams}`)
  //   } else {
  //     return
  //   }
  // }

  // const opts = {
  //   height: '390',
  //   width: '640',
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // };


  return (
    <>
      <div className={'VideoPage'}>
        {Object.keys(bottomPlayer.CurrentSong).length > 0 &&
          <div className='Video'>
            <div className='videosPlaceHolder'></div>
            {/* <YouTube className='player' videoId={getVideosId()} opts={opts} onEnd={nextSong} /> */}
            {/* <iframe src={CurrentSong.youtubeLink}></iframe> */}
            <div className='playnigSongDetails'>
              <div>
                <span className='songName'>{bottomPlayer.CurrentSong.title}</span>
                <span className='playedSongLength'>{bottomPlayer.CurrentSong.length}</span>
              </div>
              <div>
                <span className='songArtist'>Artist: {bottomPlayer.CurrentSong.Artist.name}</span>
                <span className='songAlbum'>Album: {bottomPlayer.CurrentSong.Album.name}</span>
              </div>

              <div className='likesDiv'>
                {/* <AddToPlaylistButton
                  id={CurrentSong.id}
                /> */}
                <LikeButton
                  id={bottomPlayer.CurrentSong.id}
                  model={'song'}
                  updateLikes={updateLikes}
                />
                <span className='songLikes'>{bottomPlayer.CurrentSong.likes} Likes</span>
              </div>
            </div>
          </div>
        }
        <div className='queue'>
          {bottomPlayer.Queue.length > 0 &&
            bottomPlayer.Queue.map((song) => {
              return <SongInQueue
                song={song}
                qParams={qParams}
                CurrentSongId={bottomPlayer.CurrentSong.id}
              />
            })}
        </div>
      </div>

    </>
  );

}

export default Video;