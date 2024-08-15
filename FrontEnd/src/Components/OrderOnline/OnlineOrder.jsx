import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("https://restaurant-management-system-jpbc.onrender.com/api/menu");
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

      alert(dish.name + " added to the cart.")
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
    <div className="onlineOrderMenuBox">
      <div className="onlineOrderMenu-grid">
        {menuList.length > 0 ? (
          menuList.map((dish, i) => (
            <div key={i} className="gridMenu-item">
              <div className="imageMenu-box">
                <img
                  src={`data:image/jpeg;base64,${dish.image}`}
                  alt={dish.name}
                  className="imageMenu-img"
                />
              </div>
              <div className="item-data">
                <h6 className="item-name">{dish.name}</h6>
                <p className="item-price">
                  Price: {dish.price}$
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button onClick={() => handleQuantityChange(dish._id, -1)} className="qty-btn">
                    -
                  </button>
                  <p className="qty-value">
                    {selectedItems[dish._id]?.quantity || 0}
                  </p>
                  <button onClick={() => handleQuantityChange(dish._id, 1)} className="qty-btn">
                    +
                  </button>
                </div>
              </div>

              <div className="cartBox">
                <button className="cartButton" style={{background: "linear-gradient(45deg, #ff6b6b, #f06595, #cc5de8)", color: "white" }}
                  onClick={() => handleCartButton(dish)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="noData">
            No dishes
          </h2>
        )}
      </div>

    </div>
  );
};

export default OnlineOrder;
