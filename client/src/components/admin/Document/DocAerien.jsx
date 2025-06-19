import React, { useState } from "react";
import FactureMAWB from "./Dossier/FactureMAWB";
import FactureHAWB from "./Dossier/FactureHAWB";

const DocAerien = () => {
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
          Facture MAWB
        </div>
        <div
          onClick={() => setActiveTab("docHbl")}
          className={`tab button-tab ${activeTab === "docHbl" ? "active" : ""}`}
        >
          Facture HAWB
        </div>
      </div>
      <div className="tab-content">
        {activeTab === "facturation" && <FactureMAWB />}
        {activeTab === "docHbl" && <FactureHAWB />}
      </div>
    </div>
  );
};

export default DocAerien;
