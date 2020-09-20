import React, { useState } from 'react';
import Song from './Song';
import './SearchPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Playlist(props) {

    return (
        <>
            <div className='resultRow'>
                <img className='ResultImg' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='RowDetails'>
                    <Link to={`/playlist/${props.id}`} style={{ textDecoration: 'none', color: 'white' }} ><span className='RowName'>{props.name}</span></Link>
                    <span className='playlistGenre'>{props.genre}</span>
                </div>
            </div>
        </>
    );
}

function Artist(props) {

    return (
        <>
            <div className='resultRow'>
                <img className='ResultImg' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <Link to={`/artist/${props.id}`} style={{ textDecoration: 'none', color: 'white' }} ><span className='RowName'>{props.name}</span></Link>
            </div>
        </>
    );
}

function Album(props) {

    return (
        <>
            <div className='resultRow'>
                <img className='ResultImg' src={props.cover_img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUR92Pj9suTlAgIpvCrf9z36F9HDlmSj6aRw&usqp=CAU'}></img>
                <div className='RowDetails'>
                    <Link to={`/album/${props.id}`} style={{ textDecoration: 'none', color: 'white' }} ><span className='RowName'>{props.name}</span></Link>
                    <span className='albumRowArtist'>{props.artist}</span>
                </div>
            </div>
        </>
    );
}

function SearchPage(props) {

    const [SearchInput, setSearchInput] = useState('');
    const [SearchResults, setSearchResults] = useState({ songs: null, artists: null, playlists: null, albums: null });

    function Search(event) {
        const value = event.target.value;
        async function getReasults() {
            try {
                const { data } = await axios.get(`/MainSearch/${value}`)
                setSearchInput(value);
                setSearchResults(data);
            } catch (error) {
                console.log(error.message);
            }
        }
        if (value !== '') {
            getReasults()
        }

    }

    return (
        <>
            <div id='searchPage'>
                <div className='searchInput'>
                    <input type='text' className='searchField' autoFocus
                        onChange={(event) => Search(event)}
                    ></input>
                </div>
                <div className='searchResults'>
                    {SearchResults.songs !== null &&
                        <div className='songsResults'>
                            <h3 className='ResultsHead'>Songs </h3>
                            {SearchResults.songs.map((song, index) => {
                                return (<><Song
                                    name={song.name}
                                    artist={song.artist}
                                    album={song.album}
                                    id={song.id}
                                    cover_img={song.cover_img}
                                    className='songResult'
                                    orgin={'playlist=topSongs'}
                                />
                                    {index < SearchResults.songs.length - 1 && <hr></hr>}
                                </>)
                            })
                            }
                        </div>
                    }
                    {SearchResults.artists !== null &&
                        <div className='artistsResults'>
                            <h3 className='ResultsHead'>Artists </h3>
                            {SearchResults.artists.map((artist, index) => {
                                return (
                                    <> <Artist
                                        name={artist.name}
                                        cover_img={artist.cover_img}
                                        id={artist.id}
                                    />
                                        {index < SearchResults.artists.length - 1 && <hr></hr>}
                                    </>)
                            })}
                        </div>
                    }
                    {SearchResults.playlists !== null &&
                        <div className='playlistsResults'>
                            <h3 className='ResultsHead'>Playlists </h3>
                            {SearchResults.playlists.map((playlist, index) => {
                                return (
                                    <><Playlist
                                        name={playlist.name}
                                        genre={playlist.genre}
                                        cover_img={playlist.cover_img}
                                        id={playlist.id}
                                    />
                                        {index < SearchResults.playlists.length - 1 && <hr></hr>}
                                    </>)
                            })}
                        </div>
                    }
                    {SearchResults.albums !== null &&
                        <div className='albumsResults'>
                            <h3 className='ResultsHead'>Albums </h3>
                            {SearchResults.albums.map((album, index) => {
                                return (
                                    <><Album
                                        name={album.name}
                                        artist={album.artist}
                                        cover_img={album.cover_img}
                                        id={album.id}
                                    />
                                        {index < SearchResults.albums.length - 1 && <hr></hr>}
                                    </>)
                            })}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default SearchPage;