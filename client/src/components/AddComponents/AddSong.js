import React, { useState } from 'react';
import ArtistSelect from './selectOptions/ArtistSelect.js';
import AlbumSelect from './selectOptions/AlbumSelect.js';
import './AddSong.css';
import swal from 'sweetalert';
import DurationPicker from './DurationPicker';
import network from '../Network/network'


function AddSong() {

    const [SongDetails, setSongDetails] = useState({ title: null });
    const [reset, setreset] = useState(false);

    const updateDetails = React.useCallback((column, value) => {
        const details = Object.assign(SongDetails)
        details[column] = value;
        setSongDetails(details);
        setreset(false)
    }, [SongDetails]);


    const addSong = React.useCallback((e) => {
        e.preventDefault()
        const form = e.target
        async function send() {
            try {
                const posted = await network.post(`/song`, SongDetails)
                if (posted) {
                    swal({
                        text: "Song Added!",
                        icon: "success",
                        button: "ok",
                    });
                    form.reset()
                    setreset(true)
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
                        reset={reset}
                    />
                </div>
                <div>
                    <AlbumSelect
                        updateDetails={updateDetails}
                        reset={reset}
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
                <div>
                    <button type='submit'>Add song!</button>
                </div>
            </form>
        </>
    );
}

export default AddSong;

