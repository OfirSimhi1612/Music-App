import React, { useEffect, useState } from 'react';
import ArtistSelect from './selectOptions/ArtistSelect.js';
import axios from 'axios';
import './AddAlbum.css';
import swal from 'sweetalert'


function AddAlbum() {

    const [AlbumDetails, setAlbumDetails] = useState({});
    const [reset, setReset] = useState(false);

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(AlbumDetails)
        details[column] = value;
        setAlbumDetails(details);
        setReset(false)
    }, [AlbumDetails]);

    const addAlbum = React.useCallback((e) => {
        e.preventDefault()
        const form = e.target;
        async function send() {
            try {
                await axios.post(`/album`, AlbumDetails)
                swal({
                    text: "Album Added!",
                    icon: "success",
                    button: "ok",
                });
                form.reset();
                setReset(!reset)
            } catch (error) {
                console.log(error.response)
                swal({
                    text: error.response.data,
                    icon: "error",
                    button: "ok",
                })
                setAlbumDetails({})
            }
        }
        send()
    }, [AlbumDetails]);

    return (
        <>
            <form id='addAlbumForm' autoComplete="off" onSubmit={(e) => addAlbum(e)}>
                <h3>Add Album:</h3>
                <div className='inputRow'>
                    <label htmlFor='NameInput'>Album Name:</label>
                    <input className='inputField' type='text' id='NameInput' placeholder='Name'
                        onChange={(e) => updateDetails('name', e.target.value)}
                    ></input>
                </div>
                <div>
                    <ArtistSelect
                        updateDetails={updateDetails}
                        reset={reset}
                    />
                </div>
                <div className='inputRow'>
                    <label htmlFor='ImageInput'>Image Link:</label>
                    <input className='inputField' type='text' id='ImageInput' placeholder='Image Link'
                        onChange={(e) => updateDetails('coverImg', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='PublishTime'>Published at:</label>
                    <input className='inputField' type='date' id='PublishTime'
                        onChange={(e) => updateDetails('publishedAt', e.target.value)}
                    ></input>
                </div>
                <div>
                    <button type='submit'>Add Album!</button>
                </div>
            </form>
        </>
    );
}

export default AddAlbum;

