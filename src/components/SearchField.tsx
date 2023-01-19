import { IconButton, InputBase, Paper, Typography, useTheme } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const SearchField = () => {
  const theme = useTheme()
  return(
    <Paper sx={{
      padding: theme.spacing(0, 2),
      display:"flex",
      bgcolor: theme.palette.background.white
      }}>
      <InputBase placeholder="Ex.:iPhone, Computador, Notebook" fullWidth />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchField