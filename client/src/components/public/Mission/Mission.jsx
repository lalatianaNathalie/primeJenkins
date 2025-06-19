import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation } from 'react-i18next';
import Typography from "@mui/material/Typography";
import data from "./accordion";
import "./Mission.css";

const Mission = () => {
  const { t } = useTranslation(); 
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <div>
      <div className="paddings innerWidth  flexCenter c-container">
        {/* Left side */}
        <div className="flexColCenter c-left">
          <span className="orangeText">{t('our_missions')}</span>
          <span className="primaryText">{t('value_we_give')}</span>
          <span className="secondaryText">
          {t('mission_description')}
          
          </span>
          <div>
            {data.map((item) => {
              return (
                <Accordion key={item.id} className="accordion">
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="head-accordion"
                  >
                    {/* Icône + Titre dans l'entête */}
                    <div className="flexCenter icon">{item.icon}</div>
                    <span className="primaryText">{t(item.heading)}</span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="secondaryText">
                    {t(item.detail)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
        {/* rigth side */}
        <motion.div
          className="flexCenter c-right"
          ref={sectionRef}
          initial={{ opacity: 0.6, x: 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 3 }}
        >
          <div className=" image-container ">
            <img src="./mission.jpg" alt={t('mission_image_alt')} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mission;
