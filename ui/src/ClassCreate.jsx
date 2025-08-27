import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassInfo from './ClassInfo'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ClassCreate() {
    const navigate = useNavigate();
    const [className, setClassName] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());


    async function handleClick(className) {
        const newClass = `/${className}`;
        await navigate(newClass)
        return (
            <>
                <Route path={newClass} element={<ClassInfo />} />
            </>
        )
    };

    return (
        <>
            <h1>Create Your Class</h1>
            <br />
            <div>
                <span>
                    <input type='text'
                        id='NameOfClass'
                        name='NameofClass'
                        placeholder="Name of Class goes here"
                        onInput={(e) => {
                            setClassName(e.target.value)
                        }}
                    /> &nbsp;

                    <button type="button" onClick={handleClick}>
                        Submit
                    </button>

                    <DatePicker
                        showIcon
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                    />

                </span>
            </div>
        </>
    )
}

export default ClassCreate