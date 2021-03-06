import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './Header.css';
import { useUserDetails, useUpdateUser } from '../UserContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom'


function Header() {

  const userDetails = useUserDetails()
  const updateUser = useUpdateUser()
  const history = useHistory()


  async function LogOut() {
    try {
      history.push('/')
      updateUser({})
      await axios.get('user/Logout')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div id='HeaderDiv'>
        <div className='userHeader'>
          {userDetails.name ?
            <>
              <Button onClick={LogOut} className='LogoutButton' variant="outline-success">Log out</Button>
              <span className='userWelcome'>Hey {userDetails.name}!</span>
            </>
            : <>
              <Link to={'/SignUp'}><Button className='signUpHeadButton' variant="outline-success">Sign Up</Button></Link>
              <Link to={'/LogIn'}><Button variant="outline-success">Log In</Button></Link>
            </>
          }
        </div>
        <h1 className="pageTitle">Music App</h1>
        <div id='navBar'>
          <Link to={'/'}><Button variant="outline-success">Feed</Button></Link>
          <Link to={'/SearchPage'}><Button variant="outline-success">Search</Button></Link>
          {userDetails.name &&
            <Dropdown className='dropdwon'>
              <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                Add
                        </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link to={'/AddSong'}><Dropdown.Item href='#action'>Song</Dropdown.Item></Link>
                <Link to={'/AddArtist'}><Dropdown.Item href='#action'>Artist</Dropdown.Item></Link>
                <Link to={'/AddAlbum'}><Dropdown.Item href='#action'>Album</Dropdown.Item></Link>
                <Link to={'/AddPlaylist'}><Dropdown.Item href='#action'>Playlist</Dropdown.Item></Link>
              </Dropdown.Menu>
            </Dropdown>
          }
          {userDetails.name &&
            <Dropdown className='LibraryDropdwon'>
              <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                Library
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link to={`/UserSongs?user=${userDetails.id}`}><Dropdown.Item href='#action'>My Song</Dropdown.Item></Link>
                <Link to={`/UserPlaylists?user=${userDetails.id}`}><Dropdown.Item href='#action'>My Playlist</Dropdown.Item></Link>
              </Dropdown.Menu>
            </Dropdown>
          }

        </div>
      </div>
    </>
  );
}

export default Header;