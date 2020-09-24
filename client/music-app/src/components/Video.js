import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Video.css';
import axios from 'axios';
import YouTube from 'react-youtube';
import LikeButton from './LikesButton/LikesButton';
import AddToPlaylistButton from './AddToPlaylistButton/AddToPlaylistButton';

function SongInQueue({ song, qParams }) {

  return (
    <>

      <div className='songInPlaylist' >
        <img className='displayedSongImage' src={song.coverImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
        <div className='displayedSongDetails'>
          <Link to={`/song/${song.id}?${qParams}`}>
            <div className='displayedSongName'>{song.title}</div>
          </Link>
          <div>
            {console.log(song.Artist)}
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

  const [CurrentSong, setCurrentSong] = useState();
  const [Queue, setQueue] = useState([]);


  const location = useLocation();
  const params = useParams();
  const history = useHistory()
  const qParams = new URLSearchParams(location.search);


  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(`/song/${params.id}`);
      setCurrentSong(data);
    }
    fetch();
  }, [params])

  useEffect(() => {
    async function fetch() {
      let model = `${qParams.toString().slice(0, qParams.toString().indexOf('='))}`
      let req = '';

      if (qParams.get(model) === 'topSongs') {
        req = '/song/top';
      } else {
        req = `/${model}/songs/${qParams.get(model)}`
      }
      let { data } = await axios.get(req);
      const index = data.findIndex((song) => song.id === parseInt(params.id))
      const beforeCurrent = data.splice(0, index);
      data = [...data, ...beforeCurrent];
      setQueue(data);
    }
    fetch();
  }, [])

  const updateLikes = React.useCallback((liked) => {
    if (liked) {
      setCurrentSong({
        ...CurrentSong,
        likes: CurrentSong.likes + 1
      })
    } else {
      setCurrentSong({
        ...CurrentSong,
        likes: CurrentSong.likes - 1
      })
    }
  }, [CurrentSong]);

  const getVideosId = React.useCallback(() => {
    const link = CurrentSong.youtubeLink
    let id = link.slice(link.indexOf('/watch?v=') + 9);
    if (id.indexOf('&') !== -1) {
      id = id.slice(0, id.indexOf('&'));
    }
    return id;
  }, [CurrentSong]);

  function nextSong() {
    let nextIndex = 0;
    Queue.forEach((song, index) => {
      if (song.id === CurrentSong.id && index < Queue.length - 1) {
        nextIndex = index + 1;
      }
    })
    if (nextIndex) {
      const nextSong = Queue[nextIndex];
      history.push(`/song/${nextSong.id}?${qParams}`)
    } else {
      return
    }
  }


  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };


  return (
    <>
      <div className='VideoPage'>
        {CurrentSong &&
          <div className='Video'>
            <YouTube className='player' videoId={getVideosId()} opts={opts} onEnd={nextSong} />
            <div className='playnigSongDetails'>
              <div>
                <span className='songName'>{CurrentSong.title}</span>
                <span className='playedSongLength'>{CurrentSong.length}</span>
              </div>
              <div>
                <span className='songArtist'>Artist: {CurrentSong.Artist.name}</span>
                <span className='songAlbum'>Album: {CurrentSong.Album.name}</span>
              </div>

              <div className='likesDiv'>
                <AddToPlaylistButton
                  id={CurrentSong.id}
                />
                <LikeButton
                  id={CurrentSong.id}
                  model={'song'}
                  updateLikes={updateLikes}
                />
                <span className='songLikes'>{CurrentSong.likes} Likes</span>
              </div>
            </div>
          </div>
        }
        <div className='queue'>
          {Queue.length > 0 &&
            Queue.map((song) => {
              return <SongInQueue
                song={song}
                qParams={qParams}
              />
            })}
        </div>
      </div>
    </>
  );

}

export default Video;