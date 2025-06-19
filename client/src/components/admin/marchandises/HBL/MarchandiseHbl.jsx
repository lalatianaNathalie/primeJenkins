import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { MdAdd, MdSearch, MdClear } from "react-icons/md";
import Swal from "sweetalert2";
import "../../Dashboard/areaTable/AreaTable.scss";
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import AjoutMarchHblP from "../../../../pages/admin/AjoutMarchHblP";
import api from "../../../../axiosInstance";
const MarchandiseHbl = () => {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]);

  const allMarchandiseHBL = async () => {
    try {
      const response = await api.get("/marchandiseHBL/");
      setData(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEditClickOpen = (marchandiseHBL) => {
    setSelectedPerson(marchandiseHBL);
    setIsEditMode(true); // Mode modification
    setOpen(true);
  };

  // SUPPRESSION
  const supprimer = (id) => {
    api
      .delete("/marchandiseHBL/" + id)
      .then((res) => {
        allMarchandiseHBL();
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
    allMarchandiseHBL();
  }, []);

  const handleClickOpen = () => {
    setSelectedPerson(null);
    setIsEditMode(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedPerson(null);
  };
  const { theme } = useContext(ThemeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSelect = (person) => {
    if (
      selectedPerson &&
      selectedPerson.idMarchandiseHBL === person.idMarchandiseHBL
    ) {
      setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };
  const filteredData = data.filter(
    (item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.numConteneur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.typeConteneur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.numPlomb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.villeChargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nature.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nbColis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.poid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.volume.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.HBL.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`client-container ${theme}`}>
      <h3 className="titleCli">MARCHANDISE HBL</h3>
      <div className="container">
        <div className="tableContainer">
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
            <AjoutMarchHblP
              open={open}
              allMarchandiseHBL={allMarchandiseHBL}
              handleClose={handleClose}
              isEditMode={isEditMode}
              selectedPerson={selectedPerson}
            />
          </div>
          <section className="content-area-table pd-5">
            <div className="data-table-diagram">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nature</th>
                    <th>Description</th>
                    <th>HBL</th>
                    <th>N° Conteneur</th>
                    <th>Type Conteneur</th>
                    <th>N° Plomb</th>
                    <th>Nombre colis</th>
                    <th>Poids</th>
                    <th>Volume</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr
                      key={item.idMarchandiseHBL}
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
                      <td>{item.nature}</td>
                      <td>{item.description}</td>
                      <td>{item.HBL}</td>
                      <td>{item.numConteneur}</td>
                      <td>{item.typeConteneur}</td>
                      <td>{item.numPlomb}</td>
                      <td>{item.nbColis}</td>
                      <td>{item.poid}</td>
                      <td>{item.volume}</td>
                      <td className="dt-cell-action">
                        <AreaTableAction
                          id={item.id}
                          onEditClick={() =>
                            handleEditClickOpen(item.idMarchandiseHBL)
                          }
                          onDeleteClick={() =>
                            handleDeleteClick(item.idMarchandiseHBL)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="pagination">
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
    </div>
  );
};

export default MarchandiseHbl;
