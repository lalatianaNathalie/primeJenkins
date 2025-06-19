// import React from 'react'
import { BiSearchAlt } from "react-icons/bi";
import SlideService from "../../Slide-service/slideService";
import { MdSendTimeExtension } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Page2 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <section>
        <div className="page2">
          <motion.div
            className="box"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -70 }}
            transition={{ duration: 1.5 }}
          >
            {/* item de card box */}
            <div className="card-box">
              <div className=" item">
                <div className="img-bloc">
                  <GrServices className="icon" />
                  <span>{t('service')}</span>
                </div>
                <span className="separation"></span>
                <div className="text-bloc">
                  <h3>{t('discover_services')}</h3>
                </div>
                <div className="btn-bloc btn">{t('air_transport')}</div>
              </div>
              <div className="item">
                <div className="img-bloc">
                  <MdSendTimeExtension className="icon" />
                  <span>{t('ship_now')}</span>
                </div>
                <span className="separation"></span>
                <div className="text-bloc">
                  <h3>{t('discover_services')}</h3>
                </div>
                <div className="btn-bloc btn">{t('sea_transport')}</div>
              </div>
              <div className="item">
                <div className="img-bloc">
                  <BiSearchAlt className="icon" />
                  <span>{t('search')}</span>
                </div>
                <span className="separation"></span>
                <div className="text-bloc">
                  <h3>{t('discover_services')}</h3>
                </div>
                <div className="btn-bloc btn">{t('customs_declaration')}</div>
              </div>
            </div>
          </motion.div>
          <div className="content-service">
            <h1 className="primaryText" style={{ textAlign: "center" }}>
            {t('our_services')}
            </h1>
            <div className="service">
              <SlideService />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page2;
