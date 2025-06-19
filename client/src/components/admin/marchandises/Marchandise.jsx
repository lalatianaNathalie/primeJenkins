// Marchandise.jsx
import { useState } from "react";
import MarchandiseHwb from "./HWB/MarchandiseHwb";
import MarchandiseHbl from "./HBL/MarchandiseHbl";
import "./Marchandise.scss"; // Importez le fichier SCSS commun

const Marchandise = () => {
  const [activeTab, setActiveTab] = useState("hwb");

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          onClick={() => setActiveTab("hwb")}
          className={`tab ${activeTab === "hwb" ? "active" : ""}`}
        >
          Marchandise HWB
        </div>
        <div
          onClick={() => setActiveTab("hbl")}
          className={`tab ${activeTab === "hbl" ? "active" : ""}`}
        >
          Marchandise HBL
        </div>
      </div>

      {/* Contenu affiché selon l'onglet sélectionné */}
      <div className="tab-content">
        {activeTab === "hbl" && <MarchandiseHbl />}
        {activeTab === "hwb" && <MarchandiseHwb />}
      </div>
    </div>
  );
};

export default Marchandise;
