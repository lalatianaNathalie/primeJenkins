import "./Choisir.css";
import { useTranslation } from "react-i18next";

const Choisir = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="paddings innerWidth g-container">
        <div className=" inner-container">
          <span className="primaryText title"> {t("why_choose_primex")} </span>

          <span className="secondaryText">
            <div class="text-xl font-bold">
              <span class="text-white">PR</span>EMIUM
              <span class="text-white"> IM</span>PORT
              <span class="text-white"> EX</span>PORT
            </div>
            {t('primex_description')}
          </span>
          <button className="btn">{t('contact_us')}</button>
        </div>
      </div>
    </div>
  );
};

export default Choisir;
