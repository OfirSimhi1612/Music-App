import React, { useState } from 'react';
import axios from 'axios';


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
                <div>
                    <label htmlFor='NameInput'>Artist Name:</label>
                    <input type='text' id ='NameInput' placeholder='Name'
                    onChange={(e) => updateDetails('name', e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='ImageInput'>Image Link:</label>
                    <input type='text' id ='ImageInput' placeholder='Cover Image'
                    onChange={(e) => updateDetails('cover_img', e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='birthDate'>Birth Date:</label>
                    <input type='date' id='birthDate'
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

