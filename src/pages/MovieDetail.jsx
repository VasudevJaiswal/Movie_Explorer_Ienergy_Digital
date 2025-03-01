import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Rating,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getMovieDetails } from '../services/api';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(id)
      .then((data) => {
        if (data.Response === 'True') {
          setMovie(data);
          setError(null);
        } else {
          setError(data.Error);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const renderSkeleton = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Skeleton variant="rectangular" height={500} sx={{ borderRadius: '8px' }} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Skeleton variant="text" height={60} width="80%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={40} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mt: 2, borderRadius: '8px' }} />
      </Grid>
    </Grid>
  );

  if (error)
    return (
      <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
        <Typography color="error" variant="h5" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mt: 2,
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Go Back
        </Button>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          backgroundColor: '#1976d2',
          color: 'white',
          '&:hover': { backgroundColor: '#1565c0' },
        }}
      >
        Back
      </Button>

      {loading ? (
        renderSkeleton()
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
              alt={movie.Title}
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              {movie.Title}
            </Typography>
            <Box sx={{ mb: 2 }}>
              {movie.Genre.split(',').map((genre) => (
                <Chip
                  key={genre}
                  label={genre.trim()}
                  sx={{
                    mr: 1,
                    mb: 1,
                    backgroundColor: '#1976d2',
                    color: 'white',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                  variant="filled"
                />
              ))}
            </Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {movie.Year} • {movie.Runtime} • {movie.Rated}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Rating
                value={parseFloat(movie.imdbRating) / 2}
                precision={0.5}
                readOnly
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#ffb400',
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {movie.imdbRating}/10 ({movie.imdbVotes} votes)
              </Typography>
            </Box>
            <Paper sx={{ p: 3, mt: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                {movie.Plot}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography>
                  <strong>Director:</strong> {movie.Director}
                </Typography>
                <Typography>
                  <strong>Writers:</strong> {movie.Writer}
                </Typography>
                <Typography>
                  <strong>Cast:</strong> {movie.Actors}
                </Typography>
                <Typography>
                  <strong>Awards:</strong> {movie.Awards}
                </Typography>
                <Typography>
                  <strong>Box Office:</strong> {movie.BoxOffice || 'N/A'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MovieDetail;
