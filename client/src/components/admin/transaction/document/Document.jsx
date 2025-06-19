import { useState } from "react";
import React from 'react';
import Facturation from "./Facturation";
import "../../marchandises/Marchandise.scss"

const Document = () => {
    const [activeTab, setActiveTab] = useState('facturation');
    return (
        <div className="tabs-container">
            <div className="tabs">
                <div 
                    onClick={() => setActiveTab('facturation')}
                    className={`tab button-tab ${activeTab === 'facturation' ? 'active' : ''}`}
                >
                    Facturation
                </div>
                <div
                    onClick={() => setActiveTab('docHbl')}
                    className={`tab button-tab ${activeTab === 'docHbl' ? 'active' : ''}`}
                >
                    Lettre de transport
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'facturation' && <Facturation />}
                {activeTab === 'docHbl' && <Facturation />}
            </div>
        </div>
    );
};
export default Document;
