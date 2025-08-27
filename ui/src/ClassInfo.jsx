import React from 'react'
import { useParams } from 'react-router-dom' 
import { useEffect, useState } from 'react';


function ClassInfo() {
    const [classInfo, setClassInfo ] = useState();
    const params = useParams();

    useEffect(() => {
        fetch(`http://${import.meta.env.VITE_API_HOST}/classes/${params.id}`)
        .then(res => res.json())
        .then(data => setClassInfo(data))
    }, [])

    return (
        
    <>
    {classInfo && 
    <h1>{classInfo[0].class_title}</h1>
    }
        <h1>ClassInfo</h1>
    </>        
    )
}

export default ClassInfo