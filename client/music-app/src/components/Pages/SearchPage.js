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

function SearchPage() {

    const [SearchResults, setSearchResults] = useState({ songs: [], artists: [], playlists: [], albums: [] });


    function Search(event) {
        const value = event.target.value;
        async function getReasults() {
            try {
                Promise.all([
                    axios.get(`/song/search/${value}`),
                    axios.get(`/album/search/${value}`),
                    axios.get(`/artist/search/${value}`),
                    axios.get(`/playlist/search/${value}`)
                ]).then(results => {
                    setSearchResults({
                        songs: results[0].data.slice(0, 6),
                        albums: results[1].data.slice(0, 6),
                        artists: results[2].data.slice(0, 6),
                        playlists: results[3].data.slice(0, 6)
                    });
                })
                // setSearchInput(value);

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
                    {SearchResults.songs.length > 0 &&
                        <div className='songsResults'>
                            <h3 className='ResultsHead'>Songs </h3>
                            {SearchResults.songs.map((song, index) => {
                                console.log(song.id, 'srearch')
                                return (<><Song
                                    name={song.title}
                                    artist={song.Artist.name}
                                    album={song.Album.name}
                                    id={song.id}
                                    cover_img={song.coverImg}
                                    className='songResult'
                                    orgin={'playlist=topSongs'}
                                />
                                    {index < SearchResults.songs.length - 1 && <hr></hr>}
                                </>)
                            })
                            }
                        </div>
                    }
                    {SearchResults.artists.length > 0 &&
                        <div className='artistsResults'>
                            <h3 className='ResultsHead'>Artists </h3>
                            {SearchResults.artists.map((artist, index) => {
                                return (
                                    <> <Artist
                                        name={artist.name}
                                        cover_img={artist.coverImg}
                                        id={artist.id}
                                    />
                                        {index < SearchResults.artists.length - 1 && <hr></hr>}
                                    </>)
                            })}
                        </div>
                    }
                    {SearchResults.playlists.length > 0 &&
                        <div className='playlistsResults'>
                            <h3 className='ResultsHead'>Playlists </h3>
                            {SearchResults.playlists.map((playlist, index) => {
                                return (
                                    <><Playlist
                                        name={playlist.name}
                                        genre={playlist.genre}
                                        cover_img={playlist.coverImg}
                                        id={playlist.id}
                                    />
                                        {index < SearchResults.playlists.length - 1 && <hr></hr>}
                                    </>)
                            })}
                        </div>
                    }
                    {SearchResults.albums.length > 0 &&
                        <div className='albumsResults'>
                            <h3 className='ResultsHead'>Albums </h3>
                            {SearchResults.albums.map((album, index) => {
                                return (
                                    <><Album
                                        name={album.name}
                                        artist={album.artist}
                                        cover_img={album.coverImg}
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