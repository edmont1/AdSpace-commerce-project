import { Container, Typography, useTheme } from "@mui/material"


interface Props {
  title: string
  subtitle?: string
  variantTitle?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  variantSubtitle?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}
const Titles = ({ title, subtitle, variantTitle="h3", variantSubtitle="h5" }: Props) => {
  const theme = useTheme()
  return (
    <Container maxWidth="sm" sx={{ pb: theme.spacing(7) }}>
      <Typography component="h1" variant={variantTitle} align="center">
        {title}
      </Typography>
      {
        subtitle &&
        <Typography component="h2" variant={variantSubtitle} align="center">
          {subtitle}
        </Typography>
      }
    </Container>
  )
}

export default Titles