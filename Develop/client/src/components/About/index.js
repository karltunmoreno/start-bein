//PUT THIS INDEX.JS FILE IN SRC/ASSETS/COMPONENTS/<Yourcomponent> TO SET-UP A NEW REACT COMPONENT 1ST=IMPORT 2ND=FUNCTIONS 3RD=EXPORT ----> DON'T FORGET TO CAPITALIZE THE FIRST LETTER TO SIGNIFY THE REACT COMPONENT
// import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import coverImage from "../../assets/cover/cover-image.jpg";

function About() {
    return (
        <section>
            <h1 id="about">Who are we?</h1>
            <img src={coverImage} className="my-2" style={{ width: "100%", opacity: 0.4 }} alt="purple water lily" />
        </section>
    );
}

export default About;