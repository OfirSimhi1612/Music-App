import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './AddToPlaylistModal.css'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useUserDetails } from '../../UserContext';
import swal from "sweetalert";

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

    const userDetails = useUserDetails()

    const fetch = React.useCallback(async () => {
        try {
            const { data } = await axios.get(`/playlist/byUser/${userDetails.id}`);
            setPlaylists(data);
        } catch (error) {
            console.log(error);
        }
    }, [userDetails])


    useEffect(() => {
        fetch()
    }, [])

    async function addSongToPlaylist(playlist_id) {
        try {
            const body = {
                "songId": props.song_id,
                "playlistId": playlist_id
            }
            await axios.post('/playlist/addSong', body);
            props.onHide();
            swal({
                text: 'Song Added To Playlist!',
                icon: "success",
                button: "ok",
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function SearchPlaylist(e) {
        const searchValue = e.target.value;
        if (searchValue === '') {
            await fetch()
        }
        async function search() {
            try {
                const { data } = await axios.get(`/playlist/search/${searchValue}`)
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
                    <Slider {...settings} className='addToPlaylistModalSlider'>
                        {Playlists.map(playlist => {
                            return (
                                <PlaylistInModal
                                    add={addSongToPlaylist}
                                    name={playlist.name}
                                    cover_img={playlist.coverImg}
                                    id={playlist.id}
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