import { Dialog, DialogActions, DialogContent, DialogContentText ,DialogTitle} from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open , handleClose,deleteHandler}) => {
  return <Dialog open={open} onClose={handleClose} >
    <DialogTitle>
      Delete group ?
    </DialogTitle>
  <DialogContent>
Are you sure you want to delete ?
  </DialogContent>
 <DialogActions onClick={handleClose}>No </DialogActions>
 <DialogActions onClick={deleteHandler}>Yes</DialogActions>
  </Dialog>
}

export default ConfirmDeleteDialog
