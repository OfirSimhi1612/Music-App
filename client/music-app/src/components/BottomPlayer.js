import React, { useEffect, useState, useRef } from 'react';
import { useBottomPlayer, useUpdateBottomPlayer } from '../UserContext'
import { useUserDetails } from '../UserContext';
import { useHistory, useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'


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

    // const lengthToMilSec = React.useCallback(() => {

    //     const length = bottomPlayer.CurrentSong.length.split(':');
    //     let timeMilSec = 0

    //     console.log(length)

    //     length.map(x => console.log(parseInt(x)))

    //     timeMilSec += parseInt(length[2]) * 1
    //     timeMilSec += parseInt(length[1]) * 60
    //     timeMilSec += parseInt(length[0]) * 360

    //     return timeMilSec * 1000;
    // }, [bottomPlayer.CurrentSong])

    // const submitInteraction = React.useCallback(async () => {
    //     try {
    //         const leavingTime = Date.now()
    //         const songInMilSec = lengthToMilSec()
    //         if (songInMilSec - (leavingTime - EntryTime) < ((songInMilSec / 100) * 20)) {
    //             await axios.post('/user/interaction', {
    //                 songId: bottomPlayer.CurrentSong.id,
    //                 userId: bottomPlayer.CurrentSong.id,
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [bottomPlayer.CurrentSong])

    // useEffect(() => {
    //     if (bottomPlayer.CurrentSong && userDetails.id) {
    //         submitInteraction()
    //     }
    // }, [params])

    // useEffect(() => {
    //     setEntryTime(Date.now())
    //     async function fetch() {
    //         const { data } = await axios.get(`/song/${params.id}`);
    //         // setCurrentSong(data);
    //         console.log(data)

    //     }
    //     fetch();
    // }, [bottomPlayer.CurrentSong])

    // const updateLikes = React.useCallback((liked) => {
    //     if (liked) {
    //       updateBottomPlayer({
    //         ...bottomPlayer,
    //         CurrentSong: {
    //           ...bottomPlayer.CurrentSong,
    //           likes: bottomPlayer.CurrentSong.likes + 1
    //         }
    //       })
    //     } else {
    //       updateBottomPlayer({
    //         ...bottomPlayer,
    //         CurrentSong: {
    //           ...bottomPlayer.CurrentSong,
    //           likes: bottomPlayer.CurrentSong.likes - 1
    //         }
    //       })
    //     }
    //   }, [bottomPlayer.CurrentSong]);

    const nextSong = React.useCallback(() => {
        let nextIndex = 0;
        bottomPlayer.Queue.forEach((song, index) => {
            if (song.id === bottomPlayer.CurrentSong.id && index < bottomPlayer.Queue.length - 1) {
                nextIndex = index + 1;
            }
        })
        if (nextIndex) {
            const nextSong = bottomPlayer.Queue[nextIndex];
            updateBottomPlayer({
                ...bottomPlayer,
                CurrentSong: nextSong,
            })
        } else {
            return
        }
    }, [bottomPlayer.Queue, bottomPlayer.CurrentSong])

    const prevSong = React.useCallback(() => {
        if(YoutubeComponent.progress.playedSeconds < 3){
            let prevIndex = 0;
            bottomPlayer.Queue.forEach((song, index) => {
                if (song.id === bottomPlayer.CurrentSong.id && index > -1) {
                    prevIndex = index - 1;
                }
            })
            if (prevIndex >= 0) {
                const prevSong = bottomPlayer.Queue[prevIndex];
                updateBottomPlayer({
                    ...bottomPlayer,
                    CurrentSong: prevSong,
                })
            } else {
                return
            }
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

        history.push('/')
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
                        <div className='playerSongDetails'>
                            <div>name</div>
                            <div>details</div>
                        </div>
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
                            <span className='bottomBarButton' id='shuflleButton'>
                                <img className='playerControllButton' src='https://www.flaticon.com/premium-icon/icons/svg/2584/2584152.svg'></img>
                            </span>
                            <span className='bottomBarButton'>
                                <img className='playerControllButton' src='https://www.flaticon.com/premium-icon/icons/svg/2584/2584206.svg'></img>
                            </span>
                        </div>
                        <input
                            type='range' min={0} max={0.999999} step='any'
                            value={YoutubeComponent.progress.played}
                            onMouseDown={(e) => handleSeekMouseDown(e)}
                            onChange={(e) => handleSeekChange(e)}
                            onMouseUp={(e) => handleSeekMouseUp(e)}
                        />
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