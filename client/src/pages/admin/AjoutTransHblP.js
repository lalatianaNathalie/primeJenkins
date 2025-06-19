import React from 'react'
import AjoutTransHbl from '../../components/admin/transaction/hbl/AjoutTransHbl';
import { Dialog, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';

const AjoutTransHblP = ({ open, handleClose, allTransactionHbl, isEditMode, selectedPerson }) => {
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
      <AjoutTransHbl
        handleClose={handleClose}
        isEditMode={isEditMode}
        selectedPerson={selectedPerson} 
        allTransactionHbl={allTransactionHbl}/>
      <ToastContainer />
    </DialogContent>
  </Dialog>
  )
}

export default AjoutTransHblP
