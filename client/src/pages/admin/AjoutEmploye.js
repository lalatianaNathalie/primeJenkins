import React from 'react'
import { Dialog, IconButton, DialogContent} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import AjoutEmploye from '../../components/admin/employe/AjoutEmploye';

const AjoutEMploye = ({open, handleClose, selectedPerson, allEmploye }) => {
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
        <AjoutEmploye 
        handleClose={handleClose}
        selectedPerson={selectedPerson}
        allEmploye={allEmploye} />
      </DialogContent>
    </Dialog>
  )
}

export default AjoutEMploye
