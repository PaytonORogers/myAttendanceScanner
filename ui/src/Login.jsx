import './Login.css'
import { useEffect, useState } from 'react'
import bcrypt from "bcryptjs";

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [hashedPassword, setHashedPassword] = useState("")

  function handleSignUp() {
    bcrypt.hash(password, 12, function (err, hash) {
      if (err) {
        console.log(err)
      } else {
        setHashedPassword(hash)
      }
      const instructorToAdd = { 'username': username, 'hashed_password': hash };
      fetch("http://localhost:8080/instructor_login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(instructorToAdd)
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(errorData => {
              throw new Error(errorData.message);
            });
          } else {
            return res.json();
          }
        })
        .then(data => {
          console.log("Instructor Added", data);
          alert("Instructor Added")
        })
      // API CALL HERE
      //API push with username and password here to add to instructor DB
      //Probably error checking to see if username is already in DB?
      //Stretch goal of letting users reset passwords somehow, i don't wanna setup an email service tho lol
    });
    return
  }

  function handleSubmit() {
    if (!username || !password) {
      alert("Please enter username and password");
    }
    fetch(`http://localhost:8080/instructors/username/${username}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Username not found");
        } else {
          return res.json();
        }
      })
      .then(instructor => {
        console.log(instructor)
        // hashedPassword needs to be an API call to DB for username's hashedpassword
        bcrypt.compare(password, hashedPassword, function (err, result) {
          if (err) {
            console.error("Error comparing passwords:", err);
          } else {
            console.log("Password match:", result);
            if (!result) {
              alert("Incorrect Password!")
            } else {
              //ADD ROUTING HERE
            }
          }
        });
      });
    return
  }
  return (
    <>
      <div className="login-header flex justify-self-center gap-50 text-align-center mt-25">
        <h2>myAttendanceScanner</h2>
      </div>
      <div className="login-page bg-white dark:bg-gray-800 gap-y-3 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 mt-50">
        <h1>Login:</h1>
        <input type="email" name="email" placeholder="Enter Email" onChange={e => setUsername(e.target.value)}></input>
        <input type="password" name="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}></input>
        <div className="grid grid-cols-1 content-center gap-1">
          <button className="bg-white text-gray-700 border border-gray-300 
            rounded-md px-3 py-1 text-sm font-medium 
            shadow-sm hover:bg-gray-50 hover:border-gray-400 
            active:bg-gray-100 transition-all 
            ml-auto block place-self-start"
            onClick={() => handleSignUp()}>Sign Up</button>
          <button className="bg-white text-gray-700 border border-gray-300 
            rounded-md px-3 py-1 text-sm font-medium 
            shadow-sm hover:bg-gray-50 hover:border-gray-400 
            active:bg-gray-100 transition-all 
            ml-auto block place-self-end"
            onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Login