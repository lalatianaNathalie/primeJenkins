
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { MdSearch, MdClear, MdRemove } from 'react-icons/md';
import api from '../../../../../axiosInstance';
import idUserConnected from '../../../../../constants/idUserConnected';
const AjoutMbl = ({ handleClose, alltransactionMbl, isEditMode, selectedPerson }) => {
    const [loading, setLoading] = useState(false);
    const [transAeriennes, setTransAeriennes] = useState([]);
    const [error, setError] = useState();
    const [selectedAerienne, setSelectedAerienne] = useState(null);
    const [searchTermT, setSearchTermT] = useState("");
    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0]);
    const idEmploye = idUserConnected()
    const [state, setState] = useState({
        numMBL: '',
        idTransport: '',
        dateEmission: "",
        dateArrivePrevue: "",
        armateur: '',
        paysChargement: '',
        paysDechargement: '',
        conteneur: [],
        creerPar: idEmploye,
        modifierPAr: idEmploye
    });
    const [conteneurData, setConteneurData] = useState({
        "numMBL": "",
        "numConteneur": "",
        "typeConteneur": "",
        "numPlomb": ""
    })
    const deleteConteneur = (index) => {
        setState(prevState => ({
            ...prevState,
            conteneur: prevState.conteneur.filter((_, i) => i !== index)
        }));
    };
    const fetchTransAeriennes = async () => {
        try {
            const response = await api.get("/transMaritime/");
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des données');
        }
    };
    const handleSelectA = (trans) => {
        if (selectedAerienne && selectedAerienne.idTransMaritime === trans.idTransMaritime) {
            setSelectedAerienne(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedAerienne(trans); // Sélectionner un nouveau transport
            setState(prevState => ({
                ...prevState,
                idTransport: trans.idTransMaritime,
                idTransMaritime: trans.idTransMaritime,
                armateur: trans.armateur,
                paysChargement: trans.paysChargement,
                paysDechargement: trans.paysDechargement,
                numIMO: trans.numIMO,

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
            const transportData = selectedPerson.TransAerienne || {};
            setState({
                numMBL: selectedPerson.numMBL || '',
                idTransport: transportData.idTransMaritime || '',
                dateEmission: selectedPerson.dateEmission || '',
                dateArrivePrevue: selectedPerson.dateArrivePrevue || '',
                creerPar: selectedPerson.creerPar || idEmploye,
                modifierPar: idEmploye,
                armateur: transportData.armateur || '',
                paysChargement: transportData.paysChargement || '',
                paysDechargement: transportData.paysDechargement || '',
                numIMO: transportData.numIMO || '',
                nomNavire: transportData.nomNavire || ''
            });
            console.log('selectedPerson:', selectedPerson);
        } else {
            setState({
                numMBL: '',
                idTransport: '',
                dateEmission: "",
                dateArrivePrevue: "",
                creerPar: idEmploye,
                modifierPar: idEmploye,
                armateur: '',
                paysChargement: '',
                paysDechargement: '',
                numIMO: ''
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
        return state.numMBL && state.dateEmission && state.dateArrivePrevue;
    };
    const isStep2Valid = () => {
        return state.idTransport;
    };
    const isStep3Valid = () => {
        return state.idTransport;
    };
    const isStepConteneur = () => {
        return conteneurData.numConteneur && conteneurData.numPlomb && conteneurData.typeConteneur
    }
    const isConteneurValid = () => {
        return state.conteneur && state.conteneur.length > 0 && state.conteneur.length <= 2;
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
        setLoading(true);
        setTimeout(() => {
            if (isEditMode) {
                api
                    .put(`/mbl/${selectedPerson.idMBL}`, state)
                    .then((res) => {
                        toast.success("Expedition modifiée avec succès");
                        Swal.fire({
                            title: 'Modifié!',
                            text: 'Le Expedition a été modifiée.',
                            icon: 'success',
                            timer: 3000,
                            showConfirmButton: false,
                        });
                        alltransactionMbl();
                        handleClose();
                        setLoading(false);
                    })
                    .catch((err) => {
                        if (err.response) {
                            toast.error(err.response.data.error);
                        } else {
                            toast.error(err.message);
                        }
                        setLoading(false);
                    });
            } else {
                // return console.log(state);

                api
                    .post("/mbl/", state)
                    .then((res) => {
                        Swal.fire({
                            title: 'Ajouté!',
                            text: 'Le Expedition a été ajoutée.',
                            icon: 'success',
                            timer: 3000,
                            showConfirmButton: false,
                        });
                        alltransactionMbl();
                        handleClose();
                        setLoading(false);  // Désactive le chargement après la réponse
                    })
                    .catch((err) => {
                        if (err.response) {
                            toast.error(err.response.data.error);
                        } else {
                            toast.error(err.message);
                        }
                        setLoading(false);  // Désactive le chargement en cas d'erreur
                    });
            }
        }, 3000);
    };
    const filteredAerienne = transAeriennes.filter(
        (trans) =>
            trans.armateur.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.paysChargement.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.paysDechargement.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.numIMO.toLowerCase().includes(searchTermT.toLowerCase())
    );
    const addConteneur = async (conteneurVal) => {
        console.log(conteneurVal);


        setState(prevState => {
            const conteneurArray = Array.isArray(prevState.conteneur) ? prevState.conteneur : [];
            return {
                ...prevState,
                conteneur: [...conteneurArray, conteneurVal]
            };
        });
    }
    return (
        <div className="car w-full rounded-md shadow-md bg-white p-5">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                {isEditMode ? "Modifier un Expedition MBL" : "Ajouter un Expedition MBL"}
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
                                {i === 1 && 'INFORMATION TRANSPORT'}
                                {i === 2 && 'CONTENEUR'}
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
            {/* Form Step 2 */}
            {formNo === 2 && (
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                        <InputField onChange={inputHandle} label="Transport" name="idTransport" value={state.idTransport || ''} placeholder="Transport" readOnly />
                        <InfoField label="N° IMO:" value={state.numIMO || "------"} />
                        <InfoField label=" Nom Navire:" value={state.nomNavire || "------"} />
                        <InfoField label=" Nom Armateur:" value={state.armateur || "------"} />
                        <InfoField label="Pays Chargement:" value={state.paysChargement} />
                        <InfoField label="Pays Chargement:" value={state.paysDechargement} />
                        <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                            <button
                                onClick={pre}
                                className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500"
                            >
                                Previous
                            </button>
                            <button
                                onClick={next}
                                disabled={!isStep2Valid()}
                                className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                                    }`}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Transport maritime disponible</h2>
                        <div className="searchContainer flex items-center gap-2">
                            <MdSearch className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                value={searchTermT}
                                onChange={(e) => setSearchTermT(e.target.value)}
                                className="searchInput earchInput mb-4 w-full p-2 border border-gray-300 rounded-md"
                            />
                            {searchTermT && (
                                <MdClear
                                    className="clearIcon cursor-pointer"
                                    onClick={() => setSearchTermT("")}
                                />
                            )}
                        </div>
                        <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                            <table className="table-auto w-full text-left border-collapse">
                                <thead className="text-white bg-blue-200">
                                    <tr>
                                        <th className="py-2 px-2 text-left">#</th>
                                        <th className="py-2 mx-8 text-left">N° IMO</th>
                                        <th className="py-2 px-4 text-left">Nom Navire</th>
                                        <th className="py-2 px-4 text-left">Armateur</th>
                                        <th className="py-2 px-4 text-left">Pays Départ</th>
                                        <th className="py-2 px-4 text-left">Pays Arrivé</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {filteredAerienne.map((trans, index) => (
                                        <tr
                                            key={trans.idTransMaritime}
                                            onClick={() => handleSelectA(trans)}
                                            className={`hover:bg-blue-200 ${trans === selectedAerienne ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${trans === selectedAerienne ? 'selectedRow' : ''}`}
                                        ><td>
                                                <input
                                                    type="checkbox"
                                                    checked={trans === selectedAerienne}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-2 px-4">{trans.numIMO}</td>
                                             <td className="py-2 px-4">{trans.nomNavire}</td>
                                            <td className="py-2 px-4">{trans.armateur}</td>
                                            <td className="py-2 px-4">{trans.paysChargement}</td>
                                            <td className="py-2 px-4">{trans.paysDechargement}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            )}
            {/* Form Step 1 */}
            {formNo === 1 && (
                <div>
                    <InputField label="N° MBL" name="numMBL" value={state.numMBL} inputHandle={inputHandle} onChange={inputHandle} placeholder='N° MBL' />
                    <InputField onChange={inputHandle} label="Date arrivée prevu" name="dateArrivePrevue" type='date' value={state.dateArrivePrevue ? new Date(state.dateArrivePrevue).toISOString().split('T')[0] : ''} inputHandle={inputHandle} />
                    <InputField onChange={inputHandle} label="Date emission" name="dateEmission" type='date' value={state.dateEmission ? new Date(state.dateEmission).toISOString().split('T')[0] : ''} inputHandle={inputHandle} />
                    <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                        {/* Previous button (disabled on the first step) */}
                        <button
                            onClick={pre}
                            disabled={formNo === 1}
                            className={`px-3 py-2 text-lg rounded-md w-full text-white ${formNo === 1 ? 'bg-blue-100 cursor-not-allowed' : 'bg-blue-500'
                                }`}
                        >
                            Précedent
                        </button>
                        {/* Next button */}
                        <button
                            onClick={next}
                            disabled={!isStep1Valid()}
                            className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep1Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                                }`}
                        >
                            Suivant
                        </button>
                    </div>

                </div>
            )}
            {formNo === 3 && (
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-2/3">
                        <InputField
                            label="N° Conteneur"
                            name="numConteneur"
                            value={conteneurData.numConteneur}
                            onChange={(e) => {
                                setConteneurData({ ...conteneurData, numConteneur: e.target.value })
                                //  setConteneurData({ ...conteneurData, numMBL: state.numMBL })
                            }}
                            placeholder="N° Conteneur"
                        />
                        <InputField
                            label="Type Conteneur"
                            name="typeConteneur"
                            value={conteneurData.typeConteneur}
                            placeholder="Type"
                            onChange={(e) => setConteneurData({ ...conteneurData, typeConteneur: e.target.value })}
                        />
                        <InputField
                            label="N° PLomb"
                            name="numPlomb"
                            value={conteneurData.numPlomb}
                            onChange={(e) => setConteneurData({ ...conteneurData, numPlomb: e.target.value })}
                            placeholder="Plomb"
                        />
                        <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                            <button
                                onClick={pre}
                                className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => {
                                    // setConteneurData({...conteneurData, numMBL:state.numMBL})
                                    addConteneur({ ...conteneurData, numMBL: state.numMBL });
                                    setConteneurData({ typeConteneur: "", numConteneur: "", numPlomb: "" });
                                }}
                                className={`relative px-3 py-2 text-lg rounded-md w-full text-white ${isStepConteneur() ? "bg-blue-500" : "bg-blue-100 cursor-not-allowed"}`}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Conteneur ajouté</h2>
                        <div className="data-table-diagram overflow-auto" style={{ maxHeight: '300px' }}>
                            <table className="table table-auto w-full text-left border-collapse">
                                <thead className="text-white bg-blue-200">
                                    <tr>
                                        <th className="py-2 px-2 text-left">#</th>
                                        <th className="py-2 mx-8 text-left">N° Conteneur</th>
                                        <th className="py-2 px-4 text-left">Type Conteneur</th>
                                        <th className="py-2 px-4 text-left">N° Plomb</th>
                                        <th className="py-2 px-4 text-left">Action</th>
                                    </tr>
                                </thead>
                                {state.conteneur && (
                                    <tbody className="space-y-2">
                                        {state.conteneur.map((trans, index) => (
                                            <tr
                                                key={index}
                                                onClick={() => handleSelectA(trans)}
                                                className={`hover:bg-blue-200 ${trans === selectedAerienne ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${trans === selectedAerienne ? 'selectedRow' : ''}`}
                                            >
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={trans === selectedAerienne}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="py-2 px-4">{trans.numConteneur}</td>
                                                <td className="py-2 px-4">{trans.typeConteneur}</td>
                                                <td className="py-2 px-4">{trans.numPlomb}</td>
                                                <td className="dt-cell-action">
                                                    <MdRemove onClick={() => deleteConteneur(index)}
                                                        size={50}
                                                        className="text-red-500 cursor-pointer hover:text-red-700 inline-block" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                            <button
                                onClick={finalSubmit}
                                disabled={!isConteneurValid() || loading}
                                className={`relative px-3 py-2 text-lg rounded-md w-full text-white ${isConteneurValid() ? "bg-blue-500" : "bg-blue-100 cursor-not-allowed"}`}
                            >
                                {loading ? (
                                    <div className="flex justify-center items-center">
                                        Patientez...
                                    </div>
                                ) : (
                                    isEditMode ? "Modifier" : "Valider"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}
const InputField = ({ label, name, onChange, value, inputHandle, type = "text", readOnly = false, placeholder = "" }) => (
    <div className="flex flex-col mb-3">
        <label htmlFor={name} className="text-sm sm:text-lg font-semibold mb-2">{label}</label>
        <input
            value={value}
            onChange={onChange}
            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md text-xs sm:text-sm"
            type={type}
            name={name}
            id={name}
            readOnly={readOnly}
            placeholder={placeholder}

        />
    </div>
);

const InfoField = ({ label, value }) => (
    <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-sm sm:text-base">{label}</span>
        <span className="text-sm sm:text-base">{value}</span>
    </div>

);
export default AjoutMbl
