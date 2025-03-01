import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    py={4}
    id="scroll-sentinel"
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner; 