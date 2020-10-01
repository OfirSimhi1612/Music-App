import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useUserDetails } from '../../UserContext'

function UserPlaylists() {

    const [Playlists, setPlaylists] = useState()

    const userDetails = useUserDetails()

    useEffect(() => {

        async function fetch() {
            if (Object.keys(userDetails).length > 0) {
                const { data: playlists } = await axios.get(`/playlist/byUser/${userDetails.id}`)
                setPlaylists(playlists)
            }
        }

        fetch()
    }, [userDetails])

    return (
        <>
            <div>
                {Playlists &&
                    Playlists.map(playlist => {
                        return <div>
                            {playlist.name}
                        </div>
                    })}
            </div>

        </>
    );
}

export default UserPlaylists;