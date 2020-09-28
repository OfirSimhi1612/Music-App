import React, { useState } from 'react';
import AddToPlaylistModal from './AddToPlaylistModal';
import './AddToPlaylistButton.css'
import { useUserDetails } from '../../UserContext'
import { useHistory } from 'react-router-dom';

function AddToPlaylistButton(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const userDetails = useUserDetails()
    const history = useHistory()

    function handleClick() {
        if (userDetails.id) {
            setIsModalOpen(true)
        } else {
            history.push('/LogIn')
        }
    }

    return (
        <>
            <button className='addToPlaylistButton' onClick={handleClick}>+</button>
            <AddToPlaylistModal
                song_id={props.id}
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default AddToPlaylistButton;