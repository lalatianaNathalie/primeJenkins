import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { MdSearch, MdClear } from 'react-icons/md';
import api from '../../../../axiosInstance';

const AjoutTransHbl = ({ handleClose, allTransactionHbl, isEditMode, selectedPerson }) => {
    const [clientOption, setclientOption] = useState([]);
    const [maritimeOption, setmaritimeOption] = useState([]);
    const [error, setError] = useState();
    const [selectedClient, setselectedClient] = useState(null);
    const [selectedMaritime, setselectedMaritime] = useState(null);
    const [activeField, setActiveField] = useState(null);
    const [searchTermM, setSearchTermM] = useState("");
    const [searchTermT, setSearchTermT] = useState("");
    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0]);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        numHBL: '',
        idMBL: '',
        idExpediteur: "",
        idDestinataire: "",
        dateEmmission: "",
        nbColis: '',
        poid: '',
        volume: '',
        description: '',
        creerPar: idEmploye,
        modifierPAr: idEmploye
    });
    const handleSelectA = (client) => {
        if (selectedClient && selectedClient.idHBL === client.idHBL) {
            setselectedClient(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setselectedClient(client);
            if (activeField === "expediteur") {
                setState(prevState => ({
                    ...prevState,
                    idExpediteur: client.idClient,
                    nomClient: client.nomClient,
                    CINClient: client.CINClient,
                    emailClient: client.emailClient,
                }));
            } else if (activeField === "destinataire") {
                setState(prevState => ({
                    ...prevState,
                    idDestinataire: client.idClient,
                    nomClient: client.nomClient,
                    CINClient: client.CINClient,
                    emailClient: client.emailClient,
                }));
            }
        }
    };
    const fetchClients = async () => {
        try {
            const response = await api.get("/client/");
            return response.data;

        } catch (error) {
            throw new Error('Erreur lors de la récupération des données');
        }

    };
    const handleSelectM = (maritime) => {
        if (selectedMaritime && selectedMaritime.idMBL === maritime.idMBL) {
            setselectedMaritime(null);
        } else {
            console.log(maritime)
            setselectedMaritime(maritime);
            setState(prevState => ({
                ...prevState,
                idMBL: maritime.idMBL,
                numMBL: maritime.numMBL,
                idTransport: maritime.idTransport,
                dateEmission: maritime.dateEmission,
                dateArrivePrevue: maritime.dateArrivePrevue,
            }));
        }
    }
    const fetchTransMaritime = async () => {
        try {
            const response = await api.get("/mbl/");
            return response.data;

        } catch (error) {
            throw new Error('Erreur lors de la récupération des données');
        }

    };
    useEffect(() => {
        const getClients = async () => {
            try {

                const data = await fetchClients();
                setclientOption(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const getTransactionM = async () => {
            try {
                const data = await fetchTransMaritime();
                setmaritimeOption(data);
                console.log(data);

            } catch (err) {
                setError(err.message);
            }
        };
        getTransactionM();
        getClients();

    }, []);
    useEffect(() => {
        if (isEditMode && selectedPerson) {
            const transportData = selectedPerson.MBL || {};
            // const ClientData = selectedPerson.Client || {};
            setState({
                numHBL: selectedPerson.numHBL || '',
                nbColis: selectedPerson.nbColis || '',
                poid: selectedPerson.poid || '',
                volume: selectedPerson.volume || '',
                description: selectedPerson.description || '',
                idMBL: selectedPerson.idMBL || '',
                idExpediteur: selectedPerson.idExpediteur || '',
                idDestinataire: selectedPerson.idDestinataire || '',
                dateEmmission: selectedPerson.dateEmmission || '',
                creerPar: selectedPerson.creerPar || idEmploye,
                modifierPar: idEmploye,
            });
        } else {
            // Sinon, réinitialiser les champs
            setState({
                numHBL: '',
                idMBL: '',
                idExpediteur: "",
                idDestinataire: "",
                dateEmmission: "",
                nbColis: '',
                poid: '',
                volume: '',
                description: '',
                creerPar: idEmploye,
                modifierPAr: idEmploye
            });
        }
    }, [isEditMode, selectedPerson, idEmploye]);
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const isStep1Valid = () => {
        return state.numHBL && state.idMBL && state.dateEmmission;
    };
    const isStep2Valid = () => {
        return state.idExpediteur && state.idDestinataire;
    };
    const isStep3Valid = () => {
        return state.nbColis && state.volume && state.poid && state.description;
    };
    const next = () => {
        if (formNo === 1 && isStep1Valid()) {
            setFormNo(formNo + 1);
        } else if (formNo === 2 && isStep2Valid()) {
            setFormNo(formNo + 1);
        } else if (formNo === 3 && isStep3Valid()) {
            finalSubmit();
        } else {
            toast.error('Please fill in all the required fields');
        }
    };
    const pre = () => {
        if (formNo > 1) {
            setFormNo(formNo - 1);
        }
    };
    const finalSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            api
                .put(`/hbl/${selectedPerson.idHBL}`, state)
                .then((res) => {
                    toast.success("Expedition modifié avec succès");
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'Le Expedition a été modifié.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allTransactionHbl();
                    handleClose();
                })
                .catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err.message);
                    }
                });
        } else {

            api
                .post("/hbl/", state)
                .then((res) => {
                    Swal.fire({
                        title: 'Ajouté!',
                        text: 'Le Expedition a été ajouté.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allTransactionHbl();
                    handleClose();
                })
                .catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err.message);
                    }
                });
        }
    };
    const filteredClients = clientOption.filter(
        (trans) =>
            trans.nomClient.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.CINClient.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.emailClient.toLowerCase().includes(searchTermT.toLowerCase())
    );
    const filteredMaritime = maritimeOption.filter(
        (trans) =>
            trans.numMBL.toLowerCase().includes(searchTermM.toLowerCase()) ||
            trans.dateEmission.toLowerCase().includes(searchTermM.toLowerCase()) ||
            trans.dateArrivePrevue.toLowerCase().includes(searchTermM.toLowerCase())
    );
    return (
        <div className="car w-full rounded-md shadow-md bg-white p-5">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                {isEditMode ? "Modifier un Expedition HBL" : "Ajouter un Expedition HBL"}
            </h2>
            <div className="flex items-center w-full mb-4">
                 {formArray.map((v, i) => (
                    <React.Fragment key={i}>
                        <div className="flex flex-col items-center w-full">
                            <div
                                className={`w-[35px] h-[35px] my-3 text-white rounded-full ${formNo - 1 > i
                                    ? 'bg-green-500'
                                    : formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length
                                        ? 'bg-green-500'
                                        : 'bg-slate-400'
                                    } flex justify-center items-center`}
                            >
                                {formNo - 1 > i ? '✓' : v}
                            </div>
                            <div className="text-sm mt-1 text-center text-green-500 font-semibold">
                            {i === 0 && 'INFORMATION EXPEDITION'}
                                {i === 1 && 'INFORMATION CLIENT'}
                                {i === 2 && 'MARCHANDISE'}
                            </div>
                        </div>
                        {i !== formArray.length - 1 && (
                            <div
                                className={`h-[2px] w-full ${formNo - 1 > i
                                    ? 'bg-green-500'
                                    : formNo === i + 2 || formNo === formArray.length
                                        ? 'bg-green-500'
                                        : 'bg-slate-400'
                                    }`}
                                style={{ marginLeft: '0px', marginRight: '0px' }}
                            ></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            {/* Form Step 1 */}
            {formNo === 1 && (
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                        <InputField label="N° HBL" name="numHBL" value={state.numHBL} inputHandle={inputHandle} placeholder='N° HBL' />
                        <InputField label="N° MBL" name="idMBL" value={state.idMBL} inputHandle={inputHandle} placeholder='Selectionnez numéro MBL' />
                        <InputField label="Date emission" type='date' name="dateEmmission" value={state.dateEmmission ? new Date(state.dateEmmission).toISOString().split('T')[0] : ''} inputHandle={inputHandle} />
                        <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                            <button
                                onClick={pre}
                                disabled={formNo === 1}
                                className={`px-3 py-2 text-lg rounded-md w-full text-white ${formNo === 1 ? 'bg-blue-100 cursor-not-allowed' : 'bg-blue-500'
                                    }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={next}
                                disabled={!isStep1Valid()}
                                className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep1Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Numéro MBL Disponible</h2>
                        {/* FILTRE */}
                        <div className="searchContainer">
                            <MdSearch className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                value={searchTermT}
                                onChange={(e) => setSearchTermM(e.target.value)}
                                className="searchInput mb-4"
                            />
                            {setSearchTermM && (
                                <MdClear
                                    className="clearIcon"
                                    onClick={() => setSearchTermM("")}
                                />
                            )}
                        </div>

                        <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                            <table className="table-auto w-full text-left border-collapse">
                                <thead className="text-white bg-blue-200">
                                    <tr>
                                        <th className="py-2 px-2 text-left">#</th>
                                        <th className="py-2 mx-8 text-left">N° MBL</th>
                                        <th className="py-2 px-4 text-left">Date Emission</th>
                                        <th className="py-2 px-4 text-left">Date Arrivé</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {filteredMaritime.map((maritime, index) => (
                                        <tr
                                            key={maritime.idMBL}
                                            onClick={() => handleSelectM(maritime)}
                                            className={`hover:bg-blue-200 ${maritime === selectedMaritime ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${maritime === selectedMaritime ? 'selectedRow' : ''}`}
                                        ><td>
                                                <input
                                                    type="checkbox"
                                                    checked={maritime === selectedMaritime}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-2 px-4">{maritime.numMBL}</td>
                                            <td>{new Date(maritime.dateEmission).toLocaleDateString('fr-FR')}</td>
                                            <td>{new Date(maritime.dateArrivePrevue).toLocaleDateString('fr-FR')}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            )}
            {/* Form Step 2 */}
            {formNo === 2 && (
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                        <InputField label="Client Expediteur" name="idExpediteur" value={state.idExpediteur} inputHandle={inputHandle} placeholder='Expediteur' onFocus={() => setActiveField("expediteur")} autoFocus={true} readOnly />

                        <InputField label="Client Destinataire" name="idDestinataire" value={state.idDestinataire} inputHandle={inputHandle} placeholder='Destinataire' 
                                onFocus={() => setActiveField("destinataire")}readOnly />
                        <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                            <button
                                onClick={pre}
                                className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500"
                            >
                                Previous
                            </button>
                            {/* Final Submit button */}
                            <button
                                onClick={next}
                                disabled={!isStep2Valid()}
                                className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid()
                                    ? "bg-blue-500"
                                    : "bg-blue-100 cursor-not-allowed"
                                    }`}
                            >

                                {isEditMode ? "Modifier" : "Ajouter"}
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Client disponible</h2>
                        {/* FILTRE */}
                        <div className="searchContainer">
                            <MdSearch className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                value={searchTermT}
                                onChange={(e) => setSearchTermT(e.target.value)}
                                className="searchInput mb-4"
                            />
                            {searchTermT && (
                                <MdClear
                                    className="clearIcon"
                                    onClick={() => setSearchTermT("")}
                                />
                            )}
                        </div>

                        <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                            <table className="table-auto w-full text-left border-collapse">
                                <thead className="text-white bg-blue-200">
                                    <tr>
                                        <th className="py-2 px-2 text-left">#</th>
                                        <th className="py-2 mx-8 text-left">Nom Client</th>
                                        <th className="py-2 px-4 text-left">CIN</th>
                                        <th className="py-2 px-4 text-left">Mail</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {filteredClients.map((Client, index) => (
                                        <tr
                                            key={Client.idClient}
                                            onClick={() => handleSelectA(Client)}
                                            className={`hover:bg-blue-200 ${Client === selectedClient ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${Client === selectedClient ? 'selectedRow' : ''}`}
                                        ><td>
                                                <input
                                                    type="checkbox"
                                                    checked={Client === selectedClient}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-2 px-4">{Client.nomClient}</td>
                                            <td className="py-2 px-4">{Client.CINClient}</td>
                                            <td className="py-2 px-4">{Client.emailClient}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            )}
            {formNo === 3 && (
                <div>
                    <InputField label="Nombre colis" name="nbColis" value={state.nbColis} inputHandle={inputHandle} type='number' placeholder='Nombre colis'/>
                    <InputField label="Poids" name="poid" value={state.poid} type='number' inputHandle={inputHandle} placeholder='Poid'/>
                    <InputField label="Volume" name="volume" value={state.volume} inputHandle={inputHandle} placeholder='Volume' type='number'/>
                    <InputField label="Description" name="description" value={state.description} inputHandle={inputHandle} placeholder='Description'/>
                    <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                        {/* Previous button */}
                        <button
                            onClick={pre}
                            className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500"
                        >
                            Previous
                        </button>
                        {/* Final Submit button */}
                        <button
                            onClick={finalSubmit}
                            disabled={!isStep3Valid()}
                            className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep3Valid()
                                ? "bg-blue-500"
                                : "bg-blue-100 cursor-not-allowed"
                                }`}
                        >

                            {isEditMode ? "Modifier" : "Ajouter"}
                        </button>
                    </div>
                </div>
            )}
            {/* Container for Toast notifications */}
            <ToastContainer />
        </div>
    )
}

const InputField = ({ label, name, value, inputHandle, type = "text",onFocus, autoFocus, readOnly = false, placeholder = "" }) => (
    <div className="flex flex-col mb-3">
        <label htmlFor={name} className="text-sm sm:text-lg font-semibold mb-2">{label}</label>
        <input
        onFocus={onFocus}
            value={value}
            onChange={inputHandle}
            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md text-xs sm:text-sm"
            type={type}
            name={name}
            id={name}
            readOnly={readOnly}
            placeholder={placeholder}
            autoFocus={autoFocus}
        />
    </div>
);

const InfoField = ({ label, value }) => (
    <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-sm sm:text-base">{label}</span>
        <span className="text-sm sm:text-base">{value}</span>
    </div>

);

export default AjoutTransHbl
