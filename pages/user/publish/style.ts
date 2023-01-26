import { styled } from "@mui/material"

const CustomDiv = styled("div")(({ theme }) => `
  padding-bottom: ${theme.spacing(3)};
  &:last-child{
    padding-bottom: 0
  }
`)

export{
  CustomDiv
}