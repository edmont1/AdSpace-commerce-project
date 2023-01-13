import { Box, Theme } from "@mui/material"
import { useTheme } from "@mui/material"

const Footer = () => {

  const theme = useTheme() as Theme

  return(
    <>
      <Box sx={{
        bgcolor: theme.palette.primary.main,
        padding: "50px 0",
        marginTop: "80px",
        textAlign: "center",
        color: theme.palette.primary.contrastText
      }}>
        footer
      </Box>
    </>
  )
}

export default Footer