import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import './SearchBar.css';

const SearchBar = () => {
  return ( 
    <FormGroup className="search-bar">
      <FormControlLabel control={<Switch defaultChecked />} label="Show all orders" />
    </FormGroup>
  );
}
 
export default SearchBar;