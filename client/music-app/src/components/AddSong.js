import React, { useState } from 'react';
import ArtistSelect from './selectOptions/ArtistSelect.js';
import AlbumSelect from './selectOptions/AlbumSelect.js';
import axios from 'axios';


function AddSong (){

    const [SongDetails, setSongDetails] = useState({});

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(SongDetails)
        details[column] = value;
        setSongDetails(details);
    }, [SongDetails]);

    const addSong = React.useCallback(() => {
        axios.post(`http://localhost:8080/songs`, SongDetails)
    }, [SongDetails]);

    return (
        <>
            <form id='addSongForm' autoComplete="off">
                <div>
                    <label htmlFor='TitleInput'>Song Title:</label>
                    <input type='text' id ='TitleInput' placeholder='Title'
                    onChange={(e) => updateDetails('title', e.target.value)}
                    ></input>
                </div>
                <div>
                    <ArtistSelect 
                    updateDetails={updateDetails}
                    />
                </div>
                <div>
                    <AlbumSelect 
                    updateDetails={updateDetails}
                    />
                </div>
                <div>
                    <label htmlFor='LinkInput'>Youtube Link:</label>
                    <input type='text' id ='LinkInput' placeholder='Youtube Link'
                    onChange={(e) => updateDetails('youtube_link', e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='addLyrics'>Add Lyrics</label>
                    <textarea id='addLyricsButton' placeholder='type lyrics...'
                    onChange={(e) => updateDetails('lyrics', e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor='creationTime'>Released at:</label>
                    <input type='date' id='creationTime'
                    onChange={(e) => updateDetails('created_at', e.target.value)}
                    ></input>
                </div>
                <div>
                    <button type='submit' onClick={addSong}>Add song!</button>
                </div>
            </form>
        </>
    );
}

export default AddSong;

