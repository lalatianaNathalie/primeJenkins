"use client";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./../../../context/ThemeContext";
import {
    MdAdd,
    MdSearch,
    MdClear,
} from "react-icons/md";
import "../clients/Client.scss"
import AjoutCLi from "../../../pages/admin/AjoutCLi";
import "../Dashboard/areaTable/AreaTable.scss"
import "../Dashboard/areaTable/AreaTableAction"
import Swal from "sweetalert2";
// import { TrashIcon } from '@heroicons/react/24/solid'
import AreaTableAction from "../Dashboard/areaTable/AreaTableAction";
import api from "../../../axiosInstance";
import AjoutEMploye from "../../../pages/admin/AjoutEmploye";

const Client = () => {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [data, setData] = useState([]);
    const allEmploye = async () => {
        try {
            const response = await api.get("/employe/");
            setData(response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    const supprimer = (id) => {
        api.delete("/employe/" + id)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: "Supprimé!",
                    text: "Le employe a été supprimé.",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false,
                });
                allEmploye();
            })
            .catch((err) => alert(err));
    };
    useEffect(() => {
        allEmploye();
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
    const handleEditClickOpen = (employe) => {
        setSelectedPerson(employe);
        setIsEditMode(true); // Mode modification
        setOpen(true);
    };
    const handleSelect = (person) => {
        if (selectedPerson && selectedPerson.idEmploye === person.idEmploye) {
            setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };
    const filteredData = data.filter(
        (item) =>
            item.nomEmploye.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.typeEmploye.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.emailEmploye.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h3 className="titleCli">LISTE DE TOUT LES EMPLOYES</h3>
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
                        <AjoutEMploye
                            open={open}
                            allEmploye={allEmploye}
                            handleClose={handleClose}
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
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((item) => (

                                        <tr
                                            key={item.idEmploye}
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
                                            <td>{item.nomEmploye}</td>
                                            <td>{item.emailEmploye}</td>
                                            <td>{item.typeEmploye}</td>
                                            <div className="flex justify-center items-center">
                                                <button
                                                    className="text-red-500 hover:text-red-400"
                                                    onClick={() => handleDeleteClick(item.idEmploye)} 
                                                >
                                                    {/* <TrashIcon className="h-6 w-6" /> */}
                                                </button>
                                            </div>
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
