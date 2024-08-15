import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderOnlineCheckout = () => {
  useEffect(() => {
    document.body.style.display = "block";
    const rootElement = document.getElementById("root");
    rootElement.classList.add("rootFullWidth");
    return () => {
      document.body.style.display = "flex";
      rootElement.classList.remove("rootFullWidth");
    };
  }, []);

  const path = useLocation();
  const { cart, totalAmount } = path.state || {};
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    fullname: "",
    emailAdress: "",
    contact: "",
    address: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const { fullname, emailAddress, contact, address } = dataForm;

  if (!fullname || !emailAddress || !contact || !address) {
    alert("Please enter details in all fields.");
    return;
  }
    navigate("/order-payment", {
      state: {
        cart:Object.values(cart),
        totalAmount,
        dataForm,
      },
    });
  };

  const totalDisplay = typeof totalAmount === "number" && !isNaN(totalAmount) ? totalAmount.toFixed(2) : "0.00";

  return (
    <div className="onlineOrderMenuBox" style={{flexDirection: 'column', marginTop: 0}}>
      <h3 className="cartHeading">
        Enter Your Details
      </h3>

      <form onSubmit={submitForm} id="formBox" className="formBox">
        <div className="checkoutForm">
          <label className="formBoxLabel" htmlFor="fullname">Name</label>
            <input
            type="text"
              id="fullname"
              className="inputFields"
              name="fullname"
              required
              value={dataForm.fullname}
              onChange={inputChange}
            />
          </div>
          <div className="checkoutForm">
            <label className="formBoxLabel" htmlFor="emailAddress">Email Id</label>
            <input
              type="email"
              name="emailAddress"
              id="emailAddress"
              className="inputFields"
              required
              value={dataForm.emailAddress}
              onChange={inputChange}
            />
          </div>
          <div className="checkoutForm">
            <label className="formBoxLabel" htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              required
              name="contact"
              className="inputFields"
              id="contact"
              value={dataForm.contact}
              onChange={inputChange}
            />
          </div>
          <div className="checkoutForm">
            <label className="formBoxLabel" htmlFor="address">Address for Delivery</label>
            <textarea
              name="address"
              id="address"
              className="textareaField"
              required
              value={dataForm.address}
              onChange={inputChange}
              rows="4"
            />
          </div>

        <h3 className="items-list">
          Items list
        </h3>

        <div className="checkoutTable">
          {Object.values(cart || {}).length > 0 ? (
            <table className="formBoxTable">
              <thead className="formBoxHead">
                <tr className="formBoxTr">
                  <th className="formBoxTh">Item name</th>
                  <th className="formBoxTh">Quantity</th>
                  <th className="formBoxTh">Price</th>
                </tr>
              </thead>
              <tbody className="formBoxTbody">
                {Object.values(cart || {}).map((dish, index) => (
                  <tr className="formBoxTr" key={index}>
                    <td className="formBoxTd" style={{ color: "white" }}>
                      {dish.name}
                    </td>
                    <td className="formBoxTd" style={{ color: "white" }}>
                      {dish.quantity}
                    </td>
                    <td className="formBoxTd" style={{ color: "white" }}>
                      ${dish.price * dish.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 style={{ color: "black" }}>
              No Items
            </h3>
          )}
        </div>

        <h5 style={{ textAlign: "center", color: "black", marginTop: "20px" }}>
          Total Order Amount: ${totalDisplay}
        </h5>

        <div className="payNowBox">
          <button className="payNowButton" type="submit">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderOnlineCheckout;
