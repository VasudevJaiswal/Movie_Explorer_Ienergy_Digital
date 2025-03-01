import { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchMovies } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      setLoading(true);
      searchMovies(debouncedValue, 1)
        .then((data) => {
          if (data.Response === 'True') {
            setSuggestions(data.Search.slice(0, 5));
          } else {
            setSuggestions([]);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue]);

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.Title);
    setSuggestions([]);
  };

  return (
    <ClickAwayListener onClickAway={() => setSuggestions([])}>
      <div>
        <TextField
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for movies..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          ref={(el) => setAnchorEl(el)}
          sx={{ mb: 2 }}
        />
        {suggestions.length > 0 && (
          <Popper
            open={true}
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ width: anchorEl?.clientWidth, zIndex: 1300 }}
          >
            <Paper elevation={3}>
              <List>
                {suggestions.map((suggestion) => (
                  <ListItem
                    key={suggestion.imdbID}
                    button
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ListItemText
                      primary={suggestion.Title}
                      secondary={suggestion.Year}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Popper>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar; 