import { Alert, Snackbar, Stack, useTheme } from "@mui/material";
import { createContext, PropsWithChildren, useState, useContext } from "react";


interface Params{
  open: boolean
  severity: string
  message: string
}
const ToastyContext = createContext({setToasty: ({open, severity, message}:Params) => {}})

export const ToastyProvider = ({children}: PropsWithChildren) => {
  const theme = useTheme()
  const [toasty, setToasty] = useState({
    open : false,
    severity : "",
    message : "",
  })

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setToasty({
      ...toasty,
      open: false
    })
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={toasty.open} autoHideDuration={2000} onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%', fontWeight: "700"}}>
            {toasty.message}
          </Alert>
        </Snackbar>
      </Stack>
      <ToastyContext.Provider value={{ setToasty }}>
        {children}
      </ToastyContext.Provider>
    </>
  )
}

const useToasty = () => useContext(ToastyContext)

export default useToasty