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
                <img className = 'AlbumImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <label class='albumName'>{props.name}</label>
                <label class='albumLikes'>{props.likes} likes</label>
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
        <div id='AlbumSelect'>
            <label htmlFor='AlbumInput'>Album:</label>
            {!isAlbumChosen ?
                <input id='AlbumInput' placeholder='Album'
                onChange={(e) => displayAlbumsOptions(e)}
                onFocus={() => setAlbumFocused(true)}
                onBlur={() => setTimeout(() => setAlbumFocused(false), 300)}
                ></input>
                :<>
                    <img className='ChoosenAlbumImage' src={AlbumChosen.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                    <label class='albumName'>{AlbumChosen.name}</label>
                    <button onClick={() => {
                        props.updateDetails('album_id', null)
                        setIsAlbumChosen(false)}
                        }>change...</button>
                </>
                
            }   
                {AlbumsFocused &&
                    (AlbumsOptions.length > 0 ?
                    <div className='optionsDiv'>
                    {AlbumsOptions.map(album => {
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
                    })}
                    </div>
                    : <div className='addNewAlbum'>
                        Add new album +
                    </div>)
                }
        </div>
        </>
    );
}

export default AlbumSelect;