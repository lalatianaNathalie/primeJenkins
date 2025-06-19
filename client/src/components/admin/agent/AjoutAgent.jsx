import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from "axios";
import api from "../../../axiosInstance";

const AjoutAgent = ({ handleClose, allAgent, isEditMode, selectedPerson }) => {

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        nomAgent: "",
        paysAgent: "",
        contactAgent: "",
        adresseAgent: "",
        creerPar: idEmploye,
        modifierPar: idEmploye,
    });

    useEffect(() => {

        if (isEditMode && selectedPerson) {
            // Si en mode édition, remplir les champs avec les informations de la personne sélectionnée
            setState({
                nomAgent: selectedPerson.nomAgent || '',
                paysAgent: selectedPerson.paysAgent || '',
                adresseAgent: selectedPerson.adresseAgent || '',
                contactAgent: selectedPerson.contactAgent || '',
                modifierPar: idEmploye,
            });
        } else {
            // Sinon, réinitialiser les champs
            setState({
                nomAgent: "",
                paysAgent: "",
                contactAgent: "",
                adresseAgent: "",
                creerPar: idEmploye,
                modifierPar: idEmploye,
            });
        }
    }, [isEditMode, selectedPerson, idEmploye]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const agentData = {
            nomAgent: state.nomAgent,
            contactAgent: state.contactAgent,
            paysAgent: state.paysAgent,
            adresseAgent: state.adresseAgent,
            modifierPar: state.modifierPar,
            creerPar: state.creerPar
        };

        if (isEditMode) {
            // Mode modification
            delete state['creerPar']; 
            api
                .put(`/agent/${selectedPerson.idAgent}`, agentData)
                .then((res) => {
                    toast.success("agent modifié avec succès");
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'Le agent a été modifié.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allAgent();
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
            // Mode ajout      
            api
                .post("/agent/", agentData)
                .then((res) => {
                    Swal.fire({
                        title: 'Ajouté!',
                        text: 'Le agent a été ajouté.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allAgent();
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

    const isFormValid = () => {
        return state.nomAgent && state.paysAgent && state.contactAgent && state.adresseAgent;
    };

    const handleCancel = () => {
        setState({
            nomAgent: "",
            paysAgent: "",
            contactAgent: "",
            adresseAgent: "",
            creerPar: idEmploye,
            modifierPar: idEmploye,
        });
        handleClose();
    };
    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                {isEditMode ? "Modifier un agent" : "Ajouter un agent"}
            </h2>
            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
                <div className="flex w-full flex-col mb-4 flex-grow">
                    <label
                        htmlFor="nomAgent"
                        className="text-lg font-semibold mb-2 text-blue-400"
                    >
                        Nom agent
                    </label>
                    <input
                        value={state.nomAgent}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
                        type="text"
                        name="nomAgent"
                        placeholder="Nom du agent"
                        id="nomAgent"
                    />
                </div>

                <div className="flex w-full flex-col mb-4 flex-grow">
                    <label
                        htmlFor="paysAgent"
                        className="text-lg font-semibold mb-2 text-blue-400"
                    >
                        Pays Agent
                    </label>
                    <input
                        value={state.paysAgent}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
                        type="text"
                        name="paysAgent"
                        placeholder="Pays"
                        id="paysAgent"
                    />
                </div>

                <div className="flex w-full flex-col mb-4 flex-grow">
                    <label
                        htmlFor="contactAgent"
                        className="text-lg font-semibold mb-2 text-blue-400"
                    >
                        Adresse Agent
                    </label>
                    <input
                        value={state.adresseAgent}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
                        type="text"
                        name="adresseAgent"
                        placeholder="adresse Agent"
                        id="adresseAgent"
                    />
                </div>
                <div className="flex w-full flex-col mb-4 flex-grow">
                    <label
                        htmlFor="contactAgent"
                        className="text-lg font-semibold mb-2 text-blue-400"
                    >
                        Contact Agent
                    </label>
                    <input
                        value={state.contactAgent}
                        onChange={inputHandle}
                        className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
                        type="text"
                        name="contactAgent"
                        placeholder="Contact"
                        id="contactAgent"
                    />
                </div>


                <div className="w-full mt-4 flex justify-between space-x-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-blue-100 text-gray-700 rounded-md flex-1 mr-2"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`px-4 py-2 text-white rounded-md flex-1 ${isFormValid() ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
                            }`}
                    >
                        {isEditMode ? "Modifier" : "Ajouter"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default AjoutAgent
