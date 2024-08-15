import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Fab from '@mui/material/Fab';

const OnlineOrder = () => {
  useEffect(() => {
    document.body.style.display = "block";
    const rootElement = document.getElementById("root");
    rootElement.classList.add("rootFullWidth");
    return () => {
      document.body.style.display = "flex";
      rootElement.classList.remove("rootFullWidth");
    };
  }, []);

  const [menuList, setMenuList] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();

  const fetchMenu = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/menu");
      const data = await response.json();
      const fetchDishes = data.flatMap((menu) => menu.dishes || []);
      setMenuList(fetchDishes);
      console.log(fetchDishes);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setSelectedItems(JSON.parse(storedCartItems));
    }
    fetchMenu();
  }, []);

  const handleCartButton = (dish) => {
    const itemData = selectedItems[dish._id];
    if (itemData && itemData.quantity > 0) {
      const itemsUpdate = {
        ...selectedItems,
        [dish._id]: {
          ...dish,
          quantity: selectedItems[dish._id]?.quantity || 0,
        },
      };
      setSelectedItems(itemsUpdate);
      localStorage.setItem("cart", JSON.stringify(itemsUpdate));
    } else {
      alert("Quantity has to be more than zero.");
    }
  };

  const handleQuantityChange = (idDish, changeQty) => {
    setSelectedItems((prev) => {
      const currItem = prev[idDish] || { quantity: 0 };
      const qtyNew = Math.max(currItem.quantity + changeQty, 0);
      const updatedItem = { ...currItem, quantity: qtyNew };

      return {
        ...prev,
        [idDish]: updatedItem,
      };
    });
  };

  const viewCart = () => {
    navigate("/order-cart");
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Fab color="primary" style={{float: 'right', position: 'fixed', zIndex: '1000'}} aria-label="add" onClick={viewCart}>
        <ShoppingCartIcon />
      </Fab>
      
      <Grid container justifyContent={"center"} rowGap={2} columnGap={2}>
        {menuList.length > 0 ? (
          menuList.map((dish, i) => (
            <Grid
              item
              key={i}
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
                  Price: {dish.price}$
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    onClick={() => handleQuantityChange(dish._id, -1)}
                    variant="outlined"
                    sx={{ margin: "0 5px" }}
                  >
                    -
                  </Button>
                  <Typography
                    variant="body1"
                    sx={{ color: "black", margin: "0 10px" }}
                  >
                    {selectedItems[dish._id]?.quantity || 0}
                  </Typography>
                  <Button
                    onClick={() => handleQuantityChange(dish._id, 1)}
                    variant="outlined"
                    sx={{ margin: "0 5px" }}
                  >
                    +
                  </Button>
                </div>
              </Grid>

              <Grid
                container
                item
                justifyContent="center"
                sx={{ marginTop: "10px" }}
              >
                <Button
                  style={{
                    background:
                      "linear-gradient(45deg, #ff6b6b, #f06595, #cc5de8)",
                    color: "white", // To ensure the text color is visible
                  }}
                  onClick={() => handleCartButton(dish)}
                >
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ color: "black", textAlign: "center" }}>
            No dishes
          </Typography>
        )}
      </Grid>

    </div>
  );
};

export default OnlineOrder;
