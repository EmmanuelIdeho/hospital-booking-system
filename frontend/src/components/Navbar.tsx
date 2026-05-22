import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const pages = ["Main", "Book", "Appointments", "Modify"];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const goToPage = (page: string) => {
    navigate(`/${page.toLowerCase()}`);
    setDrawerOpen(false);
  };

  const isActive = (page: string) =>
    location.pathname === `/${page.toLowerCase()}`;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo / Brand */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocalHospitalIcon fontSize="small" />
            <Typography variant="subtitle1" fontWeight={700} letterSpacing={1}>
              MediBook
            </Typography>
          </Stack>

          {/* Desktop nav */}
          {!isMobile && (
            <Stack direction="row" spacing={1}>
              {pages.map((page) => (
                <Button
                  key={page}
                  color="inherit"
                  onClick={() => goToPage(page)}
                  sx={{
                    fontWeight: isActive(page) ? 700 : 400,
                    borderBottom: isActive(page)
                      ? "2px solid white"
                      : "2px solid transparent",
                    borderRadius: 0,
                    paddingX: 2,
                  }}
                >
                  {page}
                </Button>
              ))}
            </Stack>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              aria-label="open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 220, paddingTop: 2 }} role="presentation">
          <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, pb: 2 }}>
            <LocalHospitalIcon color="primary" fontSize="small" />
            <Typography variant="subtitle1" fontWeight={700} color="primary">
              MediBook
            </Typography>
          </Stack>
          <List>
            {pages.map((page) => (
              <ListItem key={page} disablePadding>
                <ListItemButton
                  selected={isActive(page)}
                  onClick={() => goToPage(page)}
                >
                  <ListItemText
                    primary={page}
                    primaryTypographyProps={{
                      fontWeight: isActive(page) ? 700 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;