import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdSearch, MdClear } from 'react-icons/md';
const AjoutMarchandisehwb = ({ handleClose, allMarchandiseHwb, isEditMode, selectedPerson }) => {

    const [transAeriennes, setTransAeriennes] = useState([]);
    const [error, setError] = useState();
    const [selectedAerienne, setSelectedAerienne] = useState(null);
    const [searchTermT, setSearchTermT] = useState("");


    const formArray = [1, 2];
    const [formNo, setFormNo] = useState(formArray[0]);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        description: '',
        numConteneur: "",
        typeConteneur: "",
        numPlomb: "",
        nature: "",
        poid: "",
        volume: "",
        nbColis: "",
        HWB: "",
        clientDest: "",
        clientExp: "",
        dateHWBTransaction: "",
        creerPar: idEmploye,
        modifierPAr: idEmploye
    });

    const fetchTransAeriennes = async () => {
        const response = await fetch("http://localhost:3001/hwbTransaction/");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        // console.log(response);

        return await response.json();
    };
    const handleSelectA = (trans) => {
        if (selectedAerienne && selectedAerienne.idTransactionAerienne === trans.idTransactionAerienne) {
            setSelectedAerienne(null);
        } else {
            setSelectedAerienne(trans);
            setState(prevState => ({
                ...prevState,
                HWB: trans.numHWB,
                idHWBTransaction: trans.idHWBTransaction,
                numHWB: trans.numHWB,
                clientExp: trans.clientExp.nomClient,
                clientDest: trans.clientDest.nomClient,
                dateHWBTransaction: trans.dateHWBTransaction,
            }));
        }
        console.log(trans);

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
            // Si en mode édition, remplir les champs avec les informations de la personne sélectionnée
            setState({
                description: selectedPerson.description || '',
                numConteneur: selectedPerson.numConteneur || '',
                typeConteneur: selectedPerson.typeConteneur || '',
                numPlomb: selectedPerson.numPlomb || '',
                nature: selectedPerson.nature || '',
                nbColis: selectedPerson.nbColis || '',
                volume: selectedPerson.volume || '',
                poid: selectedPerson.poid || '',
                HWB: selectedPerson.HWB || '',
                creerPar: selectedPerson.creerPar || idEmploye,
                modifierPar: idEmploye,
            });
        } else {
            // Sinon, réinitialiser les champs
            setState({
                description: '',
                numConteneur: "",
                typeConteneur: "",
                numPlomb: "",
                nature: "",
                poid: "",
                volume: "",
                nbColis: "",
                HWB: "",
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
    const isStep2Valid = () => {
        return state.description && state.nature && state.poid && state.volume && state.nbColis && state.numConteneur && state.typeConteneur && state.numPlomb;
    };
    const isStep1Valid = () => {
        return state.HWB;
    };
    const next = () => {
        if (formNo === 1 && isStep1Valid()) {
            setFormNo(formNo + 1);
        } else if (formNo === 2 && isStep2Valid()) {
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
            axios
                .put(`http://localhost:3001/marchandiseHWB/${selectedPerson.idMarchandiseHWB}`, state)
                .then((res) => {
                    toast.success("Marchandise modifié avec succès");
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'Le Marchandise a été modifié.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allMarchandiseHwb();
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
            axios
                .post("http://localhost:3001/marchandiseHWB/", state)
                .then((res) => {
                    Swal.fire({
                        title: 'Ajouté!',
                        text: 'Le Marchandise a été ajouté.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allMarchandiseHwb();
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
    const filteredAerienne = transAeriennes.filter(
        (trans) =>
            trans.numHWB.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.dateHWBTransaction.toLowerCase().includes(searchTermT.toLowerCase())
    );

    return (
        <div className="car w-full mx-auto rounded-md shadow-md bg-white p-5">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-blue-600">
            {isEditMode ? "Modifier une Marchandise" : "Ajouter une Marchandise"}
        </h2>

        <div className="flex items-center w-full mb-4">
            {formArray.map((v, i) => (
                <React.Fragment key={i}>
                    <div className="flex flex-col items-center w-full">
                        <div
                            className={`w-[35px] h-[35px] my-3 text-white rounded-full ${
                                formNo - 1 > i ? 'bg-green-500' : formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length
                                    ? 'bg-green-500'
                                    : 'bg-slate-400'
                            } flex justify-center items-center`}
                        >
                            {formNo - 1 > i ? '✓' : v}
                        </div>

                        <div className="text-xs sm:text-sm mt-1 text-center text-green-500 font-semibold">
                            {i === 1 && 'INFORMATION MARCHANDISE'}
                            {i === 0 && 'EXPEDITION AERIENNE HWB'}
                        </div>
                    </div>

                    {i !== formArray.length - 1 && (
                        <div
                            className={`h-[2px] w-full ${
                                formNo - 1 > i ? 'bg-green-500' : formNo === i + 2 || formNo === formArray.length
                                    ? 'bg-green-500'
                                    : 'bg-slate-400'
                            }`}
                            style={{ marginLeft: '0px', marginRight: '0px' }}
                        ></div>
                    )}
                </React.Fragment>
            ))}
        </div>

        {formNo === 2 && (
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                    <InputField label="N° Conteneur" name="numConteneur" value={state.numConteneur} inputHandle={inputHandle} />
                    <InputField label="Type Conteneur" name="typeConteneur" value={state.typeConteneur} inputHandle={inputHandle} />
                    <InputField label="N° Plomb" name="numPlomb" value={state.numPlomb} inputHandle={inputHandle} />
                    <InputField label="Description" name="description" value={state.description} inputHandle={inputHandle} />
                </div>
                <div className="w-full md:w-1/2">
                    <InputField label="Nature" name="nature" value={state.nature} inputHandle={inputHandle} />
                    <InputField label="Poids" name="poid" value={state.poid} inputHandle={inputHandle} type="number" />
                    <InputField label="Volume" name="volume" value={state.volume} inputHandle={inputHandle} type="number" />
                    <InputField label="Nombre de Colis" name="nbColis" value={state.nbColis} inputHandle={inputHandle} type="number" />
                    <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                    <button onClick={pre} className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500">
                        Précédent
                    </button>
                    <button
                        onClick={finalSubmit}
                        disabled={!isStep2Valid()}
                        className={`px-3 py-2 text-lg rounded-md w-full text-white ${
                            isStep2Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                        }`}
                    >
                        {isEditMode ? "Modifier" : "Ajouter"}
                    </button>
                </div>
                </div>
                
            </div>
        )}
        {formNo === 1 && (
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                    <InputField label="HWB" name="HWB" value={state.HWB} inputHandle={inputHandle} readOnly />
                    <InfoField label="Client Expediteur:" value={state.clientExp || "------"} />
                    <InfoField label="Client Destinataire:" value={state.clientDest || "------"} />
                    <InfoField label="Date Transaction:" value={state.dateHWBTransaction ? new Date(state.dateHWBTransaction).toISOString().slice(0, 10) : "------"} />
                    <div className="mt-4 gap-3 flex justify-center items-center">
                        <button
                            onClick={pre}
                            disabled={formNo === 1}
                            className={`px-3 py-2 text-lg rounded-md w-full text-white ${
                                formNo === 1 ? 'bg-blue-100 cursor-not-allowed' : 'bg-blue-500'
                            }`}
                        >
                            Précédent
                        </button>
                        <button
                            onClick={next}
                            disabled={!isStep1Valid()}
                            className={`px-3 py-2 text-lg rounded-md w-full text-white ${
                                isStep1Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                            }`}
                        >
                            Suivant
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Transaction HWB disponible</h2>
                    <div className="searchContainer flex items-center gap-2">
                        <MdSearch className="searchIcon" />
                        <input
                            type="text"
                            placeholder="Recherche..."
                            value={searchTermT}
                            onChange={(e) => setSearchTermT(e.target.value)}
                            className="searchInput mb-4 w-full p-2 border border-gray-300 rounded-md"
                        />
                        {searchTermT && <MdClear className="clearIcon cursor-pointer" onClick={() => setSearchTermT('')} />}
                    </div>

                    <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                        <table className="table-auto w-full text-left border-collapse">
                            <thead className="text-white bg-blue-200">
                                <tr>
                                    <th className="py-2 px-2 text-left">#</th>
                                    <th className="py-2 mx-8 text-left">Num HWB</th>
                                    <th className="py-2 px-4 text-left">Expediteur</th>
                                    <th className="py-2 px-4 text-left">Destinataire</th>
                                    <th className="py-2 px-4 text-left">Date Destination</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-2">
                                {filteredAerienne.map((trans, index) => (
                                    <tr
                                        key={trans.idHWBTransaction}
                                        onClick={() => handleSelectA(trans)}
                                        className={`hover:bg-blue-200 ${
                                            trans === selectedAerienne ? 'bg-blue-500 text-white' : ''
                                        } ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'}`}
                                    >
                                        <td>
                                            <input type="checkbox" checked={trans === selectedAerienne} readOnly />
                                        </td>
                                        <td className="py-2 px-4">{trans.numHWB}</td>
                                        <td>{trans.clientDest.nomClient}</td>
                                        <td>{trans.clientExp.nomClient}</td>
                                        <td>{new Date(trans.dateHWBTransaction).toLocaleDateString('fr-FR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}
        <ToastContainer />
    </div>
);
}

const InputField = ({ label, name, value, inputHandle, type = "text", readOnly = false }) => (
<div className="flex flex-col mb-3">
    <label htmlFor={name} className="text-sm sm:text-lg font-semibold mb-2">{label}</label>
    <input
        value={value}
        onChange={inputHandle}
        className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md text-xs sm:text-sm"
        type={type}
        name={name}
        id={name}
        readOnly={readOnly}
    />
</div>
);
const InfoField = ({ label, value }) => (
<div className="flex items-center gap-2 mb-2">
    <span className="font-semibold text-sm sm:text-base">{label}</span>
    <span className="text-sm sm:text-base">{value}</span>
</div>

);

export default AjoutMarchandisehwb