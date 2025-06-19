import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import {  MdAdd, MdSearch, MdClear } from 'react-icons/md';
import Swal from 'sweetalert2';
import "../../Dashboard/areaTable/AreaTable.scss"
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import api from '../../../../axiosInstance';
import AjoutMawbP from '../../../../pages/admin/AjoutMawb';

const Mawb = () => {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);

    const alltransactionMawb = async () => {
        try {
            const response = await api.get("/mawb/");
            setData(response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    const handleEditClickOpen = (transactionMawb) => {
        setSelectedPerson(transactionMawb);
        setIsEditMode(true); // Mode modification
        setOpen(true);
    };
   // SUPPRESSION
    const supprimer = (id) => {
        api
            .delete("/mawb/" + id)
            .then((res) => {
                alltransactionMawb();
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
                supprimer(id);
            }
        });
    };
  useEffect(() => {
        alltransactionMawb();
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
        if (selectedPerson && selectedPerson.idMAWB === person.idMAWB) {
            setSelectedPerson(person); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedPerson(person); // Sélectionne la personne cliquée
        }
    };
    const filteredData = data.filter(item =>
        item.numMAWB.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.TransAerienne.numVol.toLowerCase().includes(searchTerm.toLowerCase())
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
    <h3 className="titleCli">EXPEDITIONS MAWB</h3>
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
            <AjoutMawbP
                open={open}
                alltransactionMawb={alltransactionMawb}
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
                    <th>N° MAWB</th>
                    <th>N° Vol</th>
                    <th>Compagnie</th>
                    <th>Pays chargement</th>
                    <th>Pays dechargement</th>
                    <th>Date Emission </th>
                    <th>Date d'arriver prevue</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map(item => (
                    <tr
                        key={item.idMAWB}
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
                        <td>{item.numMAWB}</td>
                        <td>{item.TransAerienne.numVol}</td>
                        <td>{item.TransAerienne.nomCompagnie}</td>
                        <td>{item.TransAerienne.paysChargement}</td>
                        <td>{item.TransAerienne.paysDechargement}</td>
                        <td>{new Date(item.dateEmission).toLocaleDateString('fr-FR')}</td>
                        <td>{new Date(item.dateArrivePrevue).toLocaleDateString('fr-FR')}</td>
                        <td className="dt-cell-action">
                            <AreaTableAction
                                id={item.id}
                                onEditClick={() => handleEditClickOpen(item.idMAWB)}
                                onDeleteClick={() => handleDeleteClick(item.idMAWB)}
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

export default Mawb
