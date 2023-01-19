import { Box, styled } from "@mui/material"
import React, { PropsWithChildren } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"


const CustomBox = styled(Box)(({theme}) => `
  padding: ${theme.spacing(10, 1)};
`)

const DefaultTemplate = ({children}:PropsWithChildren) =>{
  return(
    <>
      <Header />
      <CustomBox>
        {children}
      </CustomBox>
      <Footer />
    </>
  )
}

export default DefaultTemplate