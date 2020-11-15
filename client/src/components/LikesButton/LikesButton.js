import React, { useState } from 'react';
import axios from 'axios';

function LikeButton(props) {
    const [isLiked, setIsLiked] = useState(false);

    const id = props.id;
    const table = props.table;

    const addLike = async (e) => {
        e.stopPropagation()
        try {
            setIsLiked(true);
            axios.patch(`/${props.model}/like/${id}?like`);
            props.updateLikes(true)
        } catch (error) {
            console.log(error.message);
        }
    }

    const disLike = async (e) => {
        e.stopPropagation()
        try {
            setIsLiked(false);
            axios.patch(`/${props.model}/like/${id}`);
            props.updateLikes(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {isLiked ?
                <img className='likeButton' onClick={(e) => disLike(e)} src='https://cdn.pixabay.com/photo/2013/07/13/10/27/dislike-157252_1280.png'></img>
                : <img className='likeButton' onClick={(e) => addLike(e)} src='https://jeannecolemanlaw.com/wp-content/uploads/2015/07/hand-like-thumb-up-confirm-okay-go-green.png'></img>
            }
        </>
    );
}

export default LikeButton;