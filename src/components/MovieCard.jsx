import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Card
    component={Link}
    to={`/movie/${movie.imdbID}`}
    sx={{
      textDecoration: 'none',
      borderRadius: '12px',
      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      },
    }}
  >
    <CardMedia
      component="img"
      height="300"
      image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
      alt={movie.Title}
      sx={{
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        objectFit: 'cover',
      }}
    />
    <CardContent
      sx={{
        padding: '16px',
        backgroundColor: '#fff',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
      }}
    >
      <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: '#333' }}>
        {movie.Title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {movie.Year}
      </Typography>
    </CardContent>
  </Card>
);

export default MovieCard;
