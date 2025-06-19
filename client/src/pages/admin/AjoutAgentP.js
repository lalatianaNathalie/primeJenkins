import React from 'react'
import { Dialog, IconButton, DialogContent} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AjoutAgent from '../../components/admin/agent/AjoutAgent';

const AjoutAgentP = ({open, handleClose, isEditMode, selectedPerson, allAgent }) => {
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
      <AjoutAgent 
      handleClose={handleClose}
      isEditMode={isEditMode}
      selectedPerson={selectedPerson}
      allAgent={allAgent} />
    </DialogContent>
  </Dialog>
  )
}

export default AjoutAgentP
