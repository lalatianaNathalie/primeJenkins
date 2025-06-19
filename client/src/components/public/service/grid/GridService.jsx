import "./gridService.css"
import data from './data'
import { useTranslation } from 'react-i18next';

const GridService = () => {
  const { t } = useTranslation(); 
  return (
    <div className="gridService">
      <h1 className="primaryText">{t('our_services')}</h1>
      <div className="gr-contrainer">
        {
          data.map((item, i) => {
            return (
              <>
                <div className="column" key={i}>
                  <div className="card">
                    <div className="icon">{item.icon}</div>
                    <h3>{t(item.heading)}</h3>
                    <p>{t(item.detail)}</p>
                  </div>
                </div>
              </>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default GridService
