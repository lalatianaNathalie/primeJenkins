import './Primex.css'
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup'
import { useTranslation } from "react-i18next"; 
const Primex = () => {
    const { t } = useTranslation();
    const [isVisibleP, setIsVisibleP] = useState(false);
    const [isVisiblePt, setIsVisiblePt] = useState(false);
    const ptsectionRef = useRef(null);
    const psectionRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisibleP(true);
                    setIsVisiblePt(true);
                }
            },
            { threshold: 0.5 } // déclenchement lorsque 50% de la section est visible
        );
        if (psectionRef.current) {
            observer.observe(psectionRef.current);
        }
        if (ptsectionRef.current) {
            observer.observe(psectionRef.current);
        }
        // Cleanup de l'observateur
        return () => {
            if (psectionRef.current) {
                observer.unobserve(psectionRef.current);
            }
        };
    }, []);
    return (
        <div >
            <div className="i-container">
                <h1 className="primaryText">{t('primex.title')}</h1>
                <div className="compteur-down">
                    <div className="img">
                        <div className="compteur">
                            <div className="primaryText"> <span className="orangeText">+</span><CountUp start={200} end={1200} duration={4} />M</div>
                            <div className="libele ">{t('air_transport')}</div>
                        </div>
                    </div>
                    <div className="compteur">
                        <div className="primaryText"><span className="orangeText">+</span><CountUp start={5000} end={9000} duration={3} />M</div>
                        <div className="libele">{t('sea_transport')}</div>
                    </div>
                    <div className="compteur">
                        <div className="primaryText"><span className="orangeText">+</span> <CountUp start={8000} end={29000} duration={4} />M</div>
                        <div className="libele">{t('customsClearing')}</div>
                    </div>
                </div>

            </div>
            <div className='p-container'>
                <motion.div className="p-left"
                    ref={psectionRef}
                    initial={{ opacity: 0.6, x: -50 }}
                    animate={isVisibleP ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 4 }}
                >
                    <div className="image-container">
                        <img src="./exp.jpg" alt="" />
                    </div>
                </motion.div>
                <motion.div className="p-right"
                    ref={ptsectionRef}
                    initial={{ opacity: 0.6, x: 50 }}
                    animate={isVisiblePt ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 4 }}
                >
                    <h1 className="primaryText">{t('primex.aboutTitle')}</h1>
                    <p className="secondaryText">{t('primex.aboutText')}</p>
                </motion.div>

            </div>

        </div>

    )
}

export default Primex
