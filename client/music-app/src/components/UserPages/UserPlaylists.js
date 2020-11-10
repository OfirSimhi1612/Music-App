import React, { useEffect, useState } from 'react';
import { useUserDetails } from '../../UserContext'
import network from '../Network/network'
import './UserPlaylists.css'
import { Link } from "react-router-dom";

function PlaylistInUserPage({ playlist }){
    console.log(playlist)
    return (
        <>
            <Link to={`/playlist/${playlist.id}`} className='userPlaylistContainer'>
                <img className='userPlaylistImg' src={playlist.coverImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='userplaylistDetails'>
                    <div className='userPlaylistName'>
                        {playlist.name}    
                    </div>
                    <div className='userplaylistMeta'>
                        <span className='playlistMetaGenre'>{playlist.genre}</span>
                        <span className='playlistMetaCreatedAt'>Added at: {new Date(playlist.createdAt).toDateString()}</span>
                    </div>
                </div>
            </Link>
        </>
    );
}

function UserPlaylists() {

    const [Playlists, setPlaylists] = useState()

    const userDetails = useUserDetails()

    useEffect(() => {

        async function fetch() {
            if (Object.keys(userDetails).length > 0) {
                const { data: playlists } = await network.get(`/playlist/byUser/${userDetails.id}`)
                setPlaylists(playlists)
            }
        }

        fetch()
    }, [userDetails])

    return (
        <>
            
            <div className='UserPlaylistsPage'>
                <h2 className='userPlaylistsHeader'>Youre Playlists</h2>
                <div className='userPlaylistsList'>
                    {Playlists &&
                        Playlists.map(playlist => {
                            return <PlaylistInUserPage
                                         playlist={playlist}
                                    />
                    })}
            </div>
            </div>

        </>
    );
}

export default UserPlaylists;