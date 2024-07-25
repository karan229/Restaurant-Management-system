import React, { useEffect } from "react";

const Order = () => {
  useEffect(() => {

    document.body.style.display = "block";

    const rootElement = document.getElementById("root");
    rootElement.classList.add("rootFullWidth");

    return () => {

      document.body.style.display = "flex";
      
      rootElement.classList.remove("rootFullWidth");
    };
  }, []);

  return (
    <div className="restoPageContainer">

      <h1 className="titleResto">Home</h1>

      <section className="bannerImageResto">
        <img src="../assets/imgs/banner2.jpg" alt="Banner Image" />
      </section>

      <h1 className="featuredTitleText">Chef's Special</h1>
      
      <section className="foodItem">
      
        <div className="foodcard">
          <img src="../assets/imgs/featured1.jpg" alt="dish 1" />
          <h2>Burrito Bowl</h2>
          <p>Mexican dish</p>
        </div>
      
        <div className="foodcard">
          <img src="../assets/imgs/featured2.jpg" alt="dish 2" />
          <h2>Pav Bhaji</h2>
          <p>Indian Spicy Food</p>
        </div>
      
        <div className="foodcard">
          <img src="../assets/imgs/featured3.jpg" alt="dish 3" />
          <h2>Fried Chicken</h2>
          <p>Fried Chicken with hot sauce</p>
        </div>
      
        <div className="foodcard">
          <img src="../assets/imgs/featured4.jpg" alt="dish 4" />
          <h2>Ramen</h2>
          <p>Korean Ramen with extra spice</p>
        </div>
      
      </section>
    
    </div>
  );
};

export default Order;
