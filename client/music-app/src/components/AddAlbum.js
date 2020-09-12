import React, { useState } from 'react';
import ArtistSelect from './selectOptions/ArtistSelect.js';
import axios from 'axios';


function AddAlbum (){

    const [AlbumDetails, setAlbumDetails] = useState({});

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(AlbumDetails)
        details[column] = value;
        setAlbumDetails(details);
        console.log(AlbumDetails)
    }, [AlbumDetails]);

    const addAlbum = React.useCallback(() => {
        axios.post(`http://localhost:8080/albums`, AlbumDetails)
    }, [AlbumDetails]);

    return (
        <>
            <form id='addAlbumForm' autoComplete="off">
                <div>
                    <label htmlFor='NameInput'>Album Name:</label>
                    <input type='text' id ='NameInput' placeholder='Name'
                    onChange={(e) => updateDetails('name', e.target.value)}
                    ></input>
                </div>
                <div>
                    <ArtistSelect 
                    updateDetails={updateDetails}
                    />
                </div>
                <div>
                    <label htmlFor='ImageInput'>Image Link:</label>
                    <input type='text' id ='ImageInput' placeholder='Image Link'
                    onChange={(e) => updateDetails('cover_img', e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='PublishTime'>Published at:</label>
                    <input type='date' id='PublishTime'
                    onChange={(e) => updateDetails('published_at', e.target.value)}
                    ></input>
                </div>
                <div>
                    <button type='submit' onClick={addAlbum}>Add Album!</button>
                </div>
            </form>
        </>
    );
}

export default AddAlbum;

