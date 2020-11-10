import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ArtistSelect.css';
import axios from 'axios';



function ArtistOption(props) {

    function chooseArtist() {
        const artistInfo = {
            name: props.name,
            likes: props.likes,
            img: props.cover_img,
            id: props.id,
            cover_img: props.cover_img
        }
        props.handleArtistChoice(artistInfo);
    }

    return (
        <>
            <div className='artistDiv' onClick={chooseArtist}>
                <img className='selectArtistImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <label class='selectArtistName'>{props.name}</label>
                <label class='selectArtistLikes'>{props.likes} likes</label>
            </div>
        </>
    );
}

function ArtistSelect(props) {
    const [ArtistsFocused, setArtistsFocused] = useState(false);
    const [ArtistsOptions, setArtistsOptions] = useState([]);
    const [isArtistChosen, setIsArtistChosen] = useState(false);
    const [ArtistChosen, setArtistChosen] = useState(false);

    useEffect(() => {
        cancelSelection()
    }, [props.reset])

    function handleArtistChoice(artistInfo) {
        setArtistChosen(artistInfo);
        setIsArtistChosen(true);
        props.updateDetails('artistId', artistInfo.id)
    }

    const displayArtistOptions = React.useCallback(async (e) => {
        if (e.target.value) {
            try {
                const artists = await axios.get(`/artist/search/${e.target.value}`);
                setArtistsOptions(artists.data);
            } catch (error) {
                console.log(error.response)
                setArtistsOptions([]);
            }
        } else {
            setArtistsOptions([]);
        }
    }, []);

    function cancelSelection() {
        setIsArtistChosen(false);
        props.updateDetails('artistId', null)
    }

    return (
        <>
            <div id='ArtistSelect'>
                <label htmlFor='ArtistInput'>Artist:</label>
                {!isArtistChosen ?
                    <input id='ArtistInput' placeholder='Artist'
                        onChange={(e) => displayArtistOptions(e)}
                        onFocus={() => setArtistsFocused(true)}
                        onBlur={() => setTimeout(() => setArtistsFocused(false), 300)}
                        required
                    ></input>
                    : <>
                        <img className='ChoosenArtistImage' src={ArtistChosen.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                        <label class='artistName'>{ArtistChosen.name}</label>
                        <button onClick={cancelSelection}>change...</button>
                    </>

                }


                {ArtistsFocused &&
                    (ArtistsOptions.length > 0 ?
                        <div className='optionsDiv'>
                            {ArtistsOptions.map(artist => {
                                return <div>
                                    <ArtistOption
                                        className='artistOption'
                                        name={artist.name}
                                        likes={artist.likes}
                                        cover_img={artist.coverImg}
                                        id={artist.id}
                                        handleArtistChoice={handleArtistChoice}
                                    />
                                </div>
                            })}
                        </div>
                        : <Link to={`/addArtist`} className='addNewArtist'>
                            Add new artist +
                        </Link>)
                }
            </div>
        </>
    );
}

export default ArtistSelect;