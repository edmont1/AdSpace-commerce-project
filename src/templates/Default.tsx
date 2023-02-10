import { Box, styled } from "@mui/material"
import { useSession } from "next-auth/react"
import React, { PropsWithChildren } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Loading from "../components/Loading"


const CustomBox = styled(Box)(({ theme }) => `
  padding: ${theme.spacing(10, 1)};
`)

const DefaultTemplate = ({ children }: PropsWithChildren) => {

  const { status } = useSession()

  return (
    <>
      {
        status === "loading" ?
          <Loading />
          :
          <>
            <Header />
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