import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Box, Button, TextField, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useMovieContext } from '../context/MovieContext';
import { getLatestMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import MovieSkeleton from '../components/MovieSkeleton';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieListing = () => {
  const {
    movies,
    setMovies,
    loading,
    setLoading,
    error,
    setError,
    page,
    setPage,
  } = useMovieContext();
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to load more movies
  const loadMoreMovies = () => {
    if (movies.length < totalResults) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchMovies = searchTerm ? searchMovies : getLatestMovies;
    fetchMovies(searchTerm, page)
      .then((data) => {
        if (data.Response === 'True') {
          setMovies((prev) => (page === 1 ? data.Search : [...prev, ...data.Search]));
          setTotalResults(parseInt(data.totalResults));
          setError(null);
        } else {
          setError(data.Error);
          setMovies([]);
        }
      })
      .catch((err) => {
        setError(err.message);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [page, searchTerm]);

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ background: 'linear-gradient(90deg, #ff6a00, #ee0979)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Movie Explorer | IEnergy Digital
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box className="search-container">
          <TextField
            fullWidth
            label="Search Movies"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            InputProps={{
              style: { color: '#333', backgroundColor: 'white', borderRadius: '5px' },
            }}
          />
          <IconButton className="search-btn">
            <SearchIcon />
          </IconButton>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Grid container spacing={3} justifyContent="center">
          {movies.slice(0, 12).map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        {loading && (
          <Grid container spacing={3} justifyContent="center">
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <MovieSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && movies.length < totalResults && (
          <Box textAlign="center" py={4}>
            <Button variant="contained" color="primary" onClick={loadMoreMovies} sx={{ fontWeight: 'bold' }}>
              Load More
            </Button>
          </Box>
        )}

        {loading && <LoadingSpinner />}

        {!loading && movies.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6">No movies found</Typography>
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box component="footer" className="footer" sx={{ textAlign: 'center', py: 2, background: 'linear-gradient(90deg, #ff6a00, #ee0979)', color: 'white' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Movie Explorer | IEnergy Digital. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Developed by Vasudev Jaiswal | 
          <Link href="https://github.com/VasudevJaiswal" target="_blank" color="inherit" sx={{ ml: 1 }}>GitHub</Link> | 
          <Link href="https://linkedin.com/in/vasudevjaiswal" target="_blank" color="inherit" sx={{ ml: 1 }}>LinkedIn</Link>
        </Typography>
      </Box>
    </>
  );
};

export default MovieListing;
