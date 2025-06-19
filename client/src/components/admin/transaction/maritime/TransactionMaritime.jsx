import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import {  MdAdd, MdSearch, MdClear } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../Dashboard/areaTable/AreaTable.scss"
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import AjoutTransactionMa from '../../../../pages/admin/AjoutTransactionMa';
import api from '../../../../axiosInstance';

const TransactionMaritime = () => {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);

    const allTransactionMaritime = async () => {
        try {
            const response = await api.get("/mbl/");
            setData(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const handleEditClickOpen = (transactionMaritime) => {
        setSelectedPerson(transactionMaritime);
        setIsEditMode(true); // Mode modification
        setOpen(true);
    };
   // SUPPRESSION
    const supprimer = (id) => {
        api
            .delete("/mbl/" + id)
            .then((res) => {
                allTransactionMaritime();
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
        allTransactionMaritime();
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
        if (selectedPerson && selectedPerson.idtransactionMaritime === person.idtransactionMaritime) {
            setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };
    const filteredData = data.filter(item =>
        item.numMBL.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.idTransport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateEmission.toLowerCase().includes(searchTerm.toLowerCase())     );

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
    <h3 className="titleCli">EXPEDITION MARITIME</h3>
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
            <AjoutTransactionMa
                open={open}
                allTransactionMaritime={allTransactionMaritime}
                handleClose={handleClose}
                isEditMode={isEditMode}
                selectedPerson={selectedPerson} />

        </div>
        <section className="content-area-table pd-5">
        <div className="data-table-diagram">
        <table >
            <thead>
                <tr >
                    <th>#</th>
                    <th>N° MBL</th>
                    <th>N° IMO</th>
                    <th>Armateur</th>
                    <th>date de chargement</th>
                    <th>Pays de chargement</th>
                    <th>Pays de déchargement</th>
                    <th>Date Emission </th>
                    <th>Date d'arriver prevue</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map(item => (
                    <tr
                        key={item.idtransactionMaritime}
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
                        <td>{item.numMBL}</td>
                        <td>{item.TransMaritime.numIMO}</td>
                        <td>{item.TransMaritime.armateur}</td>
                        <td>{ new Date(item.TransMaritime.dateChargement).toLocaleDateString('fr-FR')}</td>
                        <td>{item.TransMaritime.paysChargement}</td>
                        <td>{item.TransMaritime.paysDechargement}</td>                        
                        <td>{new Date(item.dateArrivePrevue).toLocaleDateString('fr-FR')}</td>
                        <td>{new Date(item.dateEmission).toLocaleDateString('fr-FR')}</td>
                        <td className="dt-cell-action">
                            <AreaTableAction
                                id={item.id}
                                onEditClick={() => handleEditClickOpen(item.idMBL)}
                                onDeleteClick={() => handleDeleteClick(item.idMBL)}
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

export default TransactionMaritime
