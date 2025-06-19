import React from 'react'
import AjoutTransactionM from '../../components/admin/transaction/maritime/ajoutTransactionM/AjoutTransactionM'
import { Dialog, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';

const AjoutTransactionMa = ({ open, handleClose, allTransactionMaritime, isEditMode, selectedPerson })  => {
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
      <AjoutTransactionM
        handleClose={handleClose}
        isEditMode={isEditMode}
        selectedPerson={selectedPerson} 
        allTransactionMaritime={allTransactionMaritime}/>
      <ToastContainer />
    </DialogContent>
  </Dialog>
  )
}

export default AjoutTransactionMa
