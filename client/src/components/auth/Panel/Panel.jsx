import React from "react";
import "./Panel.css";
import "./Panel.scss"
const Panel = () => {
  return (
    <div className="panels-container">
     
      <div className="panel left-panel">
        <div className="content">
          <h3>Primex Logistics</h3>
          <p>
          Accédez à votre compte et profitez de fonctionnalités sur mesure ! 
          </p>
          {/* <button className="btn transparent" id="sign-up-btn ">Mot de passe oublié            
          </button> */}
        </div>
        <img src="/img/log.svg"  className="image" alt="" />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3>Primex Logistics</h3>
          <p>
        Entrez vos identifiants et accédez à votre espace personnel en toute sécurité. Bienvenue chez vous
          </p>
          <button className="btn transparent"
           id="sign-in-btn"
           >
            S'authentifier
          </button>
        </div>
        <img src="/img/register.svg" className="image" alt="" />
      </div>
    </div>
  );
};  

export default Panel;
