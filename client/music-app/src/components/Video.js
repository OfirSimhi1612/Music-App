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
  const history = useHistory()
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


  return (
    <>
      <div className={'VideoPage'}>
        {Object.keys(bottomPlayer.CurrentSong).length > 0 &&
          <div className='Video'>
            <div className='videosPlaceHolder'></div>
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