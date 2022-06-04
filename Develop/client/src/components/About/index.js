//PUT THIS INDEX.JS FILE IN SRC/ASSETS/COMPONENTS/<Yourcomponent> TO SET-UP A NEW REACT COMPONENT 1ST=IMPORT 2ND=FUNCTIONS 3RD=EXPORT ----> DON'T FORGET TO CAPITALIZE THE FIRST LETTER TO SIGNIFY THE REACT COMPONENT
// import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import React, { useState } from 'react';

//MUST IMPORT VALIDATE HELPER
import { validateEmail } from '../../utils/helpers';

import { useQuery } from '@apollo/client';
import { QUERY_STARTBEINS } from '../../utils/queries';

function About() {
    //USEQUERY HOOK TO MAKE QUERY REQUEST
    const { loading, data } = useQuery(QUERY_STARTBEINS);
    //GET THE STARTBEIN OUT OF THE QUERY
    const startbeins = data?.startbeins || [];
    console.log(startbeins);

    return (
        <section>
            <h1 id="about">Who are we?</h1>
            <p className="abouttext">A CONTRIBUTORS BLOG . Time to make the world a better place now and for the future. Contribute your comments and sign up to take action. This community environment ignites same like minded individuals to engage and find solutions for the earth. Start bein to change the world one bein in time!</p>

            <main>

                <div className="abouthero">
                    <div className='flex-row justify-space-between'>
                        <div className='col-12 mb-3'>{/* PRINT STARTBEIN LIST */}</div>
                    </div>

                </div>
            </main>
        </section>
    );
}

function ContactForm() {
    //DECLARE FUNCTIONS VIA EXPRESSIONS
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [errorMessage, setErrorMessage] = useState('');
    //DESTRUCTURE FORMSATE OBJECT INTO ITS NAMED PROPERTIES-NAME-EMAIL& MESSAGE AND MAKE THE NAME PROPERTY A DYNAMIC VARIABLE DETERMINED BY THE FORM
    const { name, email, message } = formState;
    //DESTRUCTURE FORMSATE OBJECT INTO ITS NAMED PROPERTIES-NAME-EMAIL& MESSAGE AND MAKE THE NAME PROPERTY A DYNAMIC VARIABLE DETERMINED BY THE FORM

    // DECLARE FUNCTION TO SUBMIT DATA LEAVE FOR BACKEND DEV TO PICK UP
    function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
    };

    const handleChange = (e) => {
        //VALIDATION FUNCTION GOES HERE IN THE BEGINNING
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            console.log(isValid);
            //ISVALID CONDITIONAL STATEMENT
            if (!isValid) {
                setErrorMessage('Oops, your email is invalid.');
            } else {
                setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required`);
            } else {
                setErrorMessage('');
            }
        }
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
            console.log('Handle Form', formState);
        }
    };

    return (
        <section>
            <h1 data-testid="contact"> Contact me</h1>
            {/* ASSIGN FUNCTION TO SUBMIT DATA */}
            <form id="contact-form" onSubmit={handleSubmit}>
                {/* ADD THE DEFAULT VALUE TO EACH FORM ELEMENT HANDLING FORM DATA TO ASSIGN INITIAL STATE VALUES FOR RECORD IN THE DOM */}
                <div>
                    <label htmlFor="name">Name:</label>
                    {/*ASSIGN A FUNCTION, HANDLECHANGE, TO THE ADDED ATTRIBUTE ONCHANGE TO <INPUT> ELEMENT FOR NAME*/}
                    <input type="text" defaultValue={name} onBlur={handleChange} name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email address:</label>
                    <input type="email" defaultValue={email} name="email" onBlur={handleChange} />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea name="message" defaultValue={message} onBlur={handleChange} rows="5" />
                </div>
                {errorMessage && (
                    <div>
                        < p className="error-text">{errorMessage}</p>
                    </div>
                )}
                <button data-testid="button"
                    type="submit">Submit</button>
            </form>

        </section>
    );
}

export default About;