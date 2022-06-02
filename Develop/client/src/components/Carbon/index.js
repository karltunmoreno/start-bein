import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Thermostat from "../Thermostat/index.js";
// import "bootstrap/dist/css/bootstrap.min.css";
import coverImage from "../../assets/images/logo370.png";
import Form from '../Form/index';


function Carbon() {
  return (
    <section className="my-5">
      <h1 id="about">Carbon</h1>
      <img
        src={coverImage}
        className="my-2"
        style={{ width: "10%" }}
        alt="cover"
      />
      <div className="my-2">
        <p>
          Contribute to making the world a better place to live. Together, lets
          lower emmissions and make the planet a more blue and cleaner place.
          <br></br>
          <p>//data.response//</p>
          <br></br>
        </p>
      </div>
      <div>
        <Form />
      </div>
    </section>
  );
}

//ReactDOM.render(<App />, document.getElementById("root"));

export default Carbon;
