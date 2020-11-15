import React, { useState } from 'react';
import axios from 'axios';
import './AddPlaylist.css';
import swal from 'sweetalert';
import network from '../Network/network'
import { useUserDetails } from '../../UserContext';
import Button from 'react-bootstrap/Button'


function AddPlaylist() {

    const [PlaylistDetails, setPlaylistDetails] = useState({
        isPublic: false
    });

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
    }, [PlaylistDetails, userDetails]);


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
                    <div className='publicRadio'>
                        <label className='radioLabel'>
                            <input
                                className='inputField' 
                                type='radio' 
                                name='isPublic' 
                                onChange={() => updateDetails('isPublic', true)}>
                            </input>
                            Yes
                        </label>
                        <label className='radioLabel'>
                            <input defaultChecked
                                className='inputField' 
                                type='radio' 
                                name='isPublic' 
                                onChange={() => updateDetails('isPublic', false)}>
                            </input>
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <Button variant='success' type='submit'>Add Playlist!</Button>
                </div>
            </form>
        </>
    );
}

export default AddPlaylist;

