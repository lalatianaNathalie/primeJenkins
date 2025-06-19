import React, { useEffect, useState } from "react";
import {
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import Profil from "../../../assets/images/profil.jpg";
import idUserConnected from "../../../constants/idUserConnected";
import api from "../../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
function EditProfil() {
  const id = idUserConnected();
  const [profile, setProfile] = useState({
    profilePhoto: Profil,
  });

  const [profil, setProfil] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    try {      
      const res = await api.get(`/employe/${id}`);      
      const { nomEmploye, emailEmploye, typeEmploye, motDePasse } = res.data;
      setProfil({
        nomEmploye,
        emailEmploye,
        typeEmploye,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des informations :", error);
    }
  };

  const updateInfo = async () => {

    try {
      const res = await api.put(`/employe/${id}`, {
        nomEmploye: profil.nomEmploye,
        emailEmploye: profil.emailEmploye,
        typeEmploye: profil.typeEmploye,
        newPwd: passwordData.newPwd,
        oldPwd: passwordData.oldPwd,
      });
      localStorage.setItem('userName', profil.nomEmploye);
      // Affiche un toast de succès si la mise à jour est réussie
      toast.success("Profil mis à jour avec succès!");
      console.log(res.data);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      if (err.response) {
        toast.error(
          err.response.data.error ||
            "Erreur lors de la mise à jour des informations."
        );
      } else {
        toast.error("Erreur de connexion réseau. Veuillez réessayer.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfil({ ...profil, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });

    if (name === "newPwd") {
      evaluatePasswordStrength(value);
    } else if (name === "confirmPassword") {
      setPasswordMatch(value === passwordData.newPwd);
    }
  };

  const evaluatePasswordStrength = (password) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 6) {
      setPasswordStrength("faible");
      setPasswordMessage(
        "Le mot de passe doit comporter au moins 6 caractères."
      );
    } else {
      setPasswordMessage("");

      if (hasLetters && !hasNumbers && !hasSpecialChars) {
        setPasswordStrength("faible");
      } else if (hasLetters && hasNumbers && !hasSpecialChars) {
        setPasswordStrength("moyen");
      } else if (hasLetters && hasNumbers && hasSpecialChars) {
        setPasswordStrength("fort");
      } else {
        setPasswordStrength("faible");
      }
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
    setPasswordData({
      oldPwd: "",
      newPwd: "",
      confirmPassword: "",
    });
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mb-4">
          <img
            src={profile.profilePhoto}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <label className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
            <FaCamera className="w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
        <input
          type="text"
          name="nomEmploye"
          value={profil.nomEmploye}
          onChange={handleInputChange}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 border-b-2 border-gray-300 text-center w-full"
        />
      </div>

      <div className="space-y-4 text-left">
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-blue-600" />
          <input
            type="email"
            name="emailEmploye"
            value={profil.emailEmploye}
            onChange={handleInputChange}
            placeholder="Email"
            className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
          />
        </div>

        {showPasswordFields && (
          <div className="mt-4 space-y-4">
            {["oldPwd", "newPwd", "confirmPassword"].map((field, index) => (
              <div key={index} className="relative flex items-center space-x-2">
                <FaLock className="text-blue-600" />
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  value={passwordData[field]}
                  onChange={handlePasswordChange}
                  placeholder={
                    field === "oldPwd"
                      ? "Mot de passe actuel"
                      : field === "newPwd"
                      ? "Nouveau mot de passe"
                      : "Confirmer le nouveau mot de passe"
                  }
                  className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
                />
                <span
                  onClick={() => toggleShowPassword(field)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            ))}

            {/* Indicateur de force du mot de passe */}
            {passwordData.newPwd && (
              <div
                className={`text-sm font-semibold ${
                  passwordStrength === "faible"
                    ? "text-red-500"
                    : passwordStrength === "moyen"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Mot de passe{" "}
                {passwordStrength.charAt(0).toUpperCase() +
                  passwordStrength.slice(1)}
              </div>
            )}

            {/* Message d'erreur pour confirmation de mot de passe */}
            {!passwordMatch && (
              <div className="text-red-500 text-sm font-semibold">
                Les mots de passe ne correspondent pas.
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            onClick={togglePasswordFields}
            className="text-blue-600 hover:underline text-sm sm:text-base"
          >
            {showPasswordFields
              ? "Annuler le changement de mot de passe"
              : "Changer le mot de passe"}
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={updateInfo}
            type="button"
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Mettre à jour le profil
          </button>
        </div>
      </div>
      {/* Container for Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default EditProfil;
