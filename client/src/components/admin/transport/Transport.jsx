import React from 'react'
import { useState } from "react";
import "../marchandises/Marchandise.scss"
import TransportMaritime from './maritime/TransportMaritime';
import TransportAerienne from './aerienne/TransportAerienne';
const Transport = () => {
    const [activeTab, setActiveTab] = useState("aerien");

    return (
      <div className="tabs-container">
        <div className="tabs">
          <div
            onClick={() => setActiveTab("aerien")}
            className={`tab ${activeTab === "aerien" ? "active" : ""}`}
          >
            Transport aerien
          </div>
          <div
            onClick={() => setActiveTab("maritime")}
            className={`tab ${activeTab === "maritime" ? "active" : ""}`}
          >
            Transport maritime
          </div>
        </div>
  
        {/* Contenu affiché selon l'onglet sélectionné */}
        <div className="tab-content">
          {activeTab === "maritime" && <TransportMaritime />}
          {activeTab === "aerien" && < TransportAerienne/>}
        </div>
      </div>
    );
}

export default Transport
