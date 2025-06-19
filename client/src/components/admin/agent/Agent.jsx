import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./../../../context/ThemeContext";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdAdd,
  MdSearch,
  MdClear,
} from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import "../clients/Client.scss"
import "../Dashboard/areaTable/AreaTable.scss"
import AjoutAgentP from "../../../pages/admin/AjoutAgentP";
import AreaTableAction from "../Dashboard/areaTable/AreaTableAction";
import api from "../../../axiosInstance";

const Agent = () => {

    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [data, setData] = useState([]);
  
    const allAgent = async () => {
      try {
        const response = await api.get("/agent/");
        setData(response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    };
    const supprimer = (id) => {
      api
        .delete("/agent/" + id)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Supprimé!",
            text: "Le agent a été supprimé.",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
          allAgent();
        })
        .catch((err) => alert(err));
    };
    useEffect(() => {
      allAgent();
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
  
    const handleEditClickOpen = (agent) => {
      setSelectedPerson(agent);
      setIsEditMode(true); // Mode modification
      setOpen(true);
    };
    const handleSelect = (person) => {
      if (selectedPerson && selectedPerson.idAgent === person.idAgent) {
        setSelectedPerson(person); 
      } else {
        setSelectedPerson(person);
      }
    };
    const filteredData = data.filter(
      (item) =>
        item.nomAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paysAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adresseAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactAgent.toLowerCase().includes(searchTerm.toLowerCase())
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
        reverseButtons:true
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
    <h3 className="titleCli">LISTE DE TOUT LES AGENTS</h3>
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
          <AjoutAgentP
            open={open}
            allAgent={allAgent}
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
              <th>Nom Agent</th>
              <th>Pays Agent</th>
              <th>Adresse</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
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
                <td>{item.nomAgent}</td>
                <td>{item.paysAgent}</td>
                <td>{item.adresseAgent}</td>
                <td>{item.contactAgent}</td>
                <td className="dt-cell-action">
                                    <AreaTableAction
                                        id={item.id}
                                        onEditClick={() => handleEditClickOpen(item.idAgent)}
                                        onDeleteClick={() => handleDeleteClick(item.idAgent)}
                                    />
                                </td>
              </tr>
            ))}
          </tbody>
        </table></div></section>

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
        </div></div>
      </div>

    </div>
  )
}

export default Agent
