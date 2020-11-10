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
        async function fetch() {
            const songs = await network.get(`/playlist/userSongs/${qParams.get('user')}`)
            if (songs) {
                setUserSongsPlaylist(songs.data)
            }

        }
        fetch()
    }, [userDetails])

    const removeFromList = React.useCallback((songId) => {
        console.log(UserSongsPlaylist)
        const filteredSongs  = UserSongsPlaylist.Songs.filter(song => song.id !== songId)

        setUserSongsPlaylist({
            ...UserSongsPlaylist,
            Songs: filteredSongs
        });
    }, [UserSongsPlaylist])

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
                                removeFromList={removeFromList}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default UserSongs;
