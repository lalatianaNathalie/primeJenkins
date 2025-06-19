import React, { useState } from 'react'
import FactureMBL from './Dossier/FactureMBL';
import FactureHBL from './Dossier/FactureHBL';

const DocMaritime = () => {
  const [activeTab, setActiveTab] = useState("facturation");

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          onClick={() => setActiveTab("facturation")}
          className={`tab button-tab ${
            activeTab === "facturation" ? "active" : ""
          }`}
        >
          Facture MBL
        </div>
        <div
          onClick={() => setActiveTab("docHbl")}
          className={`tab button-tab ${activeTab === "docHbl" ? "active" : ""}`}
        >
          Facture HBL
        </div>
      </div>
      <div className="tab-content">
        {activeTab === "facturation" && <FactureMBL />}
        {activeTab === "docHbl" && <FactureHBL />}
      </div>
    </div>
  )
}

export default DocMaritime
