import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdSearch, MdClear, MdAdd } from "react-icons/md";
import api from "../../../../axiosInstance";
import { IoArrowBack } from "react-icons/io5";

const DetailsSuiviHwb = ({ retour }) => {
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

  return (
    <>
      <div className="tabs">
        <div onClick={retour} className={`tab button-tab `}>
          <IoArrowBack />
        </div>
      </div>
      <div className="car w-full ">
        <h3 className="titleCli mb-2">SUIVIS EN TEMPS REEL DE HAWB</h3>
        <div className="actionsContainer">
          <div className="searchContainer">
            <MdSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Entrez votre numéro de suivi..."
              value={searchHawbTerm}
              onChange={(e) => setSearchHawbTerm(e.target.value)}
              className="searchInput"
            />
            {searchHawbTerm && (
              <MdClear
                className="clearIcon"
                onClick={() => setSearchHawbTerm("")}
              />
            )}
          </div>
          <button className="addButton" onClick={() => handleHawbTracking(searchHawbTerm)}>
            <MdAdd /> Suivre
          </button>
        </div>
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

        <ToastContainer />
      </div>
    </>
  );
};

export default DetailsSuiviHwb;
