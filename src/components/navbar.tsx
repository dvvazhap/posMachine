import React, { ReactElement, useEffect, useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Context } from "../context/contextProvider";
import { config } from '../config';

export function NavbarComponent() {
  // @ts-ignore
  const { appInitialized, page, setPage, jsonConfig } = useContext(Context);

  const pages = [{ display: 'Dashboard', redirect: 'dashboard' },
  { display: 'Dine In', redirect: 'dineIn' },
  { display: 'Take Away', redirect: 'takeaway' },
  { display: 'Settings', redirect: 'settings' }];
  const settings = ['Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("handleOpenNavMEnu :", event.currentTarget);
    // @ts-ignore
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("handleOpenUserMEnu :", event.currentTarget);
    // @ts-ignore
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (redirect: string) => {
    if (redirect !== "") {
      setPage(redirect);
    }
    console.log("handleCloseNavMEnu :", redirect);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    console.log("handleCloseUserMenu :");
    setAnchorElUser(null);
  };

  // useEffect(()=>{
  //   console.log("appInitialized :", appInitialized);
  // },[appInitialized]);

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {jsonConfig.restName}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                onClose={() => handleCloseNavMenu("")}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((_page) => (
                  <MenuItem key={_page.redirect}
                  disabled={appInitialized ? false : (["settings"].includes(_page.redirect) ? false : true)}
                  onClick={() => handleCloseNavMenu(_page.redirect)}>
                    <Typography sx={{ color: page === _page.redirect ? '#ba000d' : '' }} textAlign="center">{_page.display}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {jsonConfig.restName}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((_page) => (
                <Button
                  key={_page.redirect}
                  disabled={appInitialized ? false : (["settings"].includes(_page.redirect) ? false : true)}
                  onClick={() => handleCloseNavMenu(_page.redirect)}
                  sx={{ color: page === _page.redirect ? '#000000' : 'white', my: 2, fontWeight: 'bold', display: 'block' }}
                >
                  {_page.display}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
} 