import React from "react";
import { Dialog, IconButton, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer } from "react-toastify";
import AjoutTransMaritime from "../../components/admin/transport/maritime/AjoutTransMaritime";

const AjoutTransM = ({ open, allTransMaritime ,handleClose, isEditMode, selectedPerson }) => {
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
          <AjoutTransMaritime 
          handleClose={handleClose}
          isEditMode={isEditMode}
          selectedPerson={selectedPerson}
          allTransMaritime ={allTransMaritime }
          />
          <ToastContainer />
        </DialogContent>
      </Dialog>
      )
}

export default AjoutTransM;
