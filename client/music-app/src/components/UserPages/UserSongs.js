import React, { useEffect, useState } from 'react'
import { useUserDetails } from '../../UserContext';
import Song from '../Pages/Song'
import './UserSongs.css'
import network from '../Network/network'
import { useLocation } from 'react-router-dom'

function UserSongs() {

    const [UserSongsPlaylist, setUserSongsPlaylist] = useState();

    const location = useLocation();
    const qParams = new URLSearchParams(location.search);

    const userDetails = useUserDetails();

    useEffect(() => {
        console.log(qParams)
        async function fetch() {
            const songs = await network.get(`/playlist/userSongs/${qParams.get('user')}`)
            if (songs) {
                setUserSongsPlaylist(songs.data)
            }

        }

        fetch()
    }, [userDetails])

    return (
        <>
            <div className='UserSongsPage'>
                <h2 className='UserSongsHead'>Youre Songs</h2>
                <div className='UserSongsList'>
                    {UserSongsPlaylist &&
                        UserSongsPlaylist.Songs.map(song => {
                            return <Song
                                name={song.title}
                                artist={song.Artist.name}
                                album={song.Album.name}
                                length={song.length}
                                link={song.youtubeLink}
                                cover_img={song.coverImg}
                                id={song.id}
                                orgin={`playlist=${UserSongsPlaylist.id}`}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default UserSongs;
