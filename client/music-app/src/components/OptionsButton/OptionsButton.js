import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useUserDetails } from '../../UserContext'
import './OptionsButton.css'
import AddToPlaylistModal from './AddToPlaylistModal';
import './AddToPlaylistModal.css'


function OptionsButton(props) {

    const [UserLoged, setUserLoged] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userDetails = useUserDetails()

    useEffect(() => {
        if (Object.keys(userDetails).length > 0) {
            setUserLoged(true)
        }
    }, [UserLoged])

    async function addSongToLibrary() {

    }

    return (
        <>
            <Dropdown className='LibraryDropdwon' >
                <Dropdown.Toggle variant="Link" id="Optionsdropdown-basic" split>

                </Dropdown.Toggle>

                <Dropdown.Menu className='OptionsDropdownMenu'>
                    <Dropdown.Item className='OptionsDropItem' disabled={!UserLoged} href='#action'>Add To Library</Dropdown.Item>
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
