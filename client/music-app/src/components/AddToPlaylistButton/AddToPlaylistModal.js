import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

function PlaylistInModal(props) {

    return (
        <>
            <div>
                <img onClick={() => props.add(props.id)} className='playlistInModalImg' src={props.cover_img}></img>
                <span onClick={() => props.add(props.id)} className='playlistInModalName'>{props.name}</span>
            </div>
        </>
    );

}

function AddToPlaylistModal(props) {

    const [Playlists, setPlaylists] = useState([]);

    useEffect(() => {

        async function fetch() {
            try {
                const { data } = await axios.get('/playlists');
                setPlaylists(data, 'datataaa');
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        }

        fetch()
    }, [])

    async function addSongToPlaylist(playlist_id) {
        try {
            const body = {
                "song_id": props.song_id,
                "playlist_id": playlist_id
            }
            await axios.post('/addSongToPlaylist', body);
            props.onHide();
        } catch (error) {
            console.log(error);
        }
    }

    async function SearchPlaylist(e) {
        const searchValue = e.target.value;
        async function search() {
            try {
                const { data } = await axios.get(`/searchPlaylists/${searchValue}`)
                console.log(data)
                setPlaylists(data);
            } catch (error) {
                console.log(error);
            }
        }
        if (searchValue !== '') {
            search();
        }
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add To Playlist...
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='searchPlaylistsInModal'>
                    <input className='searchInputInModal' onChange={(e) => SearchPlaylist(e)}></input>
                </div>
                <div className='playlistsInModal'>
                    {Playlists.map(playlist => {
                        return (
                            <PlaylistInModal
                                add={addSongToPlaylist}
                                name={playlist.name}
                                cover_img={playlist.cover_img}
                                id={playlist.playlist_id}
                            />
                        );
                    })
                    }
                    <div className='addPlaylistInModal'>
                        add plalist
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddToPlaylistModal;