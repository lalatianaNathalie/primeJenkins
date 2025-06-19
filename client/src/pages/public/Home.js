import React from "react";
import Page1 from "./../../components/public/Acceuil/Page1/Page1";
import Page2 from "./../../components/public/Acceuil/Page2/Page2";
import Choisir from "./../../components/public/Nous-Choisir/Choisir";
import Mission from "./../../components/public/Mission/Mission";

const Home = () => {
  return (
    <div className="Home screen-buplic">
      <Page1 />
      <Page2 />
      <div className="choisir">
        <Choisir />
      </div>
      <Mission />
    </div>
  );
};

export default Home;
