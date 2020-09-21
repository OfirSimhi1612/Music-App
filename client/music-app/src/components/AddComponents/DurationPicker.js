import React, { useState } from 'react';
import './DurationPicker.css'

function DurationPicker(props) {

    const [Length, setLength] = useState({ min: 0, sec: 0 });

    function updateLength(e) {

        const length = {
            ...Length,
            [e.target.id]: e.target.value
        }

        if (e.target.value < 10) {
            e.target.value = `0${e.target.value}`
        }

        setLength({ ...length })

        props.updateDetails('length', `00:${length.min >= 10 ? length.min : `0${length.min}`}:${length.sec >= 10 ? length.sec : `0${length.sec}`}`)

    }


    return (
        <>
            <spn className='durationPickerRow'>
                <label>Length:</label>
                <input type='number' min={0} max={59} id='min' required onChange={(e) => updateLength(e)} placeholder='m' className='durationMinInput'></input>
                <span> : </span>
                <input type='number' min={0} max={59} id='sec' required onChange={(e) => updateLength(e)} placeholder='s' className='durationSecInput'></input>
            </spn>
        </>
    );
}

export default DurationPicker;