import { useContext, useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import { ShowAllOrders, SearchOrderByTerm, FilterStatus } from '../../actions/Actions';
import { Context } from '../../store/Store';
import { STATUS_ARRAY } from '../../constants/status';

import './SearchBar.css';

const SearchBar = () => {
  const [state, dispatch] = useContext(Context)
  const [checked, setChecked] = useState(false)
  const [searchTerm,  setSearchTerm] = useState('')
  const [status, setStatus] = useState([])

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked)
    dispatch(ShowAllOrders(event.target.checked))
  }
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    dispatch(SearchOrderByTerm(event.target.value))
  }

  const handleChange = (event) => {
    setStatus(event.target.value);
  }

  const handleClose = () => {
    const selectedValues = []
    status.forEach((item) => selectedValues.push(STATUS_ARRAY.find((s) => s.text === item).code))
    dispatch(FilterStatus(selectedValues))
  }

  // Debouncing the search term to avoid unnecessary API calls when typing in the input
  const debounceHandler = useCallback(debounce(handleSearchChange, 300), [])

  return ( 
    <FormGroup className="search-bar">
      <TextField
        className="search-bar-field"
        label="Search field"
        type="search"
        variant="filled"
        placeholder='Search Order by Reference, Client or Lot on Plan'
        onChange={debounceHandler}
        onInput={debounceHandler}
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={status}
          onChange={handleChange}
          onClose={handleClose}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {STATUS_ARRAY.map(({code, text}) => (
            <MenuItem key={code} value={text}>
              <Checkbox checked={status.indexOf(text) > -1} />
              <ListItemText primary={text} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel control={<Switch onChange={handleSwitchChange} checked={checked} />} label="Show all orders" />
    </FormGroup>
  );
}
 
export default SearchBar;