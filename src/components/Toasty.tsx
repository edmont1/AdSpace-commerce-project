import { Alert, Snackbar, SnackbarOrigin, Stack } from "@mui/material"


interface Props {
  open: boolean
  onClose: () => void
  message: string
  origin : SnackbarOrigin
}
const Toasty = ({ open, onClose, message, origin } : Props) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={2500} onClose={onClose} anchorOrigin={origin}>
        <Alert variant="filled" onClose={onClose} severity="success" sx={{ width: '100%', fontWeight: "700"}}>
        {message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Toasty