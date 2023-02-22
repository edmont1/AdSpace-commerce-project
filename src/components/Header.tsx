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
import { styled, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Sair']

const StyledButton = styled(Button)(({ theme }) => `
  position: relative;
  margin: 0 5px;
  &::after{
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${theme.palette.primary.contrastText};
    visibility: hidden;
    transform: scaleX(0);
    transition: .3s ease-in-out .0s;
  }
  &:hover{
    background-color: rgba(8, 92, 43, 0.205);
    ::after {
    visibility: visible;
    transform: scaleX(1);
    }
  }

`)

const Header = () => {
  const theme = useTheme()
  const session = useSession()
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

  function handleCloseUserMenu(setting: string) {
    setAnchorElUser(null)
    if (setting === "Dashboard") {
      router.push("/user/dashboard")
    }
    else if (setting === "Sair") {
      signOut({
        callbackUrl: "/"
      })
    }
    else if (setting === "Profile") {
      router.push("/user/profile")
    }
  }


  return (
    <AppBar position="static"
      sx={{
        bgcolor: theme.palette.primary.main,
        backgroundImage: "none",
        color: "#000"
      }}>
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
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AdSpace
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <StyledButton
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
              </StyledButton>
            ))}
          </Box>


          <Box>
            <Link href="/user/publish" passHref legacyBehavior>
              <Button color='inherit'
                variant='outlined'
                sx={{
                  mr: theme.spacing(1),
                  padding: theme.spacing(0.5, 2),
                  "&:hover": {
                    bgcolor: "rgba(8, 92, 43, 0.205)"
                  }
                }}
              >
                <Typography sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: {
                    md: "15px",
                    xs: "10px"
                  },
                }}>
                  Criar Anúncio
                </Typography>
              </Button>
            </Link>
          </Box>

          {session.data ?
            <Box sx={{ flexGrow: 0, ml: theme.spacing(2) }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    borderRadius: "100px",
                    "&:hover": {
                      bgcolor: "rgba(8, 92, 43, 0.205)"
                    }
                  }}>
                  <Avatar alt={`${session.data.user?.name}`} src={`${session.data.user?.image}`}>
                    {
                      session.data.user?.image &&
                      <img style={{width: "100%"}} src={`${session.data.user.image}`}/>
                    }
                  </Avatar>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.primary.contrastText}
                    fontWeight={700}
                    sx={{
                      padding: theme.spacing(0, 1),
                    }}>
                    {session.data.user?.name}
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
            <Link href="/auth/signin"
              legacyBehavior
              passHref
            >
              <Button
                color="inherit"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: {
                    md: "15px",
                    xs: "12px"
                  },
                  position: "relative",
                  ml: theme.spacing(1),
                  "&::after": {
                    content: `""`,
                    width: "100%",
                    height: "1px",
                    bgcolor: `${theme.palette.primary.contrastText}`,
                    position: "absolute",
                    bottom: "0",
                    transform: "scaleX(0)",
                    transition: ".3s ease-in-out .0s"

                  },
                  "&:hover": {
                    bgcolor: "rgba(8, 92, 43, 0.205)",
                    "&::after": {
                      transform: "scaleX(1)"
                    }
                  }
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