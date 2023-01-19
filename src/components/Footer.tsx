import { Box, Container, Divider, styled, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import Link from "next/link"

const CustomUl = styled("ul")(({theme}) => `
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin-bottom: 50px;
    & li {
      padding: 20px;
    }
    & li a {
      text-decoration: none;
      color: grey;
      font-weight: 500
    }
    & li a:hover{
      text-decoration: underline;
      color: ${theme.palette.primary.main}
    }
  `)

const Footer = () => {

  const theme = useTheme()

  return(
    <Container maxWidth="xl"
    sx={{
      position: "absolute",
      right: 0,
      bottom: 0,
      left: 0,
    }}
    >
      <Box sx={{
        textAlign: "center",
        color: theme.palette.primary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
        display: 'flex',
        flexDirection: "column",
        justifyContent: "end",
      }}>
        <Divider sx={{
          mb: "10px"
        }} />
        <CustomUl sx={{
          fontSize: {
            xs: "10px",
            sm: "13px"
          }
        }}>
          <li>
            <Link href="#">
              Ajuda e contato
            </Link>
          </li>
          <li>
            <Link href="#">
              Dicas de segurança
            </Link>
          </li>
          <li>
            <Link href="#">
              Plano Profissional
            </Link>
          </li>
          <li>
            <Link href="#">
              Mapa do site
            </Link>
          </li>
        </CustomUl>
        <Typography color={theme.palette.primary.main} variant="subtitle2" sx={{
          textAlign: "center",
          height: "80px",
          bgcolor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "end"
        }}>
          Copyright © Developed by Eduardo Monteiro
        </Typography>
      </Box>
    </Container>

  )
}

export default Footer