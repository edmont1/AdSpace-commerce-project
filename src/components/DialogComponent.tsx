import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface Props{
  openDialog: boolean
  handleClose: () => void
  handleConfirmDialog: () => void
}
const DialogComponent = ({ openDialog, handleClose, handleConfirmDialog } : Props) => {

  return (
    <Dialog
      open={openDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        {"Deseja realmente remover o anúncio?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta ação é irreversível. Ao remover não será possível recuperá-lo.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} >Cancelar</Button>
        <Button onClick={handleConfirmDialog} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogComponent