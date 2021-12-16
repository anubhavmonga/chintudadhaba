import React from "react";
import dineIn from "../images/dineIn.jpg";
import delivery from "../images/delivery.jpg";

function Services() {
  return (
    <>
      <div className="services-main">
        <div className="services-heading">Services</div>
        <div className="services-container">
          <div className="services-children">
            <div className="services-children-heading">Takeaway</div>
            <div className="services-children-image">
              <img
                src="https://thumbs.dreamstime.com/b/takeaway-food-restaurant-eatery-menu-vector-illustration-takeaway-food-restaurant-eatery-menu-flat-vector-illustration-183784204.jpg"
                alt=""
                className="services-children-img"
              />
            </div>
            <div className="services-children-body">
              Takeaway your food at your convinent place
            </div>
          </div>

          <div className="services-children">
            <div className="services-children-heading">Dine-In</div>
            <div className="services-children-image">
              <img src={dineIn} alt="" className="services-children-img" />
            </div>
            <div className="services-children-body">
              Dine In and enjoy the most luxurious atmosphere with most
              delicious food to reach your tongue.
            </div>
          </div>

          <div className="services-children">
            <div className="services-children-heading">Delivery</div>
            <div className="services-children-image">
              <img src={delivery} alt="" className="services-children-img" />
            </div>
            <div className="services-children-body">
              Nothing is like home but nothing is like our food as well so you
              can enjoy both at the same time like match made in heaven
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
