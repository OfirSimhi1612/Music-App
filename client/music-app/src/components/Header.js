import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './Header.css';

function Header(props) {


    return (
        <>
            <div id='HeaderDiv'>
                <h1 className="pageTitle">Music App</h1>
                <div id='navBar'>
                    <NavLink to={'/'}><Button variant="outline-success">Feed</Button></NavLink>
                    {/* <Link to={'/'}><Button variant="outline-success">My Songs</Button></Link>
                    <Link to={'/'}><Button variant="outline-success">My Playlists</Button></Link> */}
                    <Link to={'/SearchPage'}><Button variant="outline-success">Search</Button></Link>
                    <Dropdown className='dropdwon'>
                        <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                            Add
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to={'/AddSong'}><Dropdown.Item href="#/action-1">Song</Dropdown.Item></Link>
                            <Link to={'/AddArtist'}><Dropdown.Item href="#/action-2">Artist</Dropdown.Item></Link>
                            <Link to={'/AddAlbum'}><Dropdown.Item href="#/action-3">Album</Dropdown.Item></Link>
                            <Link to={'/AddPlaylist'}><Dropdown.Item href="#/action-3">Playlist</Dropdown.Item></Link>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link to={'/'}><Button variant="outline-success">Log In</Button></Link>
                </div>
            </div>
        </>
    );
}

export default Header;