import { useState, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { MdAdd, MdSearch, MdClear } from "react-icons/md";
import Swal from "sweetalert2";
import "../../Dashboard/areaTable/AreaTable.scss";
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import AjoutSuiviHwb from "./AjoutSuiviHwb";
import api from "../../../../axiosInstance";
import idUserConnected from "./../../../../constants/idUserConnected";
import DetailsSuiviHwb from "./DetailsSuiviHwb";

const SuiviHwb = () => {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]);
  const allsuiviHWB = async () => {
    try {
      const response = await api.get("/suiviHAWB/");
      setData(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const idEmploye = idUserConnected();
  const [state, setState] = useState({
    numHAWB: "",
    etape: "",
    dateEtape: "",
    status: "",
    commentaire: "",
    creerPar: idEmploye,
    modifierPAr: idEmploye,
  });
  const handleEditClickOpen = (suiviHWB) => {
    const selectedData = data.find((item) => item.idSuiviHAWB === suiviHWB);
    setSelectedPerson(selectedData);
    setIsEditMode(true);
    setOpen(true);

    // Mettre à jour le state avec les informations sélectionnées
    setState({
      numHAWB: selectedData.numHAWB || "",
      etape: selectedData.etape || "",
      dateEtape: selectedData.dateEtape || "",
      status: selectedData.status || "",
      commentaire: selectedData.commentaire || "",
      creerPar: selectedData.creerPar || idEmploye,
      modifierPar: idEmploye,
    });

    // Faire défiler jusqu'à la section du formulaire
    if (ajoutRef.current) {
      ajoutRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    console.log("selectedData:", selectedData);
    console.log("state:", state);
  };

  const supprimer = (id) => {
    api
      .delete("/suiviHWB/" + id)
      .then((res) => {
        allsuiviHWB();
      })
      .catch((err) => alert(err));
  };
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "De supprimmer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Supprimer!",
      cancelButtonText: "Annuler",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        supprimer(id); // Appeler la fonction de suppression si confirmé
      }
    });
  };
  useEffect(() => {
    allsuiviHWB();
  }, []);

  const ajoutRef = useRef(null); // Ref pour cibler AjoutSuiviHwb
  const handleScrollToAjout = () => {
    if (ajoutRef.current) {
      ajoutRef.current.scrollIntoView({ behavior: "smooth" }); // Défilement fluide
    }
  };
  const { theme } = useContext(ThemeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleSelect = (person) => {
    if (selectedPerson && selectedPerson.idSuiviHAWB === person.idSuiviHAWB) {
      setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };
  const filteredData = data.filter((item) =>
    item.numHAWB.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const selectedData = filteredData.length > 0 ? filteredData[0] : null;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [activeTab, setActiveTab] = useState(false); // Onglet par défaut: Maritime
  const retour = () => setActiveTab(false);

  return (
    <div className={`client-container ${theme}`}>
      {activeTab ? <DetailsSuiviHwb retour={retour} /> : 
      <>
<div className="tabs">
        <div onClick={() => setActiveTab(true)} className={`tab button-tab`}>
          Suivi en temps réel de HAWB
        </div>
      </div>
      <h3 className="titleCli">SUIVIS HWB</h3>
      <div className="container">
        <div className="tableContainer">
          <div className="actionsContainer">
            <div className="searchContainer">
              <MdSearch className="searchIcon" />
              <input
                type="text"
                placeholder="Entrez votre numéro de suivi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
              />
              {searchTerm && (
                <MdClear
                  className="clearIcon"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
            <button className="addButton" onClick={handleScrollToAjout}>
              <MdAdd /> Ajouter
            </button>
          </div>
          <section className="content-area-table pd-5">
            <div className="data-table-diagram">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>N° HWB</th>
                    <th>Etape</th>
                    <th>Date etape</th>
                    <th>Status</th>
                    <th>Commentaire</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr
                      key={item.idSuiviHAWB}
                      onClick={() => handleSelect(item)}
                      className={item === selectedPerson ? "selectedRow" : ""}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={item === selectedPerson}
                          readOnly
                        />
                      </td>
                      <td>{item.numHAWB}</td>
                      <td>{item.etape}</td>
                      <td>
                        {new Date(item.dateEtape).toLocaleDateString("fr-FR")}
                      </td>
                      <td>{item.status}</td>
                      <td>{item.commentaire}</td>
                      <td className="dt-cell-action">
                        <AreaTableAction
                          id={item.id}
                          onEditClick={() =>
                            handleEditClickOpen(item.idSuiviHAWB)
                          }
                          onDeleteClick={() =>
                            handleDeleteClick(item.idSuiviHAWB)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="pagination pb-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pageButton ${
                    currentPage === pageNumber ? "activePage" : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <div ref={ajoutRef} className="pt-2">
        <AjoutSuiviHwb
          allsuiviHWB={allsuiviHWB}
          isEditMode={isEditMode}
          selectedPerson={state}
        />
      </div>
      </>}

      
    </div>
  ); 
};

export default SuiviHwb;
