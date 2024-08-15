import React from "react";
import { Grid, Typography, Button } from "@mui/material";
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
    <div style={{ marginTop: "15px" }}>
      <Typography
        sx={{ textAlign: "center", marginBottom: "10px", color: "black" }}
        variant="h4"
      >
        Cart Items
      </Typography>
      <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
        {Object.keys(cart).length > 0 ? (
          Object.values(cart).map((dish, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={2.5}
              sx={{
                border: "1px solid black",
                padding: "10px",
                borderRadius: "8px",
                background: "white",
                boxShadow: 3,
                overflow: "hidden",
                height: "auto",
                maxHeight: "400px",
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ height: "auto", width: "100%" }}
              >
                <img
                  src={`data:image/jpeg;base64,${dish.image}`}
                  alt={dish.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </Grid>

              <Grid item sx={{ textAlign: "center", marginTop: "10px" }}>
                <Typography
                  variant="h6"
                  sx={{ color: "black", marginBottom: "8px" }}
                >
                  {dish.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "black" }}>
                  Price for {dish.quantity} Quantity: $
                  {dish.price * dish.quantity || 0}
                </Typography>
              </Grid>
              <div style={{ textAlign: "center" }}>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => deleteCartItem(dish._id)}
                  sx={{ marginTop: "15px" }}
                >
                  Remove Item
                </Button>
              </div>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: "20px", color: "black" }}
          >
            Add Items in Cart.
          </Typography>
        )}
      </Grid>
      <Typography
        sx={{ marginTop: "20px", color: "black", textAlign: "center" }}
        variant="h5"
      >
        Total Order Amount: ${totalDisplay}
      </Typography>

      <div className="btnCheckout" style={{justifyContent: 'center', marginTop: '10px'}}>
        <button
          style={{
            background: "linear-gradient(45deg, #ff6b6b, #f06595, #cc5de8)",
            color: "white", // To ensure the text color is visible
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
