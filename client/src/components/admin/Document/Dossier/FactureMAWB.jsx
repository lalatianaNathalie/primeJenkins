import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import api from "../../../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const FactureMAWB = () => {
  const [mbl, setMbl] = useState([]);
  const [mblData, setMblData] = useState(null);
  const [totData, setTotData] = useState(null);
  const [hblData, setHblData] = useState([]);
  const getNumMBL = async () => {
    try {
      const res = await api.get("/mawb/");
      setMbl(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getNumMBL();
  }, []);
  const [idMbl, setIdMbl] = useState("");
  const gerateMBL = async (id) => {
    setIdMbl(id);
    if (id === "") return;
    try {
      const resMBL = await api.get("/mawb/get/" + id);
      setMblData(resMBL.data);
      const resHBL = await api.get("/hawb/doc/" + id);
      setHblData(resHBL.data);

      const resTot = await api.get("/hawb/tot/" + id);
      setTotData(resTot.data);
      // console.log(resTot.data);
    } catch (error) {
      console.error(error);
    }
  };

  const componentRef = useRef();
  const handlePrint = () => {
    const element = componentRef.current;
    const options = {
      margin: 1,
      filename: "Facture MAWB " + mblData.numMAWB,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };
  // Obtenir la date actuelle
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <div className="">
        <div className="relative inline-block w-80 m-2">
          <select
            // value={""}
            onChange={(e) => gerateMBL(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-150 ease-in-out appearance-none"
          >
            <option value="">Sélectionnez une Expedition</option>
            {mbl.map((v) => (
              <option key={v.idMAWB} value={v.idMAWB}>
                {v.numMAWB}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={
            idMbl === ""
              ? () => toast.error("Sélectionnez une Expedition")
              : () => handlePrint()
          }
          className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Exporter en PDF
        </button>
      </div>
      <div
        ref={componentRef}
        className="bg-white p-8 rounded-lg shadow-md border"
      >
        <div className="flex flex-wrap justify-between items-start border-b-2 border-black pb-4">
          <div className="mb-2 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-700">
              PRIMEX Logistics
            </h1>
            <p className="text-blue-700 font-semibold text-sm sm:text-base">
              Premium Import Export Logistics
            </p>
            <p className="text-blue-700 text-sm sm:text-base">
              47 rue Pasteur Rabary Ankadivato
            </p>
            <p className="text-blue-700 text-sm sm:text-base">
              101 Antananarivo, MADAGASCAR
            </p>
            <p className="text-blue-700 text-sm sm:text-base">
              tel 020 24 240 75
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <img
              src="logo.png"
              alt="Logo Primex"
              className="w-24 mx-auto sm:mx-0"
            />
          </div>
        </div>

        <div className="text-center border-t-1 border-black pt-1">
          <p className="font-semibold text-sm sm:text-base">FACTURE</p>
          <p className="font-bold text-lg sm:text-xl">Master Air WayBill</p>
          {mblData && (
            <p className="text-sm sm:text-base">
              {mblData.TransAerienne.paysChargement === "Madagascar" ||
              "MADAGASCAR"
                ? "IMPORTATION AERIENNE"
                : "EXPORTATION AERIENNE"}
            </p>
          )}
          <p className="text-sm sm:text-base">MADAGASCAR</p>
        </div>

        <div className="text-right mb-1">
          <p className="text-sm sm:text-base">Antananarivo, {currentDate}</p>
          <p className="text-sm sm:text-base">Facture N°2405182/AR</p>
        </div>

        {mblData && totData && (
          <div className="my-2 ">
            <div className="w-full">
              <h2 className="font-bold text-lg sm:text-xl text-left mb-">
                Détails de Expedition
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <p className="font-bold text-sm sm:text-base ">Numéro MAWB:</p>
                <p className="text-sm sm:text-base">{mblData.numMAWB}</p>

                <p className="font-bold text-sm sm:text-base ">
                  Date d'émission:
                </p>
                <p className="text-sm sm:text-base">{mblData.dateEmission}</p>

                <p className="font-bold text-sm sm:text-base ">
                  Date d'arrivé prevue:
                </p>
                <p className="text-sm sm:text-base">
                  {mblData.dateArrivePrevue}
                </p>
              </div>
              <h2 className="font-bold text-lg sm:text-xl text-left mb-">
                Information sur le transport
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <p className="font-bold text-sm sm:text-base ">
                  Numéro du vol:
                </p>
                <p className="text-sm sm:text-base">
                  {mblData.TransAerienne.numVol}
                </p>

                <p className="font-bold text-sm sm:text-base ">
                  Date de Chargement:
                </p>
                <p className="text-sm sm:text-base">
                  {mblData.TransAerienne.dateChargement}
                </p>

                <p className="font-bold text-sm sm:text-base ">
                  Pays de Chargement:
                </p>
                <p className="text-sm sm:text-base">
                  {mblData.TransAerienne.paysChargement}
                </p>

                <p className="font-bold text-sm sm:text-base ">
                  Pays de Déchargement:
                </p>
                <p className="text-sm sm:text-base">
                  {mblData.TransAerienne.paysDechargement}
                </p>
              </div>
            </div>
            <br />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-1">
                <thead>
                  <tr>
                    <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                      Numero HAWB
                    </th>
                    <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                      Expediteur
                    </th>
                    <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                      Destinataire
                    </th>
                    <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                      Nombre de colis
                    </th>
                    <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                      Poids (kg)
                    </th>
                    <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                      Volume (m<sup>3</sup>)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hblData.map((v, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1 text-sm sm:text-base">
                        {v.numHAWB}
                      </td>
                      <td className="border px-2 py-2 text-sm sm:text-base text-right">
                        {v.clientExp.nomClient}
                      </td>
                      <td className="border px-2 py-2 text-sm sm:text-base text-right">
                        {v.clientDest.nomClient}
                      </td>
                      <td className="border px-2 py-2 text-sm sm:text-base text-right">
                        {v.nbColis}
                      </td>
                      <td className="border px-2 py-2 text-sm sm:text-base text-right">
                        {v.poid}
                      </td>
                      <td className="border px-2 py-2 text-sm sm:text-base text-right">
                        {v.volume}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <p className="font-bold text-sm sm:text-base ">
                  Nombre de colis total:
                </p>
                <p className="text-sm sm:text-base">
                  {totData[0].totalNbColis}
                </p>

                <p className="font-bold text-sm sm:text-base ">Poid total:</p>
                <p className="text-sm sm:text-base">{totData[0].totalPoid}</p>

                <p className="font-bold text-sm sm:text-base ">Volume total:</p>
                <p className="text-sm sm:text-base">{totData[0].totalVolume}</p>
              </div>
            </div>
            <br />
          </div>
        )}

        <div className="mt-2 text-sm sm:text-base">
          <p className="text-center font-semibold">
            Merci pour votre confiance.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FactureMAWB;
