import { Box, IconButton, styled, useTheme } from "@mui/material"
import { useSession } from "next-auth/react"
import React, { PropsWithChildren } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Loading from "../components/Loading"
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from '../../pages/_app'


const CustomBox = styled(Box)(({ theme }) => `
  padding: ${theme.spacing(10, 1)};
`)

const DefaultTemplate = ({ children }: PropsWithChildren) => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  const { status } = useSession()

  return (
    <>
      {
        status === "loading" ?
          <Loading />
          :
          <>
            <Header />
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ?
                <Brightness7Icon sx={{ color: "#fff" }} />
                :
                <Brightness4Icon />
              }
            </IconButton>
            <CustomBox>
              {children}
            </CustomBox>
            <Footer />
          </>
      }
    </>
  )
}

export default DefaultTemplate