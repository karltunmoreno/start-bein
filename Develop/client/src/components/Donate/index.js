//IMPORT ANY IMAGES- ADD THE SRC ATTRIBUTE OF {COVERIMAGE}
//IMPORT ANOTHER FEATURE IMAGE "../../assets/cover/0.jpg";
//MAKING A NEW REACT COMPONENT FOR THE GALLERY SECTION 1ST IMPORT 2ND FUNCTIONS 3RD EXPORT



// DONATE SET-UP AS THE PARENT TO DONATELIST

function Donate(props) {
  const { currentCategory } = props;
  return (
    <section>
      <h1 data-testid="h1tag">{capitalizeFirstLetter(currentCategory.name)}</h1>
      <p>{currentCategory.description}</p>
      {/*PROP DRILL TO PASS DOWN THE currentCategoryname AS A PROP INTO THE XYZLIST COMPONENT FROM HERE- ITS PARENT COMPONENT RETURN STATEMENT*/}
      <DonateList category={currentCategory.name} />
    </section>
  );
}

export default Donate;