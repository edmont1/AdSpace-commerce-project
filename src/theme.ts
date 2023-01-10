import { createTheme, Theme, ThemeOptions } from "@mui/material"
import { Roboto } from "@next/font/google"


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

console.log(theme)


export default theme