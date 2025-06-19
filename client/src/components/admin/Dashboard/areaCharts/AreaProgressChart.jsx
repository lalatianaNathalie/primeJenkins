"use client"
import api from "../../../../axiosInstance";
import { useEffect, useState } from "react";

const AreaProgressChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); /**met en true */
  const plusExpedier= async ()=>{
    try {
      const response = await api.get("/marchandise/plus/");
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  useEffect(()=>{
    plusExpedier();
  },[])

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Les compagnies des transports les plus répandues </h4>
      </div>
      <div className="progress-bar-list">
        {isLoading ? (
          <div className="loader"></div>
          // Affichage pendant le chargement
        ) :
        (data.map((progressbar) => {
          return (
            <div className="progress-bar-item"
        //  key={progressbar.id}
             >
              <div className="bar-item-info">
                <p className="bar-item-info-name">{progressbar.nature}</p>
                <p className="bar-item-info-value">
                  {progressbar.nb}
                </p>
              </div>
              <div className="bar-item-full">
                <div
                  className="bar-item-filled"
                  style={{
                    width: `${progressbar.pourcentage}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        }))
      }
      </div>
    </div>
  );
};

export default AreaProgressChart;
