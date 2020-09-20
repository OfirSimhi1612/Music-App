import React, { useState } from 'react';
import AddToPlaylistModal from './AddToPlaylistModal';

function AddToPlaylistButton(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button className='addToPlaylistButton' onClick={() => setIsModalOpen(true)}>+</button>
            <AddToPlaylistModal
                song_id={props.id}
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default AddToPlaylistButton;