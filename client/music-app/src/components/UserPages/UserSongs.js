import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUserDetails } from '../../UserContext';
import Song from '../Pages/Song'

function UserSongs() {

    const [UserSongsPlaylist, setUserSongsPlaylist] = useState();

    const userDetails = useUserDetails();

    useEffect(() => {
        async function fetch() {
            if (Object.keys(userDetails).length > 0) {
                const { data: songs } = await axios.get(`/playlist/userSongs/${userDetails.id}`)

                setUserSongsPlaylist(songs)
            }

        }

        fetch()
    }, [userDetails])

    return (
        <>
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
        </>
    );
}

export default UserSongs;
