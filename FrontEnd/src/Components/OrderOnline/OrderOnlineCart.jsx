import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderOnlineCart = () => {
  useEffect(() => {
    document.body.style.display = "block";
    const rootElement = document.getElementById("root");
    rootElement.classList.add("rootFullWidth");
    return () => {
      document.body.style.display = "flex";
      rootElement.classList.remove("rootFullWidth");
    };
  }, []);

  const [cart, setCart] = useState({});
  const [totalAmount, setTotalAmount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || {};
    console.log(storedCartItems);
    setCart(storedCartItems);
  }, []);

  useEffect(() => {
    const calculateTotalCartAmount = () => {
      let totalAmount = 0;
      for (const dish of Object.values(cart)) {
        totalAmount += dish.quantity * dish.price;
      }
      setTotalAmount(totalAmount);
    };

    calculateTotalCartAmount();
  }, [cart]);

  const handleCheckoutForm = () => {
    if (Object.keys(cart).length > 0) {
      navigate("/order-checkout", { state: { cart, totalAmount } });
    } else {
      alert(
        "There's no item added in cart. To proceed please add items in cart."
      );
    }
  };

  const deleteCartItem = (id) => {
    const getCart = { ...cart };

    delete getCart[id];

    setCart(getCart);

    localStorage.setItem("cart", JSON.stringify(getCart));
  };

  const totalDisplay =
    typeof totalAmount === "number" && !isNaN(totalAmount)
      ? totalAmount.toFixed(2)
      : "0.00";

  return (
    <div className="cartContainer">
      <h2 className="cartHeading">
        Cart Items
      </h2>
      <div className="onlineOrderMenu-grid">
        {Object.keys(cart).length > 0 ? (
          Object.values(cart).map((dish, index) => (
            <div key={index} className="gridMenu-item">
              <div className="imageMenu-box">
                <img
                  src={`data:image/jpeg;base64,${dish.image}`}
                  alt={dish.name}
                  className="imageMenu-img"
                />
              </div>

              <div className="item-data">
                <h6 className="item-name">
                  {dish.name}
                </h6>
                <p className="item-price">
                  Price for {dish.quantity} Quantity: $
                  {dish.price * dish.quantity || 0}
                </p>
              </div>
              <div className="deleteCartBox">
                <button className="deleteCartButton" onClick={() => deleteCartItem(dish._id)}>
                  Remove Item
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3
            sx={{ textAlign: "center", marginBottom: "20px", color: "black" }}
          >
            Add Items in Cart.
          </h3>
        )}
      </div>
      <h2
        style={{ marginTop: "20px", color: "black", textAlign: "center" }}>
        Total Order Amount: ${totalDisplay}
      </h2>

      <div className="btnCheckout" style={{justifyContent: 'center', marginTop: '10px'}}>
        <button
          style={{
            background: "linear-gradient(45deg, #ff6b6b, #f06595, #cc5de8)",
            color: "white",
          }}
          className="CheckoutBtn"
          onClick={handleCheckoutForm}
        >
          Checkout Form
        </button>
      </div>
    </div>
  );
};

export default OrderOnlineCart;
