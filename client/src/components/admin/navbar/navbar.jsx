import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FaBell,
  FaUserCircle,
  FaUser,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { AccountService } from "../../../_services/Account.service";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdWbSunny } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../../../context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "../../../constants/themeConstants";
import { useNameUserConnected } from "../../../constants/nameUserConnected";
import { useTypeUserConnected } from "../../../constants/typeUserConnected";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  let typeEmploye = useTypeUserConnected()
  const nameUserConnected = useNameUserConnected();

  const Deconnection = () => {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Vous allez être déconnecté(e).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Annuler",
      confirmButtonText: "Déconnecter!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        AccountService.logout();
        window.location.reload();
        navigate("/");
      }
    });
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" bg-blue-700 p-4 flex justify-end items-center">
      <div className="flex items-center space-x-4">
        {/* Icone de notification */}
        <button className="text-white hover:text-gray-300">
          <FaBell size={20} />
        </button>
        <button
          className="text-white hover:text-gray-300"
          onClick={toggleTheme}
          title={theme === LIGHT_THEME ? "Activer le mode sombre" : "Activer le mode clair"}
        >
          {theme === LIGHT_THEME ? (
            <MdDarkMode size={25} />
          ) : (
            <MdWbSunny size={25} />
          )}
        </button>
        {/* Icone de profil */}

        <div className="relative" ref={profileMenuRef}>

          <button
            onClick={toggleProfileMenu}
            className="text-white hover:text-gray-300 flex gap-1"
          >
            <FaUserCircle size={24} />


            {typeEmploye === "Employe" ? <p>{nameUserConnected}</p> :
              <p>Admin</p>}
          </button>


          {/* Menu déroulant du profil */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg overflow-hidden border border-gray-200 z-50">
              <Link
                 to="/admin/profil"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FaUser className="mr-2 text-gray-400" />
                Mon profil
              </Link>
              <Link
                to="/admin/profiledit"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FaEdit className="mr-2 text-gray-400" />
                Modifier profil
              </Link>
              <li
                onClick={Deconnection}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                <FaSignOutAlt className="mr-2 text-gray-400" />
                Déconnecter
              </li>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
