import { IconButton, InputBase, Paper, useTheme } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { useRouter } from "next/dist/client/router"
import slugify from "slugify"


const SearchField = () => {
  const router = useRouter()
  const [input, setInput] = useState("")
  const search = slugify(input)
  function handleInputValue(e:ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setInput(value)
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>){
    const { key } = e
    if(key === "Enter"){
      router.push(`/search/${search}`)
    }
  }

  const theme = useTheme()
  return (
    <Paper sx={{
      padding: theme.spacing(0, 2),
      display: "flex",
    }}>
      <InputBase onKeyDown={handleKey} value={input} id="search" name="search" onChange={handleInputValue}
        placeholder="Ex.:iPhone, Computador, Notebook" fullWidth />
      <IconButton href={`/search/${search}`}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchField