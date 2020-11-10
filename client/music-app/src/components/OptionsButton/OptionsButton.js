import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useUserDetails } from '../../UserContext'
import './OptionsButton.css'
import AddToPlaylistModal from './AddToPlaylistModal';
import './AddToPlaylistModal.css'
import network from '../Network/network';
import axios from 'axios';
import swal from 'sweetalert';
import { useLocation, useHistory } from 'react-router-dom';


function OptionsButton(props) {

    const [UserLoged, setUserLoged] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inLibrary, setInLibrary] = useState(false)

    const userDetails = useUserDetails()
    const location  = useLocation()
    const history = useHistory()

    useEffect(() => {
        if (Object.keys(userDetails).length > 0) {
            setUserLoged(true)
        }
    }, [UserLoged])

    useEffect(() => {
        existInLibrary()
    }, [])

    async function addSongToLibrary() {
        try{
            const songDetails = await network.post('/library/addSong', {
                songId: props.id
            })
            setInLibrary(true)
            if(songDetails){
                swal({
                    text: 'Song Added To Library!',
                    icon: "success",
                    button: "ok",
                })
            }
        } catch (error){
            console.log(error)
        }
    }

    async function removeSongFromLibrary() {
        try{
            const songDetails = await network.delete(`/library/removeSong?songId=${props.id}`)
            setInLibrary(false)
            props.removeFromList(props.id)
            if(songDetails){
                swal({
                    text: 'Song Removed From Library!',
                    icon: "success",
                    button: "ok",
                })
            }
        } catch (error){
            console.log(error)
        }
    }

    const existInLibrary = React.useCallback(async () => {
        try {
            const { data: exist } = await axios.get(`/library/isExist?songId=${props.id}`)
            setInLibrary(exist)
        } catch (error) {
            console.log(error)
            setInLibrary(false)
        }
    }, [])

    return (
        <>
            <Dropdown className='LibraryDropdwon' >
                <Dropdown.Toggle variant="Link" id="Optionsdropdown-basic" split>

                </Dropdown.Toggle>

                <Dropdown.Menu className='OptionsDropdownMenu'>
                    { inLibrary ? 
                        <Dropdown.Item className='OptionsDropItem' disabled={!UserLoged} href='#action' onClick={removeSongFromLibrary}>Remove From Library</Dropdown.Item>
                        : <Dropdown.Item className='OptionsDropItem' disabled={!UserLoged} href='#action' onClick={addSongToLibrary}>Add To Library</Dropdown.Item>
                    }
                    <Dropdown.Item className='OptionsDropItem' disabled={!UserLoged} href='#action' onClick={() => setIsModalOpen(true)}>Add To Playlist</Dropdown.Item>
                    <Dropdown.Item className='OptionsDropItem' disabled={!UserLoged} href='#action'>Share</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <AddToPlaylistModal
                song_id={props.id}
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default OptionsButton
