import { createTheme, Theme, ThemeOptions } from "@mui/material"
import { Roboto } from "@next/font/google"


declare module "@mui/material/styles"{
  interface TypeBackground{
    white: string
  }
}


const theme = createTheme({
  palette:{
    primary:{
      main: "#12BB59",
      contrastText: "#000",
    },
    background:{
      default: "rgb(242, 244, 245)",
      white: "#fff"
    }
  },
} as Theme)

export default theme