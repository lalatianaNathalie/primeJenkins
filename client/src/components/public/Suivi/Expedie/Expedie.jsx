import React from 'react'
import './Expedie.css'
import imgSuivi from './suivi.png'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';

const Expedie = () => {
  const { t } = useTranslation(); 

  return (
    <div className='expedie'>
      <motion.div className="e-left flexColCenter"
        initial={{ opacity: 0, x: "-5rem" }}
        animate={{ opacity: 1, x: "0" }}
        transition={{ type: "sping", duration: 1.5 }}
      >
        <h2 className="primaryText">{t('expedieTitle')}</h2>
        <p className='secondaryText'>{t('expedieText')}</p>
        <div className="btn-container flexSpace">
          {/* <div className="btn left">{t('track')}</div> */}
          <div className="btn">{t('track')}</div>
        </div>
      </motion.div>
      <motion.div className="e-right "
        initial={{ x: "10rem" }}
        animate={{ x: "0" }}
        transition={{ type: "sping", duration: 1.5 }}
      >
        <img src={imgSuivi} alt="" className='flexCenter' />
      </motion.div>
    </div>
  )
}

export default Expedie
