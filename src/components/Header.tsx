import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { destroyCookie, parseCookies } from 'nookies'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Sair']

const Header = () => {

  const cookies = parseCookies()

  const [isLogged, setIsLogged] = useState(cookies.isLogged)
  const router = useRouter()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  function handleCloseUserMenu(setting:string){
    setAnchorElUser(null)
    if(setting === "Dashboard"){
      router.push("/user/dashboard")
    }
    if(setting === "Sair"){
      destroyCookie(null, 'isLogged')
      window.location.href = "/"
    }
  }

  function handleCreateAd(){
    if(!isLogged){
      router.push("/signin")
    }
    else{
      router.push("/user/publish")
    }
  }

  const theme = useTheme()
  let name = "Eduardo"

  return (
    <AppBar sx={{
      mb: theme.spacing(10),
    }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            mr: 1,
            }} />
          <Typography
            color="inherit"
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: theme.typography.fontWeightBold,
              letterSpacing: '.2rem',
              textDecoration: 'none',
            }}
          >
            AdSpace
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'block' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography 
                    textAlign="center"
                    >{page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: theme.typography.fontWeightBold,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'inherit', 
                  display: 'block', 
                  fontWeight: theme.typography.fontWeightBold
                }}
              >
                {page}
              </Button>
            ))}
          </Box>


          <Box>
            <Button color='inherit'
            variant='outlined'
            sx={{
              mr: theme.spacing(1),
              padding: theme.spacing(0.5, 2)
            }}
            onClick={handleCreateAd}
            >
              <Typography sx={{
                fontWeight: theme.typography.fontWeightBold,
                fontSize: "15px",
              }}>
                Criar Anúncio
              </Typography>
            </Button>
          </Box>

          {isLogged ? 
          <Box sx={{ flexGrow: 0, ml: theme.spacing(3) }}>
            <Tooltip title="Open settings">
              <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0, borderRadius: "100px"}}>
                <Avatar alt={name} src="#" />
                <Typography 
                variant="subtitle2"
                color={theme.palette.primary.contrastText} 
                fontWeight={700} 
                sx={{
                  padding: theme.spacing(0,1)
                }}>
                  {name}
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem divider={setting === "Dashboard"} key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                
              ))}
            </Menu>
          </Box>
          :
          <Link href="/signin"
          legacyBehavior
          passHref
          >
            <Button 
              color="inherit"
              sx={{
                fontWeight: theme.typography.fontWeightBold
              }}
              >
                Login
            </Button>
          </Link>
          }

        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header