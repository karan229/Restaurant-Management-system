import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";

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

  const fetchMenu = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/menu");
      const data = await response.json();
      const fetchDishes = data.flatMap((menu) => menu.dishes || []);
      setMenuList(fetchDishes);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

const handleQuantityChange = (idDish, onChange) => {
    setSelectedItems((prev) => {
      const newQuantity = (prev[idDish] || 0) + onChange;
      return {
        ...prev,
        [idDish]: Math.max(newQuantity, 0)
      };
    });
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Grid container justifyContent={"center"} rowGap={2} columnGap={2}>
        {menuList.length > 0 ? (
          menuList.map((dish, i) => (
            <Grid
              item
              key={i}
              xs={12}
              sm={6}
              md={4}
              lg={2.5} // Adjusted to fit more content on larger screens
              sx={{
                border: "1px solid black",
                padding: "10px",
                borderRadius: "8px",
                background: "white",
                boxShadow: 3,
                overflow: "hidden", 
                height: "auto", // Adjust this value to control the height
                maxHeight: "400px", // Cap the maximum height
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ height: "auto", width: "100%" }}
              >
                <img
                  src="https://picsum.photos/200/300"
                  alt={dish.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }} // Adjust height and objectFit for responsiveness
                />
              </Grid>
              <Grid item sx={{ textAlign: "center", marginTop: "10px" }}>
                <Typography variant="h6" sx={{ color: "black", marginBottom: "8px" }}>
                  {dish.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "black" }}>
                  {dish.price}$
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                <Button
                  onClick={() => handleQuantityChange(dish._id, -1)}
                  variant="outlined"
                  sx={{ margin: '0 5px' }}
                >
                  -
                </Button>
                <Typography variant="body1" sx={{ color: 'black', margin: '0 10px' }}>
                  {selectedItems[dish._id] || 0}
                </Typography>
                <Button
                  onClick={() => handleQuantityChange(dish._id, 1)}
                  variant="outlined"
                  sx={{ margin: '0 5px' }}
                >
                  +
                </Button>
              </div>
              </Grid>

              <Grid container item justifyContent="center" sx={{ marginTop: "10px" }}>
                <Button variant="contained" color="primary">
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
