// AjoutCli.jsx
"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import idUserConnected from './../../../../constants/idUserConnected';
import './AjoutCli.scss';
import api from "../../../../axiosInstance";

const AjoutCli = ({ handleClose, allClient, isEditMode, selectedPerson }) => {
  const idEmploye = idUserConnected();
  const [state, setState] = useState({
    nomClient: "",
    CINClient: "",
    emailClient: "",
    creerPar: idEmploye,
    modifierPar: idEmploye,
  });

  useEffect(() => {
    if (isEditMode && selectedPerson) {
      setState({
        nomClient: selectedPerson.nomClient || '',
        CINClient: selectedPerson.CINClient || '',
        emailClient: selectedPerson.emailClient || '',
        modifierPar: idEmploye,
      });
    } else {
      setState({
        nomClient: "",
        CINClient: "",
        emailClient: "",
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
    const clientData = {
      nomClient: state.nomClient,
      emailClient: state.emailClient,
      CINClient: state.CINClient,
      modifierPar: state.modifierPar,
      creerPar: state.creerPar
    };

    const request = isEditMode 
      ? api.put(`/client/${selectedPerson.idClient}`, clientData)
      : api.post("/client/", clientData);

    request
      .then(() => {
        Swal.fire({
          title: isEditMode ? 'Modifié!' : 'Ajouté!',
          text: `Le client a été ${isEditMode ? 'modifié' : 'ajouté'}.`,
          icon: 'success',
          timer: 3000,
          showConfirmButton: false, 
        });
        allClient();
        handleClose();
      })
      .catch((err) => {
        toast.error(err.response?.data.error || err.message);
      });
  };

  const isFormValid = () => {
    return state.nomClient && state.CINClient && state.emailClient;
  };

  const handleCancel = () => {
    setState({
      nomClient: "",
      CINClient: "",
      emailClient: "",
      creerPar: idEmploye,
      modifierPar: idEmploye,
    });
    handleClose();
  };

  return (
    <div className="ajout-cli-container">
      <h2 className="ajout-cli-title">
        {isEditMode ? "Modifier un Client" : "Ajouter un Client"}
      </h2>
      <form onSubmit={handleSubmit} className="ajout-cli-form">
        <div className="form-group">
          <label htmlFor="nomClient" className="form-label">
            Nom Client
          </label>
          <input
            value={state.nomClient}
            onChange={inputHandle}
            className="form-input"
            type="text"
            name="nomClient"
            placeholder="Nom du Client"
            id="nomClient"
          />
        </div>

        <div className="form-group">
          <label htmlFor="CINClient" className="form-label">
            CIN
          </label>
          <input
            value={state.CINClient}
            onChange={inputHandle}
            className="form-input"
            type="text"
            name="CINClient"
            placeholder="Numéro CIN"
            id="CINClient"
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailClient" className="form-label">
            Adresse email
          </label>
          <input
            value={state.emailClient}
            onChange={inputHandle}
            className="form-input"
            type="email"
            name="emailClient"
            placeholder="Email"
            id="emailClient"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Annuler
          </button>
          <button type="submit" disabled={!isFormValid()} className={`btn-submit ${isFormValid() ? "active" : ""}`}>
            {isEditMode ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AjoutCli;
