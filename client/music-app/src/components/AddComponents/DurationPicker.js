import React, { useState } from 'react';
import './DurationPicker.css'

function DurationPicker(props) {

    const [length, setLength] = useState();

    function updateLength(e) {

    }


    return (
        <>
            <spn className='durationPickerRow'>
                <label>Length:</label>
                <input required onChange={(e) => updateLength(e)} placeholder='m' className='durationMinInput'></input>
                <span> : </span>
                <input required onChange={(e) => updateLength(e)} placeholder='s' className='durationSecInput'></input>
            </spn>
        </>
    );
}

export default DurationPicker;