"use client";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./../../../context/ThemeContext";
import {
  MdAdd,
  MdSearch,
  MdClear,
} from "react-icons/md";
import "./Client.scss";
import AjoutCLi from "../../../pages/admin/AjoutCLi";
import "../Dashboard/areaTable/AreaTable.scss"
import "../Dashboard/areaTable/AreaTableAction"
import Swal from "sweetalert2";
import AreaTableAction from "../Dashboard/areaTable/AreaTableAction";
import api from "../../../axiosInstance";

const Client = () => {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [data, setData] = useState([]);
  const allClient = async () => {
    try {
      const response = await api.get("/client/");
      setData(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const supprimer = (id) => {
    api.delete("/client/" + id)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Supprimé!",
          text: "Le client a été supprimé.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        allClient();
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    allClient();
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
  const handleEditClickOpen = (client) => {
    setSelectedPerson(client);
    setIsEditMode(true); // Mode modification
    setOpen(true);
  };
  const handleSelect = (person) => {
    if (selectedPerson && selectedPerson.idClient === person.idClient) {
      setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionne la personne cliquée
    }
  };
  const filteredData = data.filter(
    (item) =>
      item.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.CINClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailClient.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        supprimer(id); // Appeler la fonction de suppression si confirmé
      }
    });
  };
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
      <h3 className="titleCli">LISTE DE TOUT LES CLIENTS</h3>
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
            <AjoutCLi
              open={open}
              allClient={allClient}
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
                    <th>Nom</th>
                    <th>Email</th>
                    <th>CNI</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (

                    <tr
                      key={item.idClient}
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
                      <td>{item.nomClient}</td>
                      <td>{item.emailClient}</td>
                      <td>{item.CINClient}</td>
                      <td className="dt-cell-action">
                        <AreaTableAction
                          id={item.id}
                          onEditClick={() => handleEditClickOpen(item.idClient)}
                          onDeleteClick={() => handleDeleteClick(item.idClient)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              </section>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`pageButton ${currentPage === pageNumber ? "activePage" : ""}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>


        </div>

      </div>
    </div>
  );
};

export default Client;
