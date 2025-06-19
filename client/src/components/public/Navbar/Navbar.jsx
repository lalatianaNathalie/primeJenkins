"use client";
import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BsGlobe2 } from "react-icons/bs";
import { PiPlanetFill } from "react-icons/pi";
import OutsideClickHandler from "react-outside-click-handler";
import { useTranslation } from 'react-i18next';
import logo from "../../../assets/images/black.png"
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggle = () => {
    setToggleMenu((prevToggleMenu) => !prevToggleMenu);
  };
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };
  return (
    <nav className="pub-nav">
      <NavLink to="/" className={"logo menu"}>
        <img src={logo} />
      </NavLink>
      <label className="checkbtn" onClick={handleToggle}>
        <FiAlignJustify className="tiret" />
      </label>
      <OutsideClickHandler onOutsideClick={() => setToggleMenu(false)}>
      <div style={{ position: "relative" }}>
        <ul className={toggleMenu ? "toggle" : ""} id="menu">
        <div className="fermerute_menu icon" onClick={() => setToggleMenu(false)}><IoMdClose /></div>
          <li>
            <NavLink className={"menu"} to={"/"}>
            {t('home')}
            </NavLink>
          </li>
          <li>
            <NavLink className={"menu"} to={"/suivi"}>
            {t('tracking')}
            </NavLink>
          </li>
          <li>
            <NavLink className={"menu"} to={"/service"}>
            {t('service')}
            </NavLink>
          </li>
          <li>
            <NavLink className={"menu"} to={"/about"}>
            {t('about')}
            </NavLink>
          </li>
          <li>
            <NavLink className={"menu"} to={"/contact"}>
            {t('contact_us')}
            </NavLink>
          </li>
          <li className="btn">
            <NavLink className={"menu"} to={"/auth/login"}>
            {t('login')}
            </NavLink>
          </li>

          <div className="langue">
            <BsGlobe2 className="icon-menu" />
            <select name="langue" id="langue" onChange={handleLanguageChange} defaultValue="fr">
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>
        </ul>
      </div>
      </OutsideClickHandler>
    </nav>
  );
};
export default Navbar;
