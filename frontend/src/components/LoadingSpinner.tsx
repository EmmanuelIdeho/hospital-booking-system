import { CircularProgress, Box } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;
