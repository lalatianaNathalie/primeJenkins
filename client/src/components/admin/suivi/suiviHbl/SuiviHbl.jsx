import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { MdAdd, MdSearch, MdClear } from "react-icons/md";
import Swal from "sweetalert2";
import "../../Dashboard/areaTable/AreaTable.scss";
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import AjoutSuiviHbl from "./AjoutSuiviHbl";
import api from "../../../../axiosInstance";
import DetailHBL from "./DetailHBL";
const SuiviHbl = () => {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]);

  const allsuiviHBL = async () => {
    try {
      const response = await api.get("/suiviHBL/");
      setData(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEditClickOpen = (suiviHBL) => {
    setSelectedPerson(suiviHBL);
    setIsEditMode(true); // Mode modification
    setOpen(true);
  };

  // SUPPRESSION
  const supprimer = (id) => {
    api
      .delete("/suiviHBL/" + id)
      .then((res) => {
        allsuiviHBL();
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
    allsuiviHBL();
  }, []);

  const handleClickOpen = () => {
    setSelectedPerson(null);
    setIsEditMode(false);
    setOpen(true);
  };

  const { theme } = useContext(ThemeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSelect = (person) => {
    if (selectedPerson && selectedPerson.idSuiviHBL === person.idSuiviHBL) {
      setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };
  const filteredData = data.filter(
    (item) =>
      item.numHBL.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.etape.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dateEtape.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [activeTab, setActiveTab] = useState(false); // Onglet par défaut: Maritime
  const retour = ()=>setActiveTab(false);
  return (
    <div className={`client-container ${theme}`}>
      {activeTab ? (
        <DetailHBL 
            retour={retour}
        />
      ) : (
        <>
          <div className="tabs">
            <div
              onClick={() => setActiveTab(true)}
              className={`tab button-tab`}
            >
              Suivi en temps réel de HBL
            </div>
          </div>
          <h3 className="titleCli">SUIVIS HBL</h3>
          <div className="flex flex-col space-y-6">
            <div className="actionsContainer">
              <div className="searchContainer">
                <MdSearch className="searchIcon" />
                <input
                  type="text"
                  placeholder="Recherche..."
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
              <button className="addButton" onClick={handleClickOpen}>
                <MdAdd /> Ajouter
              </button>
            </div>
            <section className="content-area-table pd-5">
              <div className="data-table-diagram">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>N° HBL</th>
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
                        key={item.idSuiviHBL}
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
                        <td>{item.numHBL}</td>
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
                              handleEditClickOpen(item.idSuiviHBL)
                            }
                            onDeleteClick={() =>
                              handleDeleteClick(item.idSuiviHBL)
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
          <AjoutSuiviHbl className="pt-2" />
        </>
      )}

      
    </div>
  );
};

export default SuiviHbl;
