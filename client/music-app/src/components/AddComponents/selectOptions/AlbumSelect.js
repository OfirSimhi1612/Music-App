import React, { useState } from 'react';
import './AlbumSelect.css';
import axios from 'axios';

    

function AlbumOption(props){

    function chooseAlbum(){
        const albumInfo = {
            name: props.name,
            likes: props.likes,
            img: props.cover_img,
            id: props.id
        }
        props.handleAlbumChoice(albumInfo);
    }

    return (
        <>
            <div className='albumDiv' onClick={chooseAlbum}>
                <label class='albumName'>{props.name}</label>
                <label class='albumLikes'>{props.likes} likes</label>
                <img src={props.cover_img}></img>
            </div>
        </>
    );
}

function AlbumSelect(props){
    const [AlbumsFocused, setAlbumFocused] = useState(false);
    const [AlbumsOptions, setAlbumsOptions] = useState([]);
    const [isAlbumChosen, setIsAlbumChosen] = useState(false);
    const [AlbumChosen, setAlbumChosen] = useState(false);


    function handleAlbumChoice(albumInfo){
        setAlbumChosen(albumInfo);
        setIsAlbumChosen(true);
        props.updateDetails('album_id', albumInfo.id)
    }

    
    const displayAlbumsOptions = React.useCallback(async (e) => {
        if(e.target.value){
            try{
                const albums = await axios.get(`http://localhost:8080/albumsOptions/${e.target.value}`);
            setAlbumsOptions(albums.data);
            } catch(error){
                console.log(error.message)
                setAlbumsOptions([]);
            }
        } else {
            setAlbumsOptions([]);
        }
    }, []);

    return(
        <>
            <label htmlFor='AlbumInput'>Album:</label>
            {!isAlbumChosen ?
                <input id='AlbumInput' placeholder='Album'
                onChange={(e) => displayAlbumsOptions(e)}
                onFocus={() => setAlbumFocused(true)}
                onBlur={() => setTimeout(() => setAlbumFocused(false), 300)}
                ></input>
                :<>
                    <label class='albumName'>{AlbumChosen.name}</label>
                    <label class='albumLikes'>{AlbumChosen.likes} likes</label>
                    <img src={AlbumChosen.cover_img}></img>
                    <button onClick={() => setIsAlbumChosen(false)}>change...</button>
                </>
                
            }   
                {AlbumsFocused &&
                    (AlbumsOptions.length > 0 ?
                    AlbumsOptions.map(album => {
                        return <div>
                            <AlbumOption
                            className='albumOption'
                            name={album.name}
                            likes={album.likes}
                            cover_img={album.cover_img}
                            id={album.album_id}
                            handleAlbumChoice={handleAlbumChoice}
                            />  
                        </div>
                    })
                    : <div className='addNewAlbum'>
                        Add new album +
                    </div>)
                }
        </>
    );
}

export default AlbumSelect;