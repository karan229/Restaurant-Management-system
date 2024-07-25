import React, { useEffect } from "react";

function RestoHome() {
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

    <div className="mainPage">

      <h1 className="titleMainPage">Welcome To Restaurant Management System</h1>

      <section className="bannerMainPage">
        <img src="/img/bannerMainPage.jpg" alt="Banner Image" />
      </section>

      <div className="aboutUsSectionContainer">
        
        <div className="aboutUsImage">
          <img src="/img/aboutUs.jpg" alt="aboutUs Image" />
        </div>
        
        <div className="aboutUsTitleBox">
          
          <h1 className="aboutUsTitle">About Us</h1>

          <p className="textAboutUs">
            Our restaurant management system is transforming the eating
            experience by combining dine-in order-taking and inventory
            management. It streamlines day-to-day operations, allowing
            restaurant owners to focus on providing exceptional dining
            experiences. The system provides real-time updates and thorough
            analytics, which improves efficiency and reduces waste. The dine-in
            order-taking option allows orders to be processed fast and precisely
            from the table, reducing errors and guaranteeing that each guest
            receives exactly what they ordered. The solution improves staff
            coordination and communication by seamlessly integrating front- and
            back-of-house procedures. This technique increases the dining room's
            efficiency, structure, and focus on customer needs.
          </p>

        </div>

      </div>

    </div>
  );
}
export default RestoHome;
