import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";

const  AreaTop = () => {
  // const { openSidebar, closeSidebar } = useContext(SidebarContext); // Récupérer openSidebar et closeSidebar

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
      // closeSidebar(); // Utiliser closeSidebar pour fermer la sidebar quand tu cliques à l'extérieur
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          // onClick={openSidebar} // Utiliser openSidebar quand tu cliques sur le bouton
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">Tableau de bord</h2>
      </div>
      <div className="area-top-r">
        <div
          ref={dateRangeRef}
          className={`date-range-wrapper ${
            !showDatePicker ? "hide-date-range" : ""
          }`}
          onClick={handleInputClick}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            showMonthAndYearPickers={false}
          />
        </div>
      </div>
    </section>
  );
};

export default AreaTop;
