import React from "react";

function Footer() {
  return (
    <div className="mt-auto">
      <footer className="d-flex justify-content-around p-2">
        <h4 className="my-auto text-center fw-bold">REACH OUT!</h4>

        <br></br>
        <br></br>
        <h5>❤️ Made with UM love.</h5>
        <ul className="list-inline my-auto text-center">
          <li className="list-inline-item fw-bold">
            <a className="text-dark" target="_blank" rel="noreferrer" href="">
              GitHub
            </a>
          </li>
          <li className="list-inline-item fw-bold">
            <a className="text-dark" target="_blank" rel="noreferrer" href="">
              LinkedIn
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
