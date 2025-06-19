import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "./../../../context/ThemeContext";
import { LIGHT_THEME } from "./../../../constants/themeConstants";
import LogoBlue from "./../../../assets/images/black.png";
import LogoWhite from "./../../../assets/images/black.png";
import {
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineSettings,
  MdGroups,
  MdContactMail,
  MdLocalShipping,
  MdDescription,
  MdTrackChanges,
  MdInventory,
  MdSwapHoriz,
} from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Sidebar.scss";
import { SidebarContext } from "../../../context/SidebarContext";
import { AccountService } from './../../../_services/Account.service';
import idUserConnected from "../../../constants/idUserConnected";
import { useTypeUserConnected } from "../../../constants/typeUserConnected";

const Sidebar = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen); // Inverse l'état du sous-menu
  };
  const location = useLocation(); // Récupérer l'URL actuelle
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const typeEmploye = useTypeUserConnected();

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate()

  const Deconnection = () => {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous allez être déconnecté(e).",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Déconnecter!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        AccountService.logout();
        window.location.reload();
        navigate('/');
      }
    });
  }

  return (
    <nav
      className={
        // `
        'sidebar'
        //  ${isSidebarOpen ? 
        // "sidebar-show" : ""
        // }
        // `
      }
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" sizes="24"/>
          <span className="sidebar-brand-text">Primex Logistics</span>
        </div>
        <button className="sidebar-close-btn"
          onClick={closeSidebar}
        >
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/admin/dashboard"
                className={`menu-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
              >

                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            { typeEmploye=== "Administrateur" && (
            <li className="menu-item">
              <Link to="/admin/employe"

                className={`menu-link ${location.pathname === '/admin/employe' ? 'active' : ''}`}
              >
                <span className="menu-link-icon">
                  <MdGroups size={20} />
                </span>
                <span className="menu-link-text">Employé</span>
              </Link>
            </li>)
            }

            <li className="menu-item">
              <Link to="/admin/client"

                className={`menu-link ${location.pathname === '/admin/client' ? 'active' : ''}`}
              >
                <span className="menu-link-icon">
                  <MdGroups size={20} />
                </span>
                <span className="menu-link-text">Client</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/transport">
                <div className={`menu-link cursor-pointer ${location.pathname === '/admin/transport' ? 'active' : ''}`}>
                  <span className="menu-link-icon">
                    <MdLocalShipping size={20} />
                    <span className="menu-link-text">Transport</span>
                  </span>
                </div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/transaction">
                <div className={`menu-link cursor-pointer ${location.pathname === '/admin/transaction' ? 'active' : ''}`}>
                  <span className="menu-link-icon">
                    <MdSwapHoriz size={20} />
                    <span className="menu-link-text">Expedition</span>
                  </span>
                </div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/suivi"
                className={`menu-link ${location.pathname === '/admin/suivi' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdTrackChanges size={18} />
                </span>
                <span className="menu-link-text">Suivi</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="/admin/document"
                className={`menu-link ${location.pathname === '/admin/document' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdDescription size={18} />
                </span>
                <span className="menu-link-text">Document</span>
              </Link>
            </li>


          </ul>
        </div>
        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Parametre</span>
              </Link>
            </li>
            <li className="menu-item" title="logout" onClick={Deconnection}>
              <span to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Deconnecter</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
