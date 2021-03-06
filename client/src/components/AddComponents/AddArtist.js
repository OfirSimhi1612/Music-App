import React, { useState } from 'react';
// import axios from 'axios';
import './AddArtist.css';
import swal from 'sweetalert';
import network from '../Network/network'




function AddSong() {

    const [ArtistDetails, setArtistDetails] = useState({});

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(ArtistDetails)
        details[column] = value;
        setArtistDetails(details);
    }, [ArtistDetails]);

    const addArtist = React.useCallback((e) => {
        e.preventDefault();
        const form = e.target;
        async function sendArtist() {
            try {
                const posted = await network.post(`/artist`, ArtistDetails)
                if (posted) {
                    swal({
                        text: "Artist Added!",
                        icon: "success",
                        button: "ok",
                    });
                    form.reset()
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
        sendArtist()

    }, [ArtistDetails]);

    return (
        <>
            <form id='addArtistForm' autoComplete="off" onSubmit={(e) => addArtist(e)}>
                <h3>Add Artist:</h3>
                <div className='inputRow'>
                    <label htmlFor='NameInput'>Artist Name:</label>
                    <input className='inputField' type='text' id='NameInput' placeholder='Name'
                        onChange={(e) => updateDetails('name', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='ImageInput'>Image Link:</label>
                    <input className='inputField' type='text' id='ImageInput' placeholder='Cover Image'
                        onChange={(e) => updateDetails('coverImg', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='birthDate'>Birth Date:</label>
                    <input className='inputField' type='date' id='birthDate'
                        onChange={(e) => updateDetails('birthDate', e.target.value)}
                    ></input>
                </div>
                <div>
                    <button type='submit'>Add Artist!</button>
                </div>
            </form>
        </>
    );
}

export default AddSong;

