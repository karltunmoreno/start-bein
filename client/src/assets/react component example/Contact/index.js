//IMPORT AN IMAGE FROM YOUR ASSETS FOLDER
// import coverImage from "../../assets/cover/cover-image.jpg"

//PUT THIS INDEX.JS FILE IN SRC/ASSETS/COMPONENTS/COMPONENTNAME TO MAKE A NEW REACT COMPONENT FOR THE SECTION 1ST=IMPORT 2ND=FUNCTIONS 3RD=EXPORT ----> DON'T FORGET TO CAPITALIZE THE 'first letter' BEC. IT USES PASCAL CASING TO SIGNIFY THE REACT COMPONENT
import React, { useState } from 'react';

//MUST IMPORT VALIDATE HELPER
import { validateEmail } from '../../utils/helpers';

//1. IMPORT USESTATE FROM REACT 2. DEFINE THE HOOK VIA AN EXPRESSION NEAR THE TOP OF THE FILE 3. CLEAR THE INPUT FIELDS ON THE COMPONENT LOADING VIA SETTING INITIAL STATE TO EMPTY STRINGS

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
            <h1 id="contact"> Contact Me!</h1>
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
                <button type="submit">Submit</button>
            </form>

        </section>
    );
}

export default ContactForm;