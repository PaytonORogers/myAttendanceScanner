import './Attendance.css';
import React, { useState } from "react";



function Attendance() {

  function handleClick(test) {
    console.log(test)
    return
  }

  return (
    <>
      <div className="
      login-header 
      flex 
      flex-col 
      justify-self-center 
      gap-50 
      text-align-center 
      mt-25">
        <h2>Class Name</h2>
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
        <input type="text" name="cac" placeholder="CAC data..." onSubmit={handleClick("text")}></input>
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
        block"
          onClick={handleClick("button")}>Submit</button>
      </div>
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