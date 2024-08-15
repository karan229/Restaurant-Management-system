// reference used for integration of payment gateway:
// https://www.npmjs.com/package/@stripe/react-stripe-js
// https://docs.stripe.com/stripe-js/react

import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PnkHeAmDb0gT9Fp2ei1SqwQHYf7kDc0loKvdFthmL3i7mE0XDmOSliYmUli5LX3ySbmpG0ypaJ7vvVUcLrdwI1400ZKbZDl2a"
);

const CheckoutForm = ({ amount, dataForm, cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    try {
      const res = await fetch("https://restaurant-management-system-jpbc.onrender.com/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }),
      });
      const data = await res.json();

      await fetch("https://restaurant-management-system-jpbc.onrender.com/online-order", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: dataForm.fullname,
          email: dataForm.emailAddress,
          address: dataForm.address,
          phoneNumber: dataForm.contact,
          totalAmount: amount,
          cart,
        }),
      });

      localStorage.removeItem("cart");

      alert("Order Placed. Thank you for Ordering!")

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: "http://localhost:3000",
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }

    } catch (error) {
      setErrorMessage("Error during payment.");
    }
  };

  return (
    <div style={{margin: '40px', textAlign: 'center'}}>
      <h1 style={{color: 'black'}}>Enter your Payment Details</h1>
    <form className="paymentForm" onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements} style={{marginTop: '10px'}}>
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
    </div>
  );
};

const PaymentPage = () => {
  const path = useLocation();
  const { cart, dataForm, totalAmount } = path.state;
  const filteredCart = cart.map((data) => ({
    name: data.name,
    quantity: data.quantity,
    price: data.price,
  }));

  useEffect(() => {
    document.body.style.display = "block";
    const rootElement = document.getElementById("root");
    rootElement.classList.add("rootFullWidth");

    return () => {
      document.body.style.display = "flex";
      rootElement.classList.remove("rootFullWidth");
    };
  }, []);

  console.log(Object.values(cart));

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    appearance: {},
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={totalAmount}
        cart={filteredCart}
        dataForm={dataForm}
      />
    </Elements>
  );
};

export default PaymentPage;
