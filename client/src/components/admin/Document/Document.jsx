import { useState } from "react";
import "../marchandises/Marchandise.scss";
import DocMaritime from "./DocMaritime";
import DocAerien from "./DocAerien";

const Document = () => {
  const [activeTab, setActiveTab] = useState("aerienne");

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          onClick={() => setActiveTab("aerienne")}
          className={`tab ${activeTab === "aerienne" ? "active" : ""}`}
        >
          Document Aériene
        </div>
        <div
          onClick={() => setActiveTab("maritime")}
          className={`tab ${activeTab === "maritime" ? "active" : ""}`}
        >
          Document Maritime
        </div>
      </div>

      {/* Contenu affiché selon l'onglet sélectionné */}
      <div className="tab-content">
        {activeTab === "maritime" && <DocMaritime />}
        {activeTab === "aerienne" && <DocAerien />}
      </div>
    </div>
  );
};
export default Document;
