import React from 'react'
import AjoutTransHwb from '../../components/admin/transaction/hwb/ajout/AjoutTransHwb';
import { Dialog, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';
const AjoutTransHwbP = ({ open, handleClose, allTransactionHwb, isEditMode, selectedPerson }) => {
  return (
    <Dialog  open={open}
    onClose={handleClose}
    maxWidth={false} 
    PaperProps={{
        sx: {
            width: '90vw',     
            maxWidth: '1500px', 
            height: '90vh', 
            boxShadow: 'none',     
        },
        elevation: 0,
    }}>
    <DialogContent  style={{
                    position: 'relative',
                    width: '90vw',      
                    maxWidth: '1500px',
                    height: '90vh', 
                    padding: '20px',
                    boxShadow: 'none',

                }}>
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
      <AjoutTransHwb
        handleClose={handleClose}
        isEditMode={isEditMode}
        selectedPerson={selectedPerson} 
        allTransactionHwb={allTransactionHwb}/>
      <ToastContainer />
    </DialogContent>
  </Dialog>
  )
}

export default AjoutTransHwbP
