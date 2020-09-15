import React, { useState } from 'react';
import ArtistSelect from './selectOptions/ArtistSelect.js';
import AlbumSelect from './selectOptions/AlbumSelect.js';
import axios from 'axios';
import './AddSong.css';


function AddSong() {

    const [SongDetails, setSongDetails] = useState({ title: null });
    const [error, setError] = useState(null);

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(SongDetails)
        details[column] = value;
        setSongDetails(details);
        console.log(SongDetails)
    }, [SongDetails]);


    const addSong = React.useCallback(() => {
        axios.post(`http://localhost:8080/songs`, SongDetails)
            .catch((error) => setError(error.response.data));
    }, [SongDetails]);

    return (
        <>
            <form id='addSongForm' autoComplete="off">
                <h3>Add Song:</h3>
                <div className='inputRow'>
                    <label htmlFor='TitleInput'>Song Title:</label>
                    <input className='inputField' type='text' id='TitleInput' placeholder='Title'
                        onChange={(e) => updateDetails('title', e.target.value)}
                        required
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
                <div className='inputRow'>
                    <label htmlFor='LinkInput'>Youtube Link:</label>
                    <input required className='inputField' type='text' id='LinkInput' placeholder='Youtube Link'
                        onChange={(e) => updateDetails('youtube_link', e.target.value)}
                    ></input>
                </div>
                {/* <div className='inputRow'>
                    <label htmlFor='LinkInput'>Length:</label>
                    <span className='inputField'>
                    <input type='text' id ='minInput'
                    onChange={(e) => updateDetails('youtube_link', e.target.value)}
                    ></input>:
                    <input type='text' id ='secInput'
                    onChange={(e) => updateDetails('youtube_link', e.target.val)}>
                    </input>
                    </span>
                </div> */}
                <div className='inputRow'>
                    <label htmlFor='addLyrics'>Add Lyrics</label>
                    <textarea className='inputField' id='addLyricsButton' placeholder='type lyrics...'
                        onChange={(e) => updateDetails('lyrics', e.target.value)}
                    ></textarea>
                </div>
                <div className='inputRow'>
                    <label htmlFor='creationTime'>Released at:</label>
                    <input className='inputField' type='date' id='creationTime'
                        onChange={(e) => updateDetails('created_at', e.target.value)}
                    ></input>
                </div>
                {error && <div className='error'>*{error}</div>}
                <div>
                    <button type='submit' onClick={addSong}>Add song!</button>
                </div>
            </form>
        </>
    );
}

export default AddSong;

