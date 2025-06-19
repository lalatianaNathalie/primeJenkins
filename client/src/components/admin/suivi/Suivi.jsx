import { useState } from "react";
import React from "react";
import SuiviHbl from "./suiviHbl/SuiviHbl";
import SuiviHwb from "./suivihwb/SuiviHwb";
import "../marchandises/Marchandise.scss";

const Suivi = () => {
  const [activeTab, setActiveTab] = useState("hwb"); // Onglet par défaut: Maritime

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          onClick={() => setActiveTab("hwb")}
          className={`tab ${activeTab === "hwb" ? "active" : ""}`}
        >
          Suivi HWB
        </div>
        <div
          onClick={() => setActiveTab("hbl")}
          className={`tab ${activeTab === "hbl" ? "active" : ""}`}
        >
          Suivi HBL
        </div>

      </div>

      {/* Contenu affiché selon l'onglet sélectionné */}
      <div className="p-4">
        {activeTab === "hwb" && <SuiviHwb />}
        {activeTab === "hbl" && <SuiviHbl />}
      </div>
    </div>
  );
};

export default Suivi;
