import { Box, useTheme } from "@mui/material"

const Footer = () => {

  const theme = useTheme()

  return(
    <>
      <Box sx={{
        bgcolor: theme.palette.primary.main,
        padding: "50px 0",
        textAlign: "center",
        position: "absolute",
        bottom: "0",
        width: "100%"
      }}>
        footer
      </Box>
    </>
  )
}

export default Footer