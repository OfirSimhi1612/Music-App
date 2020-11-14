import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Song from './Song';
import './ArtistPage.css'
import LikeButton from '../LikesButton/LikesButton';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function AlbumInArtist(props) {

    return (
        <>

            <Link to={`/album/${props.id}`}>
                <div className='album'>
                    <img className='AlbumImage' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                    <div className='AlbumDetails'>
                        <div className='AlbumtName'>{props.name}</div>
                        <div className='AlbumArtist'>{props.artist}</div>
                        <div className='AlbumLikes'>{props.likes} Likes</div>
                    </div>
                </div>
            </Link>
        </>
    );
}


function ArtistPage(props) {

    const [DisplayedArtist, setDisplayedArtist] = useState();
    const [ArtistSongs, setArtistSongs] = useState();
    const [ArtistAlbums, setArtistAlbums] = useState([]);

    const history = useHistory()

    useEffect(() => {
        async function fetch() {
            try {
                const ArtistData = await axios.get(`/artist/${props.match.params.id}`);
                const SongsData = await axios.get(`/artist/songs/${props.match.params.id}`);
                const AlbumsData = await axios.get(`/artist/albums/${props.match.params.id}`);

                setDisplayedArtist(ArtistData.data);
                setArtistSongs(SongsData.data);
                setArtistAlbums(AlbumsData.data);
            } catch (error) {
                console.log(error.message)
                history.push('/')
            }
        }

        fetch()
    }, [])

    function updateLikes(liked) {
        if (liked) {
            setDisplayedArtist({
                ...DisplayedArtist,
                likes: DisplayedArtist.likes + 1
            })
        } else {
            setDisplayedArtist({
                ...DisplayedArtist,
                likes: DisplayedArtist.likes - 1
            })
        }
    }

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        speed: 500
    };

    return (
        <>
            <div className='ArtistPage'>
                {DisplayedArtist && <div className='ArtistDetails'>
                    <img src={DisplayedArtist.coverImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                    <h2 className='displayedArtistsName'>{DisplayedArtist.name}</h2>
                    <div className='displayedArtistLikesDiv'>
                        <span className='displayedArtistLikes'>{DisplayedArtist.likes} Likes</span>
                        <LikeButton
                            id={DisplayedArtist.id}
                            model={'artist'}
                            updateLikes={updateLikes}
                        />
                    </div>
                </div>
                }
                <div className='leadingSongs'>
                    <h3 className='leadingSongsTitle'>Leading Songs</h3>
                    {ArtistSongs ?
                        ArtistSongs.slice(0, 5).map(song => {
                            return <Song
                                name={song.title}
                                length={song.length}
                                link={song.link}
                                cover_img={song.coverImg}
                                album={song.album}
                                id={song.id}
                                orgin={`artist=${DisplayedArtist.id}`}
                            />
                        })
                        : <div>
                            no recomended songs!
                    </div>
                    }
                </div>
                {ArtistAlbums.length > 0 && <div className='artistAlbums'>
                    <h3 className='AlbumsHead'>Leading Albums</h3>
                    <div className='albumsSlider'>
                        {ArtistAlbums.slice(0, 5).map(album => {
                            return <AlbumInArtist
                                name={album.name}
                                cover_img={album.coverImg}
                                artist={album.artist}
                                likes={album.likes}
                                id={album.id} />
                        })
                        }
                    </div>
                </div>
                }
            </div>
        </>
    );

}

export default ArtistPage;