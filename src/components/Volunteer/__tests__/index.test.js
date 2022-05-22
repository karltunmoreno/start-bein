//THIS FILE GOES INTO EACH SRC/COMPONENTS/COMPONENTNAME-PASCALCASE/__TESTS__/INDEX.TEST.JS-THIS ONE IS FOR THE COMPONENT SECTION
import React from 'react';

//IMPORT THE REACT TESTING LIBRARY
import { render, cleanup } from '@testing-library/react';

//IMPORT THE JEST-DOM PACKAGE
import '@testing-library/jest-dom/extend-expect';

//IMPORT THE COMPONENT
import Gallery from '..';

const business = { name: "business-finance", description: "Digital asset tracker app; physical offices, a bank, and a medical project" };

//CONFIGURE THE TEST ENV BY CALLING CLEANUP() VIA AFTEREACH GLOBAL FUNCTION FROM JEST
afterEach(cleanup);

//DECLARE THE COMPONENT BEING TESTED VIA DESCRIBE()
describe('Gallery is rendering', () => {
    //RENDERS COMPONENT TEST
    it('renders', () => {
        render(<Gallery currentCategory={business} />);
    });

    //CREATE A TEST CASE TO COMPARE SNAPSHOTS OF THE DOM NODE STRUCTURE- HERE INSIDE THE DESCRIBE CALLBACK FUNCTION BODY- BENEATH THE RENDER TEST
    it('matches snapshot DOM node stucture', () => {
        //RETURN THE SNAPSHOT
        const { asFragment } = render(<Gallery currentCategory={business} />);
        //COMPARE - CONTRAST W/ GOAL TO MATCH
        expect(asFragment()).toMatchSnapshot();
    })

    //TEST TO CHECK THE TITLE
    it('renders', () => {
        const { getByTestId } = render(<Gallery currentCategory={business} />)
        expect(getByTestId('h1tag')).toHaveTextContent('Business-finance')
    })

})
