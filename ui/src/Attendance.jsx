import './Attendance.css';
import { useContext, useEffect, useState } from "react"
import { AppContext } from './App.jsx'
import { useParams, useNavigate } from 'react-router-dom';

function Attendance() {
  const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  const [attendees, setAttendees] = useState([])
  const [sheet, setSheet] = useState([])
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/")
    } else {
      fetch("http://localhost:8080/classes/attendees/" + params.id)
        .then(res => {
          if (!res.ok) throw new Error("Failed Again Playboy");
          return res.json();
        })
        .then(data => {
          setAttendees(data);
        });
      fetch("http://localhost:8080/classes/" + params.id)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch class name!");
          return res.json();
        })
        .then(data => {
          setSheet(data);
        })
    }
  }, []);

  useEffect(() => {
    console.log(sheet)
  }, [sheet])

  function handleClick(test) {
    console.log(test)
    return
  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />

      <div className="
      login-header 
      flex 
      flex-col 
      justify-self-center 
      gap-50 
      text-align-center 
      mt-25">
        <h2>{sheet.class_title}</h2>
        <h2>Sign in Sheet</h2>
      </div>
      <div className="
      login-page 
      bg-white 
      dark:bg-gray-800 
      rounded-lg 
      px-6 
      py-8 
      ring 
      shadow-xl 
      ring-gray-900/5 
      mt-50">
        <h1>Please Scan your CAC</h1>
        <br></br>
        <input className="bg-white text-gray-700 border border-gray-300 " type="text" name="cac" placeholder="CAC data..." onSubmit={handleClick("text")}></input>
        <button className="
        bg-white 
        text-gray-700 border 
        border-gray-300 
        rounded-md 
        px-3 
        py-1 
        text-sm 
        font-medium 
        shadow-sm 
        hover:bg-gray-50 
        hover:border-gray-400 
        active:bg-gray-100 
        transition-all 
        ml-auto 
        block
        mt-5"
          onClick={handleClick("button")}>Submit</button>
      </div>
      <table className="border w-2/3 mx-auto mt-10">
        <thead>
          <tr>
            <th className="border px-2 py-1">Rank</th>
            <th className="border px-2 py-1">First Name</th>
            <th className="border px-2 py-1">Last Name</th>
            <th className="border px-2 py-1">Branch</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <tr key={attendee.id} className="border">
              <td className="border px-2 py-1">{attendee.rank}</td>
              <td className="border px-2 py-1">{attendee.first_name}</td>
              <td className="border px-2 py-1">{attendee.last_name}</td>
              <td className="border px-2 py-1">{attendee.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Attendance

// var Title = React.createClass({
//     handleTest: function(e) {
//       if (e.charCode == 13) {
//         alert('Enter... (KeyPress, use charCode)');
//       }
//       if (e.keyCode == 13) {
//         alert('Enter... (KeyDown, use keyCode)');
//       }
//     },
//     render: function() {
//       return(
//         <div>
//           <textarea onKeyPress={this.handleTest} />
//         </div>
//       );
//     }
//   });