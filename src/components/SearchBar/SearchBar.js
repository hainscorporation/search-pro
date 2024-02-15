import { useContext, useState, useCallback } from 'react';
import { debounce } from 'lodash';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import { ShowAllOrders, SearchOrderByTerm } from '../../actions/Actions';
import { Context } from '../../store/Store';

import './SearchBar.css';

const SearchBar = () => {
  const [state, dispatch] = useContext(Context)
  const [checked, setChecked] = useState(false)
  const [searchTerm,  setSearchTerm] = useState('')
  
  const handleSwitchChange = (event) => {
    setChecked(event.target.checked)
    dispatch(ShowAllOrders(event.target.checked))
  }
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    dispatch(SearchOrderByTerm(event.target.value))
  }
  
  const debounceHandler = useCallback(debounce(handleSearchChange, 300), [])

  return ( 
    <FormGroup className="search-bar">
      <TextField
        className="search-bar-field"
        label="Search field"
        type="search"
        variant="filled"
        placeholder='Search Order by Reference'
        onChange={debounceHandler}
        onInput={debounceHandler}
      />
      <FormControlLabel control={<Switch onChange={handleSwitchChange} checked={checked} />} label="Show all orders" />
    </FormGroup>
  );
}
 
export default SearchBar;