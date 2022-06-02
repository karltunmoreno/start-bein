import React from 'react'
import classes from "./VolunteerInfo.module.css"
export default function VolunteerInfo({firstName, lastName,username,email,address,state,city,date,chosenVoluntary}) {
  return (
    <div className={classes.container}>
        <p>first name: <span>{firstName}</span></p>
        <p>last name: <span>{lastName}</span></p>
        <p>username: <span>{username}</span></p>
        <p>Email: <span>{email}</span></p>
        <p>Zip: <span>{address}</span></p>
        <p>State: <span>{state}</span></p>
        <p>City: <span>{city}</span></p>
        <p>Date: <span>{date}</span></p>
        <p>Volunteer Option: <span>{chosenVoluntary}</span></p>
    </div>
  )
}
