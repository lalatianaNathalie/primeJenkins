"use employe";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import idUserConnected from "../../../constants/idUserConnected";
import "../clients/ajoutClient/AjoutCli.scss"
import api from "../../../axiosInstance";

const AjoutEmploye = ({ handleClose, allEmploye, selectedPerson }) => {
  const idEmploye = idUserConnected();
  const [state, setState] = useState({
    nomEmploye: "",
    typeEmploye: "",
    emailEmploye: "",
    motDePasse: "",
    creerPar: idEmploye,
    modifierPar: idEmploye,
  });

  useEffect(() => {
    setState({
      nomEmploye: "",
      typeEmploye: "",
      emailEmploye: "",
      motDePasse: "",
      creerPar: idEmploye,
      modifierPar: idEmploye,
    });

  }, [, selectedPerson, idEmploye]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeData = {
      nomEmploye: state.nomEmploye,
      emailEmploye: state.emailEmploye,
      typeEmploye: state.typeEmploye,
      motDePasse: state.motDePasse,
      modifierPar: state.modifierPar,
      creerPar: state.creerPar,
    };

    // Requête POST pour ajouter un nouvel employé
    api.post("/employe/", employeData)
      .then(() => {
        Swal.fire({
          title: 'Ajouté!',
          text: `Le employé a été ajouté avec succès.`,
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        });
        allEmploye();
        handleClose();
      })
      .catch((err) => {
        toast.error(err.response?.data.error || err.message);
      });
  };


  const isFormValid = () => {
    return state.nomEmploye && state.typeEmploye && state.emailEmploye;
  };

  const handleCancel = () => {
    setState({
      nomEmploye: "",
      typeEmploye: "",
      emailEmploye: "",
      motDePasse: "",
      creerPar: idEmploye,
      modifierPar: idEmploye,
    });
    handleClose();
  };

  return (
    <div className="ajout-cli-container">
      <h2 className="ajout-cli-title">
        Ajouter un employe
      </h2>
      <form onSubmit={handleSubmit} className="ajout-cli-form">
        <div className="form-group">
          <label htmlFor="nomEmploye" className="form-label">
            Nom employe
          </label>
          <input
            value={state.nomEmploye}
            onChange={(e) => {
              const nom = e.target.value;
              setState((prevState) => ({
                ...prevState,
                nomEmploye: nom,
                motDePasse: nom, // Remplit automatiquement le champ mot de passe
              }));
            }}
            className="form-input"
            type="text"
            name="nomEmploye"
            placeholder="Nom de l'employé"
            id="nomEmploye"
          />
        </div>

        <div className="form-group">
          <label htmlFor="typeEmploye" className="form-label">
            Type
          </label>
          <select
            value={state.typeEmploye}
            onChange={inputHandle}
            className="form-input"
            name="typeEmploye"
            id="typeEmploye"
          >
            <option value="">-- Sélectionnez un type --</option>
            <option value="Employe">Employé</option>
            <option value="Administrateur">Administrateur</option>
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="emailEmploye" className="form-label">
            Adresse email
          </label>
          <input
            value={state.emailEmploye}
            onChange={inputHandle}
            className="form-input"
            type="email"
            name="emailEmploye"
            placeholder="Email"
            id="emailEmploye"
          />
        </div>
        <div className="form-group">
          <label htmlFor="motDePasse" className="form-label">
            Mot de passe
          </label>
          <input
            value={state.motDePasse}
            onChange={inputHandle}
            className="form-input"
            type="password"
            name="motDePasse"
            placeholder="Mot de passe"
            id="motDePasse"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Annuler
          </button>
          <button type="submit" disabled={!isFormValid()} className={`btn-submit ${isFormValid() ? "active" : ""}`}>
            Ajouter
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AjoutEmploye;
