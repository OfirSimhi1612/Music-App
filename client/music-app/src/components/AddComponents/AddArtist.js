import React, { useState } from 'react';
import axios from 'axios';
import './AddArtist.css';


function AddSong (){

    const [ArtistDetails, setArtistDetails] = useState({});

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(ArtistDetails)
        details[column] = value;
        setArtistDetails(details);
        console.log(ArtistDetails)
    }, [ArtistDetails]);

    const addSong = React.useCallback(() => {
        axios.post(`http://localhost:8080/artists`, ArtistDetails)
    }, [ArtistDetails]);

    return (
        <>
            <form id='addArtistForm' autoComplete="off">
            <h3>Add Artist:</h3>
                <div className='inputRow'>
                    <label htmlFor='NameInput'>Artist Name:</label>
                    <input className='inputField' type='text' id ='NameInput' placeholder='Name'
                    onChange={(e) => updateDetails('name', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='ImageInput'>Image Link:</label>
                    <input className='inputField' type='text' id ='ImageInput' placeholder='Cover Image'
                    onChange={(e) => updateDetails('cover_img', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='birthDate'>Birth Date:</label>
                    <input className='inputField' type='date' id='birthDate'
                    onChange={(e) => updateDetails('birth_date', e.target.value)}
                    ></input>
                </div>
                <div>
                    <button type='submit' onClick={addSong}>Add Artist!</button>
                </div>
            </form>
        </>
    );
}

export default AddSong;

