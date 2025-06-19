import React from 'react'
import AjoutMarchandisehwb from '../../components/admin/marchandises/HWB/ajout/AjoutMarchandisehwb'
import { Dialog, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';
const AjoutMarchHWB = ({ handleClose,open, allMarchandiseHwb, isEditMode, selectedPerson }) => {
  return (
    <Dialog
            open={open}
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
            }}
        >
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
                <div className="w-full h-full shadow-none">
                    <AjoutMarchandisehwb
                        handleClose={handleClose}
                        isEditMode={isEditMode}
                        selectedPerson={selectedPerson}
                        allMarchandiseHwb={allMarchandiseHwb}
                        style={{ width: '100%', height: '100%',
                          } }
                      className="shadow-none"
                        
                    />
                </div>
                <ToastContainer />
            </DialogContent>
        </Dialog>
  )
}

export default AjoutMarchHWB
