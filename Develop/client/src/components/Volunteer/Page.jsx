import React, { Fragment, useRef, useState } from 'react'
import InputContainer from './InputContainer'
import classes from "./page.module.css"
import '@rmwc/textfield/styles';
import '@rmwc/select/styles';
import '@rmwc/button/styles';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';
import VolunteerInfo from './VolunteerInfo';

export default function Page() {
    const [submits,setSubmits] = useState([]);
    const firstName = useRef(null), lastName= useRef(null),username= useRef(null),email= useRef(null),address= useRef(null),state= useRef(null),city= useRef(null),date= useRef(null);
    const [chosenVoluntary,setChosenVoluntary]= useState("");
  
    const submit = (e)=>{
        e.preventDefault();
        console.log(submits);
        //let copy = [...submits]
        setSubmits([...submits,{
            firstName:firstName.current.value,
             lastName:lastName.current.value,
             username:username.current.value,
            email:email.current.value,
            address:address.current.value,
            state:state.current.value,
            city:city.current.value,
            date:date.current.value,
            chosenVoluntary:chosenVoluntary
        }])
    }
    return (
    <Fragment>
        <div className={classes.imageContainer}> 
        <img src={require("../static/tree.png")} alt="tree" />
        <img src={require("../static/park.png")} alt="park" />
        <img src={require("../static/beach.jpg")} alt="beach" />


        </div>
        <main className={classes.mainContainer}> hello</main>
        <div className={classes.Bottom}>
            <div className={classes.submitContainer}>
                {submits.map((m,i)=>{
                    return <VolunteerInfo key={i} firstName={m.firstName} lastName={m.lastName}
                    username={m.username}
                    address={m.address}
                    chosenVoluntary={m.chosenVoluntary}
                    city={m.city}
                    date={m.date}
                    email={m.email}
                    state={m.state}
                    />
                }).reverse()}
            
                
                </div> 
            <div className={classes.right}>
                <form className={classes.form} id="voluntaryForm" onSubmit={submit}>
                <TextField required inputRef={firstName} outlined  label="first name"/>
                    <TextField required inputRef={lastName} outlined  label="last name"/>
                    <TextField required inputRef={username} outlined  label="username"/>
                    <TextField required inputRef={email} outlined type="email" label="email"/>
                    <TextField required inputRef={address} style={{width:"227px"}} outlined textarea type="text" label="Address"/>
                    <TextField required inputRef={state} outlined label='state' />
                    <TextField required inputRef={city} outlined label='city' />
                <div style={{gap:"10px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",width:"100%",alignItems:"center",padding:"10px"}}>
                <TextField required inputRef={date}  outlined label='Voluntary date' type="date"/>
                    <Select required value={chosenVoluntary}  onChange={(evt) => setChosenVoluntary(evt.currentTarget.value)} label="Voluntary list" outlined options={["Beach cleanups", "Park cleanups", "River cleanups", "Tree planting", "community gardening", "wild life conservation"]}/>
                </div></form>
                <Button form="voluntaryForm" label="Submit" type="submit" raised />
            </div>
        </div>

    </Fragment>
  )
}
