import './Page1.css'
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
const Page1 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <section className="container-section">
        <div className="page1">
          <div className="content">
            <motion.h3
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 4,
                type: "spring"
              }}
            >
               {t('simplify_operations')}</motion.h3>
            <motion.h1
              initial={{ x: "8rem" }}
              animate={{ x: 0 }}
              transition={{
                duration: 3,
                type: "spring"
              }}
            >{t('we_transport_goods')}</motion.h1> <h3>{t('in_security')}<span>{t('on_time')}</span></h3>
            <p> {t('trust_partner')}</p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Page1
