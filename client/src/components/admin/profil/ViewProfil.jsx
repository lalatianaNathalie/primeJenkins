import React, { useEffect, useState } from 'react';
import { FaCamera, FaEnvelope, FaUser, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'; // Ajoutez plus d'icônes
import Profil from "../../../assets/images/profil.jpg";
import { Link } from 'react-router-dom';
import api from '../../../axiosInstance';
import idUserConnected from '../../../constants/idUserConnected';

function ViewProfil() {
  const [profil, setProfil] = useState([]);
  const id = idUserConnected()
  useEffect(() => {
    getMyInfo();
  }, [])
  const getMyInfo = async () => {
    try {
      const res = await api.get(`/employe/${id}`);
      const {
        nomEmploye,
        emailEmploye,
        typeEmploye
      } = res.data;
      setProfil({
        nomEmploye,
        emailEmploye,
        typeEmploye
      });

      console.log(res);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations :", error);
    }
  }
  const profile = {
    profilePhoto: Profil,
    name: 'Mino Prisca',
    email: 'example@example.com',
    username: 'minoprisca12',
    bio: "Gestionnaire passionnée de technologies et d'innovations",
    birthdate: "10 Janvier 1995",
    phone: "+261 34 12 345 67",
    address: "Antananarivo, Madagascar",
    profession: " Gestionnaire Logiciel",
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
          <img
            src={profile.profilePhoto}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <button
            className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 flex items-center justify-center hover:bg-gray-700"
            title="Changer la photo"
          >
            <FaCamera className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{profil.nomEmploye}</h2>
        <p className="text-sm sm:text-base text-gray-600 italic">{profil.typeEmploye}</p>
      </div>

      <div className="space-y-4 mt-4 text-left">
        <div className="flex items-center">
          <FaUser className="text-blue-500 mr-2" />
          <div>
            <h3 className="text-xs font-medium text-gray-700">Nom d'utilisateur</h3>
            <p className="text-base text-gray-900">{profil.emailEmploye}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaEnvelope className="text-blue-500 mr-2" />
          <div>
            <h3 className="text-xs font-medium text-gray-700">Adresse Email</h3>
            <p className="text-base text-gray-900">{profil.emailEmploye}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaBirthdayCake className="text-blue-500 mr-2" />
          <div>
            <h3 className="text-xs font-medium text-gray-700">Date de naissance</h3>
            <p className="text-base text-gray-900">{profile.birthdate}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaPhone className="text-blue-500 mr-2" />
          <div>
            <h3 className="text-xs font-medium text-gray-700">Téléphone</h3>
            <p className="text-base text-gray-900">{profile.phone}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <div>
            <h3 className="text-xs font-medium text-gray-700">Adresse</h3>
            <p className="text-base text-gray-900">{profile.address}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaBriefcase className="text-blue-500 mr-2" />
          <div>
            <h3 className="text-xs font-medium text-gray-700">Profession</h3>
            <p className="text-base text-gray-900">{profile.profession}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Link to="/admin/profiledit">
          <button
            type="button"
            className="w-full sm:w-auto py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Modifier le profil
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ViewProfil;
