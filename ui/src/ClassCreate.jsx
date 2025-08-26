import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import ClassInfo from './ClassInfo'




function ClassCreate() {
    const navigate = useNavigate();
    const [className, setClassName] = useState('');



    async function handleClick(className) {
        console.log(className)

        var newClass = `/${className}`

        console.log(newClass)
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
                    <input type='text' id='NameOfClass' name='NameofClass' placeholder="Name of Class goes here"
                        onInput={(e) => {
                            setClassName(e.target.value)
                            console.log(className)
                        }}
                    /> &nbsp;
                    <button type="button" onClick={handleClick}>Submit</button>
                </span>
            </div>
        </>
    )
}

export default ClassCreate