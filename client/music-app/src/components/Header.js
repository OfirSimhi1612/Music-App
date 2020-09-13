import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './Header.css';

function Header(props){


    return (
        <>
            <div id='HeaderDiv'>
                <h1 className="pageTitle">Music App</h1>
                <div id='navBar'>
                    <Button variant="outline-success">Feed</Button>
                    <Button variant="outline-success">My Songs</Button>
                    <Button variant="outline-success">My Playlists</Button>
                    <Dropdown className='dropdwon'>
                        <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                            Add
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Song</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Artist</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Album</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Playlist</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    );
}

export default Header;