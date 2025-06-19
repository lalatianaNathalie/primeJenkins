import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { MdSearch, MdClear } from 'react-icons/md';
import api from '../../../../axiosInstance';


const AjoutSuiviHwb = ({ handleClose, allsuiviHWB, isEditMode, selectedPerson }) => {
    const [transAeriennes, setTransAeriennes] = useState([]);
    const [error, setError] = useState();
    const [selectedAerienne, setSelectedAerienne] = useState(null);
    const [searchTermT, setSearchTermT] = useState("");
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        numHAWB: '',
        etape: "",
        dateEtape: "",
        status: "",
        commentaire: "",
        creerPar: idEmploye,
        modifierPAr: idEmploye
    });
    const fetchTransAeriennes = async () => {
        try {
            const response = await api.get("/hawb/");
            return response.data;
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            throw error;
        }
    };
    const handleSelectA = (trans) => {
        if (selectedAerienne && selectedAerienne.idHAWB === trans.idHAWB) {
            setSelectedAerienne(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedAerienne(trans); // Sélectionner un nouveau transport
            setState(prevState => ({
                ...prevState,
                HWB: trans.numHAWB,
                idHAWB: trans.idHAWB,
                numHAWB: trans.numHAWB,
                idExpediteur: trans.idExpediteur,
                idDestinataire: trans.idDestinataire,
                dateHWBTransaction: trans.dateHWBTransaction,
            }));
        }
    };
    useEffect(() => {
        const getTransAeriennes = async () => {
            try {
                const data = await fetchTransAeriennes();
                setTransAeriennes(data);
            } catch (err) {
                setError(err.message);
            }
        };
        getTransAeriennes();

    }, []);
    useEffect(() => {
        if (isEditMode && selectedPerson) {
            const expData = selectedPerson.HAWB || {};
            setState({
                numHAWB: expData.numHAWB || '',
                etape: selectedPerson.etape || '',
                dateEtape: selectedPerson.dateEtape || '',
                status: selectedPerson.status || '',
                commentaire: selectedPerson.commentaire || '',
                creerPar: selectedPerson.creerPar || idEmploye,
                modifierPar: idEmploye,
            });
        } else {
            setState({
                numHAWB: '',
                etape: '',
                dateEtape: '',
                status: '',
                commentaire: '',
                creerPar: idEmploye,
                modifierPar: idEmploye
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
        return state.numHAWB && state.etape && state.dateEtape && state.status;
    };
    const finalSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            api
                .put(`/suiviHAWB/${selectedPerson.idSuiviHWB}`, state)
                .then((res) => {
                    toast.success("Marchandise modifié avec succès");
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'Le Marchandise a été modifié.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allsuiviHWB();
                    setState({
                        numHAWB: '',
                        etape: '',
                        dateEtape: '',
                        status: '',
                        commentaire: '',
                        creerPar: idEmploye,
                        modifierPar: idEmploye
                    });
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
                .post("/suiviHAWB/", state)
                .then((res) => {
                    Swal.fire({
                        title: 'Ajouté!',
                        text: 'Le suivi a été ajouté.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allsuiviHWB();
                    setState({
                        numHAWB: '',
                        etape: '',
                        dateEtape: '',
                        status: '',
                        commentaire: '',
                        creerPar: idEmploye,
                        modifierPar: idEmploye
                    });
                    setSelectedAerienne(null);
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
    const handleCancel = () => {
        setState({
            numHAWB: "",
            etape: "",
            dateEtape: "",
            status: "",
            commentaire: "",
            creerPar: idEmploye,
            modifierPar: idEmploye,
        });
    }
    const filteredAerienne = transAeriennes.filter(
        (trans) =>
            trans.numHAWB.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.dateHWBTransaction.toLowerCase().includes(searchTermT.toLowerCase())
    );

    return (
        <div className="car w-full rounded-md shadow-md bg-white p-5">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                {isEditMode ? "Modification de suivi" : "Ajout de suivi"}
            </h2>
            <form onSubmit={finalSubmit}>
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="HWB"
                                className="text-lg font-semibold mb-2 "
                            >
                                HWB
                            </label>
                            <input
                                value={state.numHAWB || ''}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                type="number"
                                name="HWB"
                                placeholder="Selectionnez HWB"
                                id="HWB"
                                readOnly

                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="etape"
                                className="text-lg font-semibold mb-2"
                            >
                                Étape
                            </label>
                            <select
                                value={state.etape}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                name="etape"
                                id="etape"
                            >
                                <option value="" disabled>Choisissez une étape</option>
                                <option value="validation">Validation</option>
                                <option value="préparation">Préparation</option>
                                <option value="douane">Douane</option>
                                <option value="expédition">Expédition</option>
                                <option value="arrivee_au_port">Arrivé au port</option>
                                <option value="livraison">Livraison</option>
                            </select>
                        </div>

                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="dateEtape"
                                className="text-lg font-semibold mb-2 "
                            >
                                Date
                            </label>
                            <input
                                value={state.dateEtape ? new Date(state.dateEtape).toISOString().split('T')[0]
                                    : ''}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="date"
                                name="dateEtape"
                                placeholder="dateEtape"
                                id="dateEtape"

                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="status"
                                className="text-lg font-semibold mb-2 "
                            >
                                Status
                            </label>
                            <input
                                value={state.status}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="text"
                                name="status"
                                placeholder="status"
                                id="status"

                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="commentaire"
                                className="text-lg font-semibold mb-2 "
                            >
                                Commentaire
                            </label>
                            <input
                                value={state.commentaire}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="text"
                                name="commentaire"
                                placeholder="commentaire"
                                id="commentaire"

                            />
                        </div>
                        <div className=" pt-8 gap-3 mb-3 flex justify-center items-center mb-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 bg-blue-100 text-gray-700 rounded-md flex-1 mr-2"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={!isStep1Valid()}
                                className={`px-4 py-2 text-white rounded-md flex-1 ${isStep1Valid() ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
                                    }`}
                                    allsuiviHWB={allsuiviHWB}
                            >
                                
                                {isEditMode ? "Modifier" : "Ajouter"}
                            </button>

                        </div>
                    </div></div>
                <div className="mt-8">
                    <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Expedition Aérienne disponible</h2>
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
                                    <th className="py-2 mx-8 text-left">Num  HAWB</th>
                                    <th className="py-2 px-4 text-left">Date Emission</th>                                       <th className="py-2 px-4 text-left">Nombre Colis</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-2">
                                {filteredAerienne.map((trans, index) => (
                                    <tr
                                        key={trans.idAgent}
                                        onClick={() => handleSelectA(trans)}
                                        className={`hover:bg-blue-200 ${trans === selectedAerienne ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${trans === selectedAerienne ? 'selectedRow' : ''}`}
                                    ><td>
                                            <input
                                                type="checkbox"
                                                checked={trans === selectedAerienne}

                                            />
                                        </td>
                                        <td className="py-2 px-4">{trans.numHAWB}</td>
                                        <td>{new Date(trans.dateEmmission).toLocaleDateString('fr-FR')}</td>
                                        <td>{trans.nbColis}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>


                </div></form>
            <ToastContainer />
        </div>
    )
}

export default AjoutSuiviHwb
