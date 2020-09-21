import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import './AddToPlaylistModal.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function PlaylistInModal(props) {

    return (
        <>
            <div className='playlistCardInModal'>
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
                setPlaylists(data);
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
        } else {
            try {
                const { data } = await axios.get('/playlists');
                setPlaylists(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const settings = {
        className: "center",
        centerMode: true,
        infinite: Playlists.length > 3,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
    };


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='addToPlaylistModal'
        >
            <Modal.Header className='ModalHeaderContainer'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className='ModalHeader'>Add To Playlist</h1>
                </Modal.Title>
                <input placeholder='Search Playlist' className='searchInputInModal' onChange={(e) => SearchPlaylist(e)}></input>
            </Modal.Header>
            <Modal.Body>

                <div className='playlistsInModal'>
                    <Slider {...settings}>
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
                    </Slider>
                    <Link to={'/addPlaylist'}>
                        <div className='addPlaylistInModal'>
                            Add New Playlist +
                    </div>
                    </Link>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddToPlaylistModal;