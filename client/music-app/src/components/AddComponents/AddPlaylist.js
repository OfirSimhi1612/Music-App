import React, { useState } from 'react';
import axios from 'axios';
import './AddPlaylist.css';
import swal from 'sweetalert';
import network from '../Network/network'
import { useUserDetails } from '../../UserContext'


function AddPlaylist() {

    const [PlaylistDetails, setPlaylistDetails] = useState({});

    const userDetails = useUserDetails()
    console.log(userDetails)

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(PlaylistDetails)
        details[column] = value;
        setPlaylistDetails(details);
    }, [PlaylistDetails]);

    const addPlaylist = React.useCallback((e) => {
        e.preventDefault()
        const form = e.target;
        async function send() {
            try {
                const posted = await network.post(`/playlist`, {...PlaylistDetails, creator: userDetails.id})
                if (posted) {
                    swal({
                        text: "Playlist Added!",
                        icon: "success",
                        button: "ok",
                    });
                    form.reset();
                }
            } catch (error) {
                console.log(error.response)
                swal({
                    text: error.response.data,
                    icon: "error",
                    button: "ok",
                });
            }
        }
        send()
    }, [PlaylistDetails]);


    return (
        <>
            <form id='addPlaylistForm' autoComplete="off" onSubmit={(e) => addPlaylist(e)}>
                <h3>Add Playlist:</h3>
                <div className='inputRow'>
                    <label htmlFor='NameInput'>Playlist Name:</label>
                    <input className='inputField' type='text' id='NameInput' placeholder='Name'
                        onChange={(e) => updateDetails('name', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='GenreInput'>Genre:</label>
                    <input className='inputField' type='text' id='GenreInput' placeholder='Genre'
                        onChange={(e) => updateDetails('genre', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='ImageInput'>Image Link:</label>
                    <input className='inputField' type='text' id='ImageInput' placeholder='Image Link'
                        onChange={(e) => updateDetails('coverImg', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='PublicInput'>Do you want the playlist to be public?</label>
                    <input className='inputField' type='radio' id='PublicInput' onChange={(e) => updateDetails('coverImg', e.target.value)}
                    >
                        
                    </input>
                </div>
                <div>
                    <button type='submit'>Add Playlist!</button>
                </div>
            </form>
        </>
    );
}

export default AddPlaylist;

