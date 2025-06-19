import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import api from "../../../../axiosInstance";

const AreaCards = () => {
  
  const [expedition, setExpedition] = useState(0);
  const [expeditionMaritime, setExpeditionMaritime] = useState(0);
  const [expeditionAerienne, setExpeditionAerienne] = useState(0);
  const [expeditionOnYear, setExpeditionOnYear] = useState(0);


  const countExpedition = async ()=>{
    try {
      const maritime = await api.get("/hbl/count/all/");
      const aerienne = await api.get("/hawb/count/all/");
      setExpedition(maritime.data + aerienne.data);  
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const countExpeditionOnYear = async ()=>{
    try {
      const maritime = await api.get("/hbl/count/onYear/");
      const aerienne = await api.get("/hawb/count/onYear/");
      setExpeditionOnYear(maritime.data + aerienne.data);  
      setExpeditionAerienne(aerienne.data);  
      setExpeditionMaritime(maritime.data);  
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

  useEffect(()=>{
    countExpedition();
    countExpeditionOnYear();
  },[])
 
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={100}
        cardInfo={{
          title: "Touts l'expédition",
          value: expedition,
          text: "Nombre total des expeditions",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={100}
        cardInfo={{
          title: "Expédition de l'année courant",
          value: expeditionOnYear,
          text: "Dans cette année",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={ expeditionOnYear===0 ? 0 :((expeditionMaritime/expeditionOnYear)*100).toFixed(2)}
        cardInfo={{
          title: "Expédition Maritime",
          value: expeditionOnYear===0 ? 0+"%": ((expeditionMaritime/expeditionOnYear)*100).toFixed(2) +"%",
          text: "Dans cette année",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29"]}
        percentFillValue={expeditionOnYear===0 ? 0 :((expeditionAerienne/expeditionOnYear)*100).toFixed(2)}
        cardInfo={{
          title: "Expédition Aérienne",
          value: expeditionOnYear===0 ? 0+"%": ((expeditionAerienne/expeditionOnYear)*100).toFixed(2) +"%",
          text: "Dans cette année",
        }}
      />
    </section>
  );
};

export default AreaCards;
