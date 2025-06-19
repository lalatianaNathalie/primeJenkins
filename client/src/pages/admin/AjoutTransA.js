import React from 'react'
import { Dialog, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AjoutTransAerienne from '../../components/admin/transport/aerienne/ajoutTransaerienne/AjoutTransAerienne';
import { ToastContainer } from 'react-toastify';

const AjoutTransA = ({ open, handleClose, allTransAerienne, isEditMode, selectedPerson }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent style={{ position: 'relative' }}>
        {/* Bouton de fermeture en haut à droite */}
        <IconButton
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'gray',
          }}
        >
          <CloseIcon />
        </IconButton>
        <AjoutTransAerienne

          handleClose={handleClose}
          isEditMode={isEditMode}
          selectedPerson={selectedPerson} 
          allTransAerienne={allTransAerienne}/>
        <ToastContainer />
      </DialogContent>
    </Dialog>
  )
}

export default AjoutTransA
