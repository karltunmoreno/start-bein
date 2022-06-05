import React from 'react'
import classes from "./VolunteerInfo.module.css"
export default function VolunteerInfo({firstName, lastName,username,email,address,state,city,date,chosenVoluntary}) {
  return (
    <div className={classes.container}>
        <p><span><strong>{firstName} {lastName}</strong></span></p>
        <br></br>
        <p>Email: <span>{email}</span></p>
        <br></br>
        <p>Zip: <span>{address}</span></p>
        <br></br>
        <p>State: <span>{state}</span></p>
        <br></br>
        <p>City: <span>{city}</span></p>
        <br></br>
        <p>Volunteer Date: <span>{date}</span></p>
        <br></br>
        <p>Volunteer Option: <span>{chosenVoluntary}</span></p>
    </div>
  )
}
