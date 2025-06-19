import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { MdAdd, MdSearch, MdClear } from 'react-icons/md';
import Swal from 'sweetalert2';
import "../../Dashboard/areaTable/AreaTable.scss"
import AreaTableAction from "../../Dashboard/areaTable/AreaTableAction";
import api from '../../../../axiosInstance';
import AjoutMblPage from '../../../../pages/admin/AjoutMblPage';

const Mbl = () => {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [data, setData] = useState([]);
    const alltransactionMbl = async () => {
        try {
            const response = await api.get("/mbl/");
            setData(response.data);
            console.log(response);

        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    const handleEditClickOpen = (transactionMbl) => {
        setSelectedPerson(transactionMbl);
        setIsEditMode(true); // Mode modification
        setOpen(true);
    };
    // SUPPRESSION
    const supprimer = (id) => {
        api
            .delete("/mbl/" + id)
            .then((res) => {
                alltransactionMbl();
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
        alltransactionMbl();
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
        if (selectedPerson && selectedPerson.idMBL === person.idMBL) {
            setSelectedPerson(person);
        } else {
            setSelectedPerson(person);
        }
    };
    const filteredData = data.filter(item =>
        item.numMBL.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.TransMaritime.numIMO.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h3 className="titleCli">EXPEDITION MBL</h3>
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
                        <AjoutMblPage
                            open={open}
                            alltransactionMbl={alltransactionMbl}
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
                                        <th>N° MBL</th>
                                        <th>N° IMO</th>
                                        {/* <th>N° Conteneur</th> */}
                                        <th>Armateur</th>
                                        <th>Navire</th>
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
                                            key={item.idMBL}
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
                                            {/* <td>{item.conteneur.numConteneur}</td> */}
                                            <td>{item.TransMaritime.nomNavire}</td>
                                            <td>{item.TransMaritime.paysChargement}</td>
                                            <td>{item.TransMaritime.paysDechargement}</td>
                                            <td>{new Date(item.dateEmission).toLocaleDateString('fr-FR')}</td>
                                            <td>{new Date(item.dateArrivePrevue).toLocaleDateString('fr-FR')}</td>
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

export default Mbl
