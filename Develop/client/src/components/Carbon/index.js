import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Thermostat from "../Thermostat/index.js";
// import "bootstrap/dist/css/bootstrap.min.css";
import coverImage from "../../assets/images/logo370.png";
import Form from '../Form/index';

// import coverImage from "../../assets";
{/* < img src={coverImage} className="my-2" style={{ width: "100%", opacity: 0.4 }} alt="purple water lily" /> */ }
function Carbon() {
  return (
    <section className="abouthero">
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
