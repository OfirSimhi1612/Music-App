import React from 'react'
import Draggable from 'react-draggable';
import './Video.css';
import Button from 'react-bootstrap/Button';


function Video(props){
    return(
        <>
        {props.src &&
            <Draggable>
                <div>
                    <Button variant="outline-danger" size='sm' onClick={props.closeVideo}>close</Button>
                    <div className='container'>
                        <iframe width="360" height="200" 
                        src={props.src.replace('watch?v=', 'embed/')} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen></iframe>
                    </div>
            </div>
            </Draggable>
        }
        </>
    );
        
}

export default Video;