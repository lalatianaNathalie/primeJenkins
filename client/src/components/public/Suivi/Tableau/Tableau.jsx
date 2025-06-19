import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaGlobe } from "react-icons/fa";
import "./Tableau.css";
import "./Tableau.scss";
import Expedie from "../Expedie/Expedie";
import { useTranslation } from "react-i18next";
import api from "../../../../axiosInstance";
const Tableau = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("aerienne");
  const sectionRef = useRef(null);

  const [mblData, setMblData] = useState(null);
  const [suiviData, setSuiviData] = useState([]);
  const [hblData, setHblData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [find, setFind] = useState(true);
  // *****************************************
  const [mawbData, setMawbData] = useState(null);
  const [suiviHawbData, setSuiviHawbData] = useState([]);
  const [hawbData, setHawbData] = useState(null);
  const [searchHawbTerm, setSearchHawbTerm] = useState("");
  const [trouve, setTrouve] = useState(true);

  const generateMawb = async (id) => {
    if (id === "") return;
    try {
      const resMBL = await api.get("/mawb/get/" + id);
      setMawbData(resMBL.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleHawbTracking = async (num) => {
    setTrouve(true);
    if (num === "") return;
    try {
      const idMBL = await api.get("/hawb/get/" + num);

      generateMawb(idMBL.data.idMAWB);
      setHawbData(idMBL.data);

      const DonneSuivi = await api.get("/suiviHAWB/suivre/" + num);
      setSuiviHawbData(DonneSuivi.data);
    } catch (error) {
      setTrouve(false);
    }
  };

  // *****************************************

  const gerateMBL = async (id) => {
    if (id === "") return;
    try {
      const resMBL = await api.get("/mbl/get/" + id);
      setMblData(resMBL.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrack = async (num) => {
    setFind(true);
    if (num === "") return;
    try {
      const idMBL = await api.get("/hbl/get/" + num);
      gerateMBL(idMBL.data.idMBL);
      setHblData(idMBL.data);

      const DonneSuivi = await api.get("/suiviHBL/suivre/" + num);
      setSuiviData(DonneSuivi.data);
    } catch (error) {
      setFind(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Si l'entrée est visible dans le viewport
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // déclenchement lorsque 50% de la section est visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup de l'observateur
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const activeMaritime = () => {
    setActiveTab("maritime");
  };
  const activeAerienne = () => {
    setActiveTab("aerienne");
  };

  return (
    <div className="tableau">
      <div className="div1 flexSpace">
        <div className="flexColStart primaryText">
          {t("shipmentTrackingTitle")}
        </div>
        <div>
          <p className="secondaryText text-center">
            Choisir le mode te transport de votre expedition
          </p>
          <div className=" flex justify-between gap-4">
            <div className="">
              <div
                className={`tab button-tab m-2 ${
                  activeTab === "aerienne" ? "active" : ""
                }`}
                onClick={activeAerienne}
              >
                {t("air_transport")}
              </div>
              <div
                className="rechercher"
                style={{ display: `${activeTab === "aerienne" ? "" : "none"}` }}
              >
                <input
                  type="text"

                  onChange={(e) => setSearchHawbTerm(e.target.value)}
                  className={`txt-input ${
                    activeTab === "aerienne" ? "" : "fermer"
                  }`}
                  placeholder={t("trackingNumberPlaceholder")}
                />
                <button type="button" className="btn" onClick={()=>handleHawbTracking(searchHawbTerm)}>
                  {t("track")}
                </button>
              </div>
            </div>
            <div>
              <div
                className={`tab button-tab m-2 ${
                  activeTab === "aerienne" ? "" : "active"
                }`}
                onClick={activeMaritime}
              >
                {t("sea_transport")}
              </div>
              <div
                className="rechercher"
                style={{ display: `${activeTab === "aerienne" ? "none" : ""}` }}
              >
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("trackingNumberPlaceholder")}
                  className={`txt-input ${
                    activeTab === "aerienne" ? "fermer" : ""
                  }`}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleTrack(searchTerm)}
                >
                  {t("track")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeTab === "aerienne" ? 
      (
        <div class="m-8 px-8">
          {trouve ? (
            <>
              {mawbData && suiviHawbData && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                    Suivi de colis HAWB N°:{hawbData.numHAWB}
                  </h2>
                  <div className=" ">
                    <div className=" flex justify-between">
                      <div className=" ">
                        <p>
                          <strong>Numéro MAWB :</strong>
                          {mawbData.numMAWB}
                        </p>
                        <p>
                          <strong> Date d'émission du MAWB:</strong>
                          {mawbData.dateEmission}
                        </p>
                        <p>
                          <strong>Nom de compagnie :</strong>
                          {mawbData.TransAerienne.nomCompagnie}
                        </p>
                        <p>
                          <strong>Numero de vol :</strong>
                          {mawbData.TransAerienne.numVol}
                        </p>
                      </div>
                      <div className=" ">
                        <p>
                          <strong> Date de chargement:</strong>
                          {mawbData.TransAerienne.dateChargement}
                        </p>
                        <p>
                          <strong> Pays de chargement:</strong>
                          {mawbData.TransAerienne.paysChargement}
                        </p>
                        <p>
                          <strong> Ville de chargement:</strong>
                          {mawbData.TransAerienne.villeChargement}
                        </p>
                        <p>
                          <strong>Pays de déchargement :</strong>
                          {mawbData.dateArrivePrevue}
                        </p>
                        <p>
                          <strong>Date d'arrivé prevue :</strong>
                          {mawbData.dateArrivePrevue}
                        </p>
                      </div>
                    </div>
                    <hr className="my-2 " />
                    <div className="text-center">
                      <p>
                        <strong>Nom Destinataire :</strong>
                        {hawbData.clientDest.nomClient}
                      </p>
                      <p>
                        <strong>Nom Expediteur :</strong>
                        {hawbData.clientExp.nomClient}
                      </p>
                      <p>
                        <strong>Nombre de colis :</strong>
                        {hawbData.nbColis}
                      </p>
                      <p>
                        <strong>Poid :</strong>
                        {hawbData.poid} kg
                      </p>
                      <p>
                        <strong>Volume :</strong>
                        {hawbData.poid} m <sup>3</sup>
                      </p>
                    </div>
                    <hr className="my-2" />
                    <hr className="my-2" />
                    <div className="overflow-x-auto">
                      <h2>Les etapes de l'expedition</h2>
                      <table className="w-full border-collapse mb-1">
                        <thead>
                          <tr>
                            <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                              Etape
                            </th>
                            <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                              Date
                            </th>
                            <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                              status
                            </th>
                            <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                              commentaire
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {suiviHawbData.map((v, i) => (
                            <tr key={i}>
                              <td className="border px-2 py-1 text-sm sm:text-base">
                                {v?.etape}
                              </td>
                              <td className="border px-2 py-2 text-sm sm:text-base text-right">
                                {v.dateEtape}
                              </td>
                              <td className="border px-2 py-2 text-sm sm:text-base text-right">
                                {v.status}
                              </td>
                              <td className="border px-2 py-2 text-sm sm:text-base text-right">
                                {v.commentaire}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <hr className="my-2" />
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-center text-xl p-5">Aucun resultat trouvé</p>
          )}
        </div>
      ) : (
        <div class="m-8 px-8">
          {find ? (
            <>
              {mblData && suiviData && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                    Suivi de colis HBL N°:{hblData.numHBL}
                  </h2>
                  <div className=" ">
                    <div className=" flex justify-between">
                      <div className=" ">
                        <p>
                          <strong>Numéro MBL :</strong>
                          {mblData.numMBL}
                        </p>
                        <p>
                          <strong> Date d'émission du MBL:</strong>
                          {mblData.dateEmission}
                        </p>
                        <p>
                          <strong>Nom de l'armateur :</strong>
                          {mblData.TransMaritime.armateur}
                        </p>
                        <p>
                          <strong>Numero IMO :</strong>
                          {mblData.TransMaritime.numIMO}
                        </p>
                        <p>
                          <strong>Nom de navire :</strong>
                          {mblData.TransMaritime.nomNavire}
                        </p>
                      </div>
                      <div className=" ">
                        <p>
                          <strong> Date de chargement:</strong>
                          {mblData.TransMaritime.dateChargement}
                        </p>
                        <p>
                          <strong> Pays de chargement:</strong>
                          {mblData.TransMaritime.paysChargement}
                        </p>
                        <p>
                          <strong> Ville de chargement:</strong>
                          {mblData.TransMaritime.villeChargement}
                        </p>
                        <p>
                          <strong>Pays de déchargement :</strong>
                          {mblData.dateArrivePrevue}
                        </p>
                        <p>
                          <strong>Date d'arrivé prevue :</strong>
                          {mblData.dateArrivePrevue}
                        </p>
                      </div>
                    </div>
                    <hr className="my-2 " />
                    <div className="text-center">
                      <p>
                        <strong>Nom Destinataire :</strong>
                        {hblData.clientDest.nomClient}
                      </p>
                      <p>
                        <strong>Nom Expediteur :</strong>
                        {hblData.clientExp.nomClient}
                      </p>
                      <p>
                        <strong>Nombre de colis :</strong>
                        {hblData.nbColis}
                      </p>
                      <p>
                        <strong>Poid :</strong>
                        {hblData.poid} kg
                      </p>
                      <p>
                        <strong>Volume :</strong>
                        {hblData.poid} m <sup>3</sup>
                      </p>
                    </div>
                    <hr className="my-2" />
                    <hr className="my-2" />
                    <div className="overflow-x-auto">
                      <h2>Les etapes de l'expedition</h2>
                      <table className="w-full border-collapse mb-1">
                        <thead>
                          <tr>
                            <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                              Etape
                            </th>
                            <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                              Date
                            </th>
                            <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                              status
                            </th>
                            <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                              commentaire
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {suiviData.map((v, i) => (
                            <tr key={i}>
                              <td className="border px-2 py-1 text-sm sm:text-base">
                                {v?.etape}
                              </td>
                              <td className="border px-2 py-2 text-sm sm:text-base text-right">
                                {v.dateEtape}
                              </td>
                              <td className="border px-2 py-2 text-sm sm:text-base text-right">
                                {v.status}
                              </td>
                              <td className="border px-2 py-2 text-sm sm:text-base text-right">
                                {v.commentaire}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <hr className="my-2" />
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-center text-xl p-5">Aucun resultat trouvé</p>
          )}
        </div>
      )}

      <Expedie />
      <motion.div
        className="box-cum flexColCenter"
        ref={sectionRef}
        initial={{ opacity: 0.6, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 2 }}
      >
        <div className="bloc dessous flexColCenter">
          <div className="icon">
            {" "}
            <FaGlobe size={50} />{" "}
          </div>
          <h2 className="primaryText">{t("ship_now")}</h2>
          <p className="secondaryText">{t("selectServiceText")}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Tableau;
