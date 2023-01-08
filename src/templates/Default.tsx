import React, { PropsWithChildren } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"


const DefaultTemplate = ({children}:PropsWithChildren) =>{
  return(
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default DefaultTemplate