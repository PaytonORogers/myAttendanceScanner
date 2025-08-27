import './Instructor.css';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from './App.jsx'
import { useNavigate } from 'react-router-dom';

function Instructor() {
  const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tempClasses = [];
    fetch("http://localhost:8080/classes/:username" + "")
  }, [])

  useEffect(() => {
    // setClasses to current inventory of atendeez (don't say it)
    // loop through to make list for render on table of classes
    console.log(newClassName)
  }, [newClassName])

  function handleSubmit() {
    // API call to create new atendeez (don't say it)
    // use navToAttend
    const classesToAdd = { 'newClassName': newClassName };
    fetch("http://localhost:8080/newClassName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(classesToAdd)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to create class");
        }
        return res.json();
      })
      .then(data => {
        console.log("Class Added", data);
        alert("Class added playboy");
        navToAttend(newClassName);
      })
  }

  function navToAttend(classID) {
    // routing to classID
    Navigate("")
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col border bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 mt-25 mb-25 ml-25 mr-5 w-400 h-auto">
        <h1 className="font-bold">Create new Attendance Sheet</h1>
        <br></br>
        <p>CAC Scan Enabled</p>
        {/* <ul>
          <li>
            <input type="checkbox" name="EDIPI" value="EDIPI" /> EDIPI
          </li>
          <li>
            <input type="checkbox" name="First Name" value="First Name" /> First Name
          </li>
          <li>
            <input type="checkbox" name="Middle Initial" value="Middle Initial" /> Middle Initial
          </li>
          <li>
            <input type="checkbox" name="Last Name" value="Last Name" /> Last Name
          </li>
          <li>
            <input type="checkbox" name="DOB" value="DOB" /> DOB
          </li>
          <li>
            <input type="checkbox" name="Personnel Category Code" value="Personnel Category Code" /> Personnel Category Code
          </li>
          <li>
            <input type="checkbox" name="Rank" value="Rank" /> Rank
          </li>
          <li>
            <input type="checkbox" name="Branch Code" value="Branch Code" /> Branch Code
          </li>
        </ul> */}
        <br></br>
        <p>Manual Entry</p>
        <ul>
          <li>
            <input type="checkbox" name="Email" value="Email" /> Email
          </li>
        </ul>
        <input className="bg-white rounded-lg shadow-xl text-black" type="text" name="course-input-name" placeholder="Course Name" onChange={e => setNewClassName(e.target.value)} />
        <button className="bg-white text-gray-700 border border-gray-300 
            rounded-md px-3 py-1 text-sm font-medium 
            shadow-sm hover:bg-gray-50 hover:border-gray-400 
            active:bg-gray-100 transition-all 
            ml-auto block mt-5"
          onClick={() => handleSubmit()}> Submit </button>
      </div>
      <div className="flex flex-col border bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 mt-25 mb-25 ml-5 mr-25 w-400 h-auto">
        <h1 className="font-bold">Previous Attendance Sheets</h1>
        <br></br>
        <table className="border">
          <thead>
            <tr>
              <th scope="colu">Previous Courses</th>
              <th scope="col">Class Attendance</th>
              <th scope="col">Date Added</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-violet-600 text-center border" onClick={() => navigate('/attendance/1')}>
              <td scope="rows" className="border">TCCC</td>
              <td scope="row" className="border">17/20</td>
              <td scope="row" className="border">17 July 2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Instructor

{/* 
Barcode Version	Read	1	1	“1” is 88 characters and does not have the middle initial. “N” is 89 characters, the last one being the MI.
Personal Designator Identifier	ReadNumber	2	6	Commonly the SSN, but can be a few others
Personal Designator Type	Read	8	1	“S” indicates the PDI is the SSN. There are others available, but I haven’t seen these in real life.
EDIPI	ReadNumber	9	7	A.K.A. the DoD ID number.
First Name	Read	16	20	First name up to 20 characters. As this pretty much always leaves extra room, there will be trailing spaces.
Last Name	Read	36	26	Last name up to 26 characters. Trailing spaces as before, but beware that surprises can come in the middle of last names so don’t add functions to strip spaces or non-letter characters from the middle.
Date of Birth	ReadDate	62	4	Number of days since 1/1/1000 to the person’s birth. Add some code to wish someone a happy birthday, or conditional formatting to color cells <21 for potential D.D.!
Personnel Category Code	Read	66	1	“A” = Active Duty, “N”, “G” = National Guard, “R” or “V” = Reserve, Several others available.
Branch Code	Read	67	1	“F” = Air Force, “A” = Army, “M” = Crayola Snacks, “N” = Navy
Personnel Entitlement Condition Type	Read	68	2	There’s 42 different results available in the spec, but everyone I’ve seen is “00” which means nothing.
Rank	Read	70	6	Abbreviated rank with trailing spaces. E-1..4 and O-1..2 are simply “AMN” and “LT”, respectively.
Pay Plan Code	Read	76	2	“ME” and “MO” are the most common I’ve seen, indicating Military Enlisted/Officer.
Pay Plan Grade Code	Read	78	2	Pay Grade. Taking chars 76-79 and doing a descending sort will automatically put lowest ranking to the bottom.
Card Issue Date	ReadDate	80	4	Number of days from 1/1/1000 to the date the card was issued. I’ve been recording this as a check value to determine if my program should refresh name/rank (so a change that drove a new card could be captured, without recalculating every field every time).
Card Expiration Date	ReadDate	84	4	Number of days from 1/1/1000 to the date the card will expire. You can use this as a trigger for cleanup/archiving, validating eligibility for whatever you do, or use conditional formatting to color the cell when the date approaches so you can remind your people before they get stuck off base.
Card Instance Identifier	Read	88	1	This is a randomly selected character which would change each time the person gets a new card. Suitable for triggering a refresh of locally saved fields, but because there’s less than 40 possible characters it’s not technically a guarantee of a unique entry, so I’m disinclined to rely on it.
Middle Initial (Version N only)	Read	89	1	The middle initial, if they have one. Those without will have a space, which sometimes gets trimmed by mistake so don’t get creative and use RIGHT(Barcode, 1). I ended up with a bunch of people having middle initials like “5”. 
*/}