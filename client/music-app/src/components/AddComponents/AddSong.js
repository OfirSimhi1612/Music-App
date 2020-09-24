import React, { useState } from 'react';
import ArtistSelect from './selectOptions/ArtistSelect.js';
import AlbumSelect from './selectOptions/AlbumSelect.js';
import axios from 'axios';
import './AddSong.css';
import swal from 'sweetalert';
import DurationPicker from './DurationPicker';


function AddSong() {

    const [SongDetails, setSongDetails] = useState({ title: null });
    const [error, setError] = useState([]);

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(SongDetails)
        details[column] = value;
        setSongDetails(details);
        console.log(SongDetails)
    }, [SongDetails]);


    const addSong = React.useCallback((e) => {
        e.preventDefault()
        try {
            axios.post(`/song`, SongDetails)
            swal({
                text: "Song Added!",
                icon: "success",
                button: "ok",
            });
            e.target.reset();
        } catch (error) {
            console.log(error);
        }

    }, [SongDetails]);


    return (
        <>
            <form id='addSongForm' autoComplete="off" onSubmit={(e) => addSong(e)}>
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
                <div>
                    <DurationPicker
                        updateDetails={updateDetails}
                    />
                </div>
                <div className='inputRow'>
                    <label htmlFor='LinkInput'>Youtube Link:</label>
                    <input required className='inputField' type='text' id='LinkInput' placeholder='Youtube Link'
                        onChange={(e) => updateDetails('youtubeLink', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='coverImgInput'>Cover Image:</label>
                    <input className='inputField' type='text' id='coverImageInput' placeholder='Cover Image'
                        onChange={(e) => updateDetails('coverImg', e.target.value)}
                    ></input>
                </div>
                <div className='inputRow'>
                    <label htmlFor='addLyrics'>Add Lyrics</label>
                    <textarea className='inputField' id='addLyricsButton' placeholder='type lyrics...'
                        onChange={(e) => updateDetails('lyrics', e.target.value)}
                    ></textarea>
                </div>
                <div className='inputRow'>
                    <label htmlFor='creationTime'>Released at:</label>
                    <input required className='inputField' type='date' id='creationTime'
                        onChange={(e) => updateDetails('releasedAt', e.target.value)}
                    ></input>
                </div>
                {error.length > 0 && <div className='error'>*{error.map(error => {
                    return <div>{error}</div>
                })}</div>}
                <div>
                    <button type='submit'>Add song!</button>
                </div>
            </form>
        </>
    );
}

export default AddSong;

