import React, { useEffect, useState, useRef } from 'react';
import { useBottomPlayer, useUpdateBottomPlayer } from '../UserContext'
import { useUserDetails } from '../UserContext';
import { useHistory, useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'
import axios from 'axios';


function BottomPlayer() {

    const [EntryTime, setEntryTime] = useState()
    const [YoutubeComponent, setYoutubeComponent] = useState({
        playing: true,
        muted: false,
        progress: {
            played: 0
        },
        seeking: false
    })

    const player = useRef(null)

    const [bottomPlayer, fullScreen] = useBottomPlayer()
    const [updateBottomPlayer, updateFullScreen] = useUpdateBottomPlayer()
    const userDetails = useUserDetails()

    const history = useHistory()

    const lengthToMilSec = React.useCallback(() => {

        const length = bottomPlayer.CurrentSong.length.split(':');
        let timeSec = 0
        timeSec += parseInt(length[2]) * 1
        timeSec += parseInt(length[1]) * 60
        timeSec += parseInt(length[0]) * 360

        return timeSec * 1000;
    }, [bottomPlayer.CurrentSong])

    const submitInteraction = React.useCallback(async () => {
        try {
            const leavingTime = Date.now()
            const songInMilSec = lengthToMilSec()
            if (songInMilSec - (leavingTime - EntryTime) < ((songInMilSec / 100) * 20)) {
                const success = await axios.post('/user/interaction', {
                    songId: bottomPlayer.CurrentSong.id,
                    userId: userDetails.id,
                })
                if(!success){
                    console.log('error')
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [bottomPlayer.CurrentSong])

    useEffect(() => {
        if (bottomPlayer.CurrentSong && userDetails.id) {
            submitInteraction()
        }
    }, [bottomPlayer.CurrentSong])

    useEffect(() => {
        setEntryTime(Date.now())
    }, [bottomPlayer.CurrentSong])

    const updateCurrentSong = React.useCallback((index) => {
        const prevSong = bottomPlayer.Queue[index];
        updateBottomPlayer({
            ...bottomPlayer,
            CurrentSong: prevSong,
        })
    }, [bottomPlayer])

    const nextSong = React.useCallback(() => {
        let nextIndex = bottomPlayer.Queue.findIndex((song, index) =>{
            return song.id === bottomPlayer.CurrentSong.id && index < bottomPlayer.Queue.length - 1;
        }) + 1
        updateCurrentSong(nextIndex ? nextIndex : 0)
    }, [bottomPlayer.Queue, bottomPlayer.CurrentSong])

    const prevSong = React.useCallback(() => {
        if(YoutubeComponent.progress.playedSeconds < 3){
            let prevIndex = bottomPlayer.Queue.findIndex((song, index) => song.id === bottomPlayer.CurrentSong.id && index > -1) - 1;
            updateCurrentSong(prevIndex >= 0 ? prevIndex : 0)
        } else {
            player.current.seekTo(0)
        }
    }, [YoutubeComponent.progress])

    const minScreen = React.useCallback(() => {
        history.push({
            pathname: '/',
        })
        updateFullScreen(false)
    }, [])

    const expScreen = React.useCallback(() => {

        console.log(bottomPlayer.LocationQuery)
        history.push({
            pathname: bottomPlayer.LocationQuery.pathname,
            search: bottomPlayer.LocationQuery.search
        })
        updateFullScreen(true)
    }, [bottomPlayer.LocationQuery])

    const closePlayer = React.useCallback(() => {

        if(history.location.pathname.slice(1,5) === 'song'){
            history.push('/')
        }
        updateBottomPlayer({
            Display: false,
            LocationQuery: {},
            CurrentSong: {},
            Queue: [],
            fullScreen: true
        })
    }, [])

    const handleSeekMouseDown = React.useCallback( e => {
        setYoutubeComponent({ 
            ...YoutubeComponent,
            seeking: true 
        })
      }, [YoutubeComponent])

    const handleSeekChange = React.useCallback( e => {
        setYoutubeComponent({ 
            ...YoutubeComponent,
            progress: {
                played: e.target.value
            }
        })
      }, [YoutubeComponent])
      
    const handleSeekMouseUp = React.useCallback( e => {
        setYoutubeComponent({ 
            ...YoutubeComponent,
            seeking: true 
        })
        player.current.seekTo(parseFloat(e.target.value))
      }, [YoutubeComponent])

    return (
        <>
            {(bottomPlayer.Display && bottomPlayer.CurrentSong) &&
                <div className='Player'>
                    <div className={fullScreen ? 'fullScreenVideo' : 'smallScreenVideo'}>
                        <ReactPlayer 
                            ref={player}
                            className={fullScreen ? 'bigYoutubeVideo' : 'smallYoutubeVideo'}
                            url={bottomPlayer.CurrentSong.youtubeLink}
                            width= {fullScreen ? '660px' : '256px'}
                            height= {fullScreen ? '350px' : '156px'}
                            controls={true}
                            seeking={YoutubeComponent.seeking}
                            onEnded={nextSong}
                            muted={YoutubeComponent.muted}
                            playing={YoutubeComponent.playing}
                            onPause={() => setYoutubeComponent({...YoutubeComponent, playing: false})}
                            onPlay={() => setYoutubeComponent({...YoutubeComponent, playing: true})}
                            onProgress={(progress) => setYoutubeComponent({
                                ...YoutubeComponent,
                                progress
                            })}
                            progressInterval={500}
                        />
                    </div>
                    
                    <div className='bottomPlayerBar'>
                        <input
                            id='bottomPlayerRangeControl'
                            type='range' min={0} max={0.999999} step='any'
                            value={YoutubeComponent.progress.played}
                            onMouseDown={(e) => handleSeekMouseDown(e)}
                            onChange={(e) => handleSeekChange(e)}
                            onMouseUp={(e) => handleSeekMouseUp(e)}
                        />
                        <div className='playerControlButtons' >
                            <span className='bottomBarButton'onClick={prevSong}>
                                <img className='playerControllButton' src='https://www.flaticon.com/premium-icon/icons/svg/2584/2584155.svg'></img>
                            </span>
                            <span className='bottomBarButton' onClick={() => setYoutubeComponent({...YoutubeComponent, playing: !YoutubeComponent.playing})}>
                                <img className='playerControllButton' 
                                src={!YoutubeComponent.playing ? 
                                'https://www.flaticon.com/premium-icon/icons/svg/2584/2584158.svg' 
                                : 'https://www.flaticon.com/premium-icon/icons/svg/2584/2584165.svg'}>
                                </img>
                            </span>
                            <span className='bottomBarButton' onClick={nextSong}>
                                <img className='playerControllButton' src='https://www.flaticon.com/premium-icon/icons/svg/2584/2584162.svg'></img>
                            </span>
                            {/* <span className='bottomBarButton' id='shuflleButton'>
                                <img className='playerControllButton' src='https://www.flaticon.com/premium-icon/icons/svg/2584/2584152.svg'></img>
                            </span> */}
                            {/* <span className='bottomBarButton'>
                                <img className='playerControllButton' src='https://www.flaticon.com/premium-icon/icons/svg/2584/2584206.svg'></img>
                            </span> */}
                        </div>
                        <div className='playerSongDetails'>
                            <img className='playerCoverImg' src={bottomPlayer.CurrentSong.coverImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                            <div>
                                <div className='playerSongName'>{bottomPlayer.CurrentSong.title}</div>
                                <div className='playerSongArtist'>
                                    {bottomPlayer.CurrentSong.Artist.name} / {bottomPlayer.CurrentSong.Album.name}
                                </div>
                            </div>
                        </div>
                        <div className='playerOptionsButtons'>
                            <button className='bottomBarButton' id='terminateSongButton' onClick={closePlayer}>x</button>
                            <button className='bottomBarButton' id='expandSongButton'
                                onClick={fullScreen ? minScreen : expScreen}
                            >
                                <span>{fullScreen ? '▼' : '▲'}</span>
                                </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default BottomPlayer