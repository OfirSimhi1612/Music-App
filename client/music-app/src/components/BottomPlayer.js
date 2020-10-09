import React, { useState } from 'react';
import axios from 'axios';
import Youtube from 'react-youtube';
import { useBottomPlayer, useUpdateBottomPlayer } from '../UserContext'
import { useUserDetails } from '../UserContext';


function BottomPlayer() {

    const [EntryTime, setEntryTime] = useState()

    const [bottomPlayer, fullScreen] = useBottomPlayer()
    const [updateBottomPlayer, updateFullScreen] = useUpdateBottomPlayer()
    const userDetails = useUserDetails()


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

    function nextSong() {
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
    }

    const getVideosId = React.useCallback(() => {
        const link = bottomPlayer.CurrentSong.youtubeLink
        let id = link.slice(link.indexOf('/watch?v=') + 9);
        if (id.indexOf('&') !== -1) {
            id = id.slice(0, id.indexOf('&'));
        }
        return id;
    }, [bottomPlayer]);

    const opts = {
        playerVars: {
            autoplay: 1,
        }
    };

    return (
        <>
            {(bottomPlayer.Display && bottomPlayer.CurrentSong) &&
                <div className='Player'>
                    <div className={fullScreen ? 'fullScreenVideo' : 'smallScreenVideo'}>
                        <Youtube 
                            className={fullScreen ? 'bigYoutubeVideo' : 'smallYoutubeVideo'}
                            videoId={getVideosId()}
                            opts={opts}
                            onEnd={nextSong}
                        />
                    </div>
                    <div className='bottomPlayerBar'>
                        <div className='playerSongDetails'>

                        </div>
                        <div className='playerControlButtons'>

                        </div>
                        <div className='playerOptionsButtons'>

                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default BottomPlayer