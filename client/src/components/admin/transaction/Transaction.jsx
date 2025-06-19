// Transaction.jsx
import { useState } from "react";
import TransactionHbl from "./hbl/TransactionHbl";
import TransactionHwb from "./hwb/TransactionHwb";
import DocumentP from "../../../pages/admin/Document";
import "../marchandises/Marchandise.scss"
import Mawb from "./aerienne/Mawb";
import Mbl from "./maritime/Mbl";
import Hawb from "./hwb/Hawb";

const Transaction = () => {
  const [activeTab, setActiveTab] = useState("maritime");

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          onClick={() => setActiveTab("maritime")}
          className={`tab ${activeTab === "maritime" ? "active" : ""}`}
        >
          Expedition MBL
        </div>
        <div
          onClick={() => setActiveTab("aerienne")}
          className={`tab ${activeTab === "aerienne" ? "active" : ""}`}
        >Expedition MAWB 
        </div>
        <div
          onClick={() => setActiveTab("hbl")}
          className={`tab ${activeTab === "hbl" ? "active" : ""}`}
        >
          Expedition HBL
        </div>
        <div
          onClick={() => setActiveTab("hwb")}
          className={`tab ${activeTab === "hwb" ? "active" : ""}`}
        >
          Expedition HAWB
        </div>
      </div>

      {/* Contenu affiché selon l'onglet sélectionné */}
      <div className="tab-content">
        {activeTab === "maritime" && <Mbl />}
        {activeTab === "aerienne" && <Mawb />}
        {activeTab === "hbl" && <TransactionHbl />}
        {activeTab === "hwb" && <Hawb />}
      </div>
    </div>
  );
};

export default Transaction;
