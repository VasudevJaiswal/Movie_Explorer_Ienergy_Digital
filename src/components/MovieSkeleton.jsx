import { Card, CardContent, Box } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MovieSkeleton = () => (
  <Card>
    <Box sx={{ position: 'relative', paddingTop: '150%' }}>
      <Skeleton
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </Box>
    <CardContent>
      <Skeleton width="80%" height={24} />
      <Skeleton width="40%" height={20} />
    </CardContent>
  </Card>
);

export default MovieSkeleton; 