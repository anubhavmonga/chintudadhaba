import offer3 from "../images/offer3.jpg";
import offer5 from "../images/offer5.jpg";
import offer4 from "../images/offer4.jpg";
import italian from "../images/italian.gif";
import indian from "../images/Indian.jpg";
import chinese from "../images/chinese2.jpeg";
import bread from "../images/Bread2.jpg";
import beverages from "../images/beverages.jpg";

import React from "react";

export default function Home() {
  return (
    <main className="main-home">
      <div className="offers">
        <img src={offer3} alt="img" className="offer-img1" />
        <img src={offer5} alt="img" className="offer-img2" />
        <img src={offer4} alt="img" className="offer-img3" />
      </div>
      <div className="cuisine">
        <a href="menu">
          <section className="cuisine1_s1">
            <img src={italian} alt="italian" className="cuisine_img" />
            <p className="cuisine_name">Italian</p>
          </section>
        </a>
        <a href="menu" className="cuisine1_s">
          <img src={indian} alt="indian" className="cuisine_img" />
          <p className="cuisine_name">Indian</p>
        </a>
        <a href="menu" className="cuisine1_s">
          <img src={chinese} alt="chinese" className="cuisine_img" />
          <p className="cuisine_name">Chinese</p>
        </a>
        <a href="menu" className="cuisine1_s">
          <img src={bread} alt="Thai" className="cuisine_img" />
          <p className="cuisine_name">Breads</p>
        </a>
        <a href="menu" className="cuisine1_s">
          <img src={beverages} alt="Drinks" className="cuisine_img" />
          <p className="cuisine_name">Beverages</p>
        </a>
      </div>
    </main>
  );
}
