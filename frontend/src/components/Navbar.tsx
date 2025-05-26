import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";

function Navbar() {

  const pages = ['Modify', 'Book', 'Appointments']

    return (
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'center'}}>
          <Stack direction={'row'} spacing={5}>
          {pages.map((page) => (
                <Button key={page}>
                  <Typography sx={{ textAlign: 'center', paddingX: 2}}>{page}</Typography>
                </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      
    )
  }
  
  export default Navbar