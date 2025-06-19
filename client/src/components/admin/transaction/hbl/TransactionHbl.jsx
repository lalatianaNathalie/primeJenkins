import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import {  MdAdd, MdSearch, MdClear } from 'react-icons/md';
import Swal from 'sweetalert2';
import "../../Dashboard/areaTable/AreaTable.scss"
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import AjoutTransHblP from '../../../../pages/admin/AjoutTransHblP';
import api from '../../../../axiosInstance';

const TransactionHbl = () => {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);

    const allTransactionHbl = async () => {
        try {
            const response = await api.get("/hbl/");
            setData(response.data);
            console.log(response);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    const handleEditClickOpen = (transactionHbl) => {
        setSelectedPerson(transactionHbl);
        setIsEditMode(true); // Mode modification
        setOpen(true);
    };
   // SUPPRESSION
    const supprimer = (id) => {
        api
            .delete("/hbl/" + id)
            .then((res) => {
                allTransactionHbl();
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
        allTransactionHbl();
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
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const handleSelect = (person) => {
        if (selectedPerson && selectedPerson.idHBL === person.idHBL) {
            setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };
    const filteredData = data.filter(item =>        
        item.numHBL.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.MBL.numMBL.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.clientDest.nomClient.toLowerCase().includes(searchTerm) ||
        item.clientExp.nomClient.toLowerCase().includes(searchTerm)
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
    <h3 className="titleCli">EXPEDITIONS HBL</h3>
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
                        onClick={() => setSearchTerm('')}
                    />
                )}
            </div>
            <button className="addButton" onClick={handleClickOpen}>
                <MdAdd /> Ajouter
            </button>
            <AjoutTransHblP
                open={open}
                allTransactionHbl={allTransactionHbl}
                handleClose={handleClose}
                isEditMode={isEditMode}
                selectedPerson={selectedPerson} />

        </div>
        <section className="content-area-table pd-5">
        <div className="data-table-diagram">
        <table className='table'>
            <thead>
                <tr >
                    <th>#</th>
                    <th>N° HBL</th>
                    <th>N° MBL</th>
                    <th>Date Emission</th>
                    <th> Destinataire</th>
                    <th>Expediteur</th>
                    <th> Description</th>
                    <th> Nombre colis</th>
                    <th> Poids</th>
                    <th> Volume</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map(item => (
                    <tr
                        key={item.idHBL}
                        onClick={() => handleSelect(item)}
                        className={item === selectedPerson ? 'selectedRow' : ''}
                    >
                        <td>
                            <input
                                type="checkbox"
                                checked={item === selectedPerson}
                                readOnly
                            />
                        </td>
                        <td>{item.numHBL}</td>
                        <td>{item.MBL.numMBL}</td>
                        <td>{ new Date(item.dateEmmission).toLocaleDateString('fr-FR')}</td>
                        <td>{item.clientDest.nomClient}</td>
                        <td>{item.clientExp.nomClient}</td>
                        <td className="description-cell" title={item.description}>{item.description}</td>
                        <td>{item.nbColis}</td>
                        <td>{item.poid}</td>
                        <td>{item.volume}</td>
                        <td className="dt-cell-action">
                            <AreaTableAction
                                id={item.id}
                                onEditClick={() => handleEditClickOpen(item.idHBL)}
                                onDeleteClick={() => handleDeleteClick(item.idHBL)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </section>
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <button
                    key={pageNumber}
                    className={`pageButton ${currentPage === pageNumber ? 'activePage' : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>

</div>
    </div>
</div>
  )
}

export default TransactionHbl
