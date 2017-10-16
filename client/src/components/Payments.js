import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
    // currency is in USD, amount is in cents (5 USD)
    // token is sent by stripe
    return (
      <StripeCheckout
        name="Surveyly"
        description="$5 for 5 survey credits"
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default Payments;