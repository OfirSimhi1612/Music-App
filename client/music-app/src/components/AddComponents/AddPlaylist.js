import React, { useState } from 'react';
import axios from 'axios';
import './AddPlaylist.css';


function AddPlaylist() {

    const [PlaylistDetails, setPlaylistDetails] = useState({});

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(PlaylistDetails)
        details[column] = value;
        setPlaylistDetails(details);
    }, [PlaylistDetails]);

    const addPlaylist = React.useCallback(() => {
        axios.post(`http://localhost:8080/playlists`, PlaylistDetails)
    }, [PlaylistDetails]);


    return (
        <>
            <form id='addPlaylistForm' autoComplete="off">
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
                        onChange={(e) => updateDetails('cover_img', e.target.value)}
                    ></input>
                </div>
                <div>
                    <button type='submit' onClick={addPlaylist}>Add Playlist!</button>
                </div>
            </form>

            <div className='songsChoose'>
                <input></input>
            </div>
        </>
    );
}

export default AddPlaylist;

