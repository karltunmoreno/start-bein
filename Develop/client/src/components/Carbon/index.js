import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Thermostat from "../Thermostat/index.js";
// import "bootstrap/dist/css/bootstrap.min.css";
import coverImage from "../../assets/images/logo370.png";

// Do something else...

//api call here
//  curl -i "http://api.waqi.info/feed/shanghai/?token=demo"

// {
//    status: "ok",
//    data: {
//       aqi: 70,
//       time: {
//          s: "2022-06-01 09:00:00"
//       }
//       city: {
//          name: "Shanghai",
//          url: "http://aqicn.org/city/shanghai/",
//          geo: [
//             "31.2047372",
//             "121.4489017"
//          ]
//       }
//       iaqi: {
//          pm25: "..."
//       }
//    }
// }
//.then(data)

//});

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
    </section>
  );
}

//ReactDOM.render(<App />, document.getElementById("root"));

export default Carbon;
