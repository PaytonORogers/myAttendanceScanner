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
      // API CALL HERE
      //API push with username and password here to add to instructor DB
      //Probably error checking to see if username is already in DB?
      //Stretch goal of letting users reset passwords somehow, i don't wanna setup an email service tho lol
    });
    return
  }

  function handleSubmit() {
    // We need to check the username and password against the DB here
    // something like
    // is username in db
    // does salted password match username's password
    // if not present an error
    bcrypt.hash(password, 12, function (err, hash) {
      if (err) {
        console.log(err)
      } else {
        // hashedPassword needs to be an API call to DB for username's hashedpassword
        // API CALL HERE
        bcrypt.compare(password, hashedPassword, function (err, result) {
          if (err) {
            console.error("Error comparing passwords:", err);
          } else {
            console.log("Password match:", result);
            //if result true push user to the instructor page
            //ADD ROUTING HERE
          };
        });
      }
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