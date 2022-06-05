import React, { Fragment, useRef, useState } from "react";
import InputContainer from "./InputContainer";
import classes from "./page.module.css";
import "@rmwc/textfield/styles";
import "@rmwc/select/styles";
import "@rmwc/button/styles";
import { TextField } from "@rmwc/textfield";
import { Select } from "@rmwc/select";
import { Button } from "@rmwc/button";
import VolunteerInfo from "./VolunteerInfo";

export default function Page() {
  const [submits, setSubmits] = useState([]);
  const firstName = useRef(null),
    lastName = useRef(null),
    username = useRef(null),
    email = useRef(null),
    address = useRef(null),
    state = useRef(null),
    city = useRef(null),
    date = useRef(null);
  const [chosenVoluntary, setChosenVoluntary] = useState("");

  const submit = (e) => {
    e.preventDefault();
    console.log(submits);
    //let copy = [...submits]
    setSubmits([
      ...submits,
      {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        username: username.current.value,
        email: email.current.value,
        address: address.current.value,
        state: state.current.value,
        city: city.current.value,
        date: date.current.value,
        chosenVoluntary: chosenVoluntary,
      },
    ]);
  };
  return (
    <Fragment>
      <div className={classes.imageContainer}>
        <img src={require("./static/tree.png")} alt="tree" />
        <img src={require("./static/park.png")} alt="park" />
        <img src={require("./static/beach.jpg")} alt="beach" />
      </div>
      <main className={classes.mainContainer}>
        {" "}
        Welcome to the volunteer schedular! Here you can choose someething to
        contribute to and what day you would like to do it. Fill out the form to
        get started!
      </main>
      <div className={classes.Bottom}>
        <div className={classes.submitContainer}>
          {submits
            .map((m, i) => {
              return (
                <VolunteerInfo
                  key={i}
                  firstName={m.firstName}
                  lastName={m.lastName}
                  username={m.username}
                  address={m.address}
                  chosenVoluntary={m.chosenVoluntary}
                  city={m.city}
                  date={m.date}
                  email={m.email}
                  state={m.state}
                />
              );
            })
            .reverse()}
        </div>
        <div className={classes.right}>
          <form className={classes.form} id="voluntaryForm" onSubmit={submit}>
            <TextField
              className={classes.volunteer_sheet}
              required
              inputRef={firstName}
              outlined
              label="first name"
            />
            <TextField
              className={classes.volunteer_sheet}
              required
              inputRef={lastName}
              outlined
              label="last name"
            />
            <TextField
              className={classes.volunteer_sheet}
              required
              inputRef={username}
              outlined
              label="username"
            />
            <TextField
              className={classes.volunteer_sheet}
              required
              inputRef={email}
              outlined
              type="email"
              label="email"
            />
            <TextField
              className={classes.volunteer_sheet}
              required
              inputRef={address}
              outlined
              type="text"
              label="Zip Code"
            />
            <TextField
              className={classes.volunteer_sheet}
              required
              inputRef={state}
              outlined
              label="state"
            />
            <TextField
              className={classes.volunteer_sheet}
              required
              inputRef={city}
              outlined
              label="city"
            />
            <Select
              className={classes.volunteer_sheet}
              required
              value={chosenVoluntary}
              onChange={(evt) => setChosenVoluntary(evt.currentTarget.value)}
              label="Volunteer list"
              outlined
              options={[
                "Beach cleanups",
                "Park cleanups",
                "River cleanups",
                "Tree planting",
                "community gardening",
                "wild life conservation",
              ]}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextField
                className={classes.volunteer_sheet}
                required
                inputRef={date}
                outlined
                label="Volunteer date"
                type="date"
              />

              <Button
                className={classes.volunteer_sheet_button}
                form="voluntaryForm"
                label="Submit"
                type="submit"
                raised
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
