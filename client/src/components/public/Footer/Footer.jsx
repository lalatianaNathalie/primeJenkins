import React from "react";
import { email, adr, tel } from "../../../constants/Coordonee";
import { isMobile } from "react-device-detect";
import footerData from "./footerData.json";
import "./Footer.css";
import { FaLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { IoCall } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  const location = adr;
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}`;
  const subject = "Demande de renseignements";
  const body = "Bonjour, je voudrais plus d'informations concernant...";

  return (
    <div className="footer ">
      <div className="footer1">
        {footerData.map((card, i) => (
          <div className="first" key={i}>
            <div className="primaryText"> {t(card.title)}</div>
            <div>
              {card.element.map((elem, index) => (
                <span className="element secondaryText" key={index}>
                  {t(elem)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="footer2">
        <div className="first">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <FaLocationDot />
          </span>
          <span className="label">{adr}</span>
          </a>
        </div>
        <div className="first">
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon">
              <SiGmail />
            </span>
            <span className="label"> {email}</span>
          </a>
        </div>
        <div className="first">
          {isMobile ? (
            <a href={`tel:${tel}`}>
              <span className="icon">
                <IoCall />
              </span>
              <span className="label">{tel}</span>
            </a>
          ) : (
            <div>
              <span className="icon">
                <IoCall />
              </span>
              <span className="label">{tel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
