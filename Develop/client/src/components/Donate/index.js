//IMPORT ANY IMAGES- ADD THE SRC ATTRIBUTE OF {COVERIMAGE}
//IMPORT ANOTHER FEATURE IMAGE "../../assets/cover/0.jpg";
//MAKING A NEW REACT COMPONENT FOR THE GALLERY SECTION 1ST IMPORT 2ND FUNCTIONS 3RD EXPORT

var PUBLISHABLE_KEY = 'pk_test_51L5a1JAV5DZ272v6aivRqlIrY1AA7PZhv5onXBQZKOWUSKPOKKqVM65sdd7t4mn5knpgvraQOUXpd8oqah8ZAFyT001DppRZJi';
var DOMAIN = location.href.replace(/[^/]*$/, '');

var stripe = Stripe(PUBLISHABLE_KEY);
var handleResult = function (result) {
  if (result.error) {
    var errDis = document.getElementById('error-message');
    errDis.textContent = result.error.message;
  }
};

// document.querySelectorAll('button').forEach(function (button) {
//     button.addEventListener('click', )
// })

function stripeCheckout(e) {
  console.log('line 14');
  var mode = e.target.dataset.checkoutMode;
  var priceId = e.target.dataset.priceId;
  var items = [{ price: priceId, quantity: 1}];
  console.log('stripe', stripe);
  stripe
    .redirectToCheckout({
        mode: mode,
        lineItems: items,
        successUrl:
            DOMAIN + 'success.html?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl:
            DOMAIN + 'canceled.html?session_id={CHECKOUT_SESSION_ID}'
    })
    .then(handleResult);
}

// DONATE SET-UP AS THE PARENT TO DONATELIST

function Donate(props) {
  const { currentCategory } = props;
  return (
    <section>
        <div className="donatehero">
          <h1> Start changing the world step by step!</h1>
        </div>
        <div className="donosection">
          <h2>Make your donation.</h2>
          <div className="donos">
            <button id="5dono" data-checkout-mode="payment" data-price-id="price_1L5elJAV5DZ272v6oqn2jDAA" onClick={stripeCheckout}>$5 Donation!</button>
            <button id="10dono" data-checkout-mode="payment" data-price-id="price_1L5wa8AV5DZ272v6x3qqTTSU" onClick={stripeCheckout}>$10 Donation!</button>
            <button id="50dono" data-checkout-mode="payment" data-price-id="price_1L5wcXAV5DZ272v6TOtIsjVg" onClick={stripeCheckout}>$50 Donation!</button>
          </div>
          <div id="error-message"></div>
        </div>
    </section>
  );
}

export default Donate;