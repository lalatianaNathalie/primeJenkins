import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdClear } from 'react-icons/md';
import AjoutTransA from '../../../../pages/admin/AjoutTransA';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../Dashboard/areaTable/AreaTable.scss"
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import api from '../../../../axiosInstance';

const TransportAerienne = () => {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);

    const allTransAerienne = async () => {
        try {
            const response = await api.get("/transAerienne/");
            setData(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const handleEditClickOpen = (transAerienne) => {
        setSelectedPerson(transAerienne);
        setIsEditMode(true); // Mode modification
        setOpen(true);
    };

    // SUPPRESSION
    const supprimer = (id) => {
        api
            .delete("/transAerienne/" + id)
            .then((res) => {
                allTransAerienne();
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
        allTransAerienne();
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
        if (selectedPerson && selectedPerson.idTransAerienne === person.idTransAerienne) {
            setSelectedPerson(person);
        } else {
            setSelectedPerson(person);
        }
    };
    const filteredData = data.filter(item =>
        item.numVol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nomCompagnie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateChargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.paysChargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.villeChargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.paysDechargement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.villeDechargement.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h3 className="titleCli">LISTE DE TOUT LES TRANSPORTS AERIENNE</h3>
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
                        <AjoutTransA
                            open={open}
                            allTransAerienne={allTransAerienne}
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
                                        <th>ID</th>
                                        <th>N° Vol</th>
                                        <th>Nom Compagnie</th>
                                        <th>Date de chargement</th>
                                        <th>Pays de chargement</th>
                                        <th>Pays de déchargement</th>
                                        <th>Ville de chargement</th>
                                        <th>Ville de déchargement</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map(item => (
                                        <tr
                                            key={item.idTransAerienne}
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
                                            <td>{item.idTransAerienne}</td>
                                            <td>{item.numVol}</td>
                                            <td>{item.nomCompagnie}</td>
                                            <td>{new Date(item.dateChargement).toLocaleDateString('fr-FR')}</td>
                                            <td>{item.paysChargement}</td>
                                            <td>{item.paysDechargement}</td>
                                            <td>{item.villeChargement}</td>
                                            <td>{item.villeDechargement}</td>
                                            <td className="dt-cell-action">
                                                <AreaTableAction
                                                    id={item.id}
                                                    onEditClick={() => handleEditClickOpen(item.idTransAerienne)}
                                                    onDeleteClick={() => handleDeleteClick(item.idTransAerienne)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table></div></section>
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
                    </div></div>


            </div>
        </div>
    );
}

export default TransportAerienne
