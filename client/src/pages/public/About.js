import React from 'react'
import Primex from './../../components/public/Apropos/Primex/Primex';
import { useTranslation } from "react-i18next"; 

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="About screen-buplic" >
        <h1 className="primaryText" 
        style={{textAlign: 'center',padding: '1rem'}}>{t('about')}</h1>
        <Primex/>
    </div>
  )
}

export default About
