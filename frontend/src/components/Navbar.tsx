import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

function Navbar() {

  const pages = ['Main', 'Book', 'Appointments', 'Modify'];
  const navigate = useNavigate();

  const goToPage = (page: string) => {
    navigate(`/${page.toLowerCase()}`);
  }

    return (
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'center'}}>
          <Stack direction={'row'} spacing={5}>
          {pages.map((page) => (
                <Button key={page} color="inherit" onClick={() => goToPage(page)}>
                  <Typography sx={{ textAlign: 'center', paddingX: 2}}>{page}</Typography>
                </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      
    )
  }
  
  export default Navbar