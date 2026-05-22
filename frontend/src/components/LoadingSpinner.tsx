import { CircularProgress, Box, Typography } from "@mui/material";

interface Props {
  label?: string;
}

function LoadingSpinner({ label = "Loading..." }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      // Subtract the AppBar height so the spinner centres in the visible
      // area of the page, not behind the navbar.
      // AppBar is 56px on mobile (7 * 8px) and 64px on desktop (8 * 8px).
      sx={{
        minHeight: {
          xs: "calc(100vh - 56px)",
          sm: "calc(100vh - 64px)",
        },
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

export default LoadingSpinner;