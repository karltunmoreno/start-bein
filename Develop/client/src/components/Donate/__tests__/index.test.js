//THIS FILE GOES INTO EACH SRC/COMPONENTS/COMPONENTNAME-PASCALCASE/__TESTS__/INDEX.TEST.JS-THIS ONE IS FOR THE COMPONENT SECTION

//IMPORT THE REACT TESTING LIBRARY


//IMPORT THE JEST-DOM PACKAGE


//IMPORT THE COMPONENT


const a = { name: "xyz", description: "abc xyz " };

//CONFIGURE THE TEST ENV BY CALLING CLEANUP() VIA AFTEREACH GLOBAL FUNCTION FROM JEST


//DECLARE THE COMPONENT BEING TESTED VIA DESCRIBE()
describe('Donate is rendering', () => {
    //RENDERS COMPONENT TEST
    it('renders', () => {
        render(<Donate currentCategory={a} />);
    });

    //CREATE A TEST CASE TO COMPARE SNAPSHOTS OF THE DOM NODE STRUCTURE- HERE INSIDE THE DESCRIBE CALLBACK FUNCTION BODY- BENEATH THE RENDER TEST
    it('matches snapshot DOM node stucture', () => {
        //RETURN THE SNAPSHOT
        const { asFragment } = render(<Donate currentCategory={a} />);
        //COMPARE - CONTRAST W/ GOAL TO MATCH
        expect(asFragment()).toMatchSnapshot();
    })

    //TEST TO CHECK THE TITLE
    it('renders', () => {
        const { getByTestId } = render(<Donate currentCategory={business} />)
        expect(getByTestId('h1tag')).toHaveTextContent('Business-finance')
    })

})
