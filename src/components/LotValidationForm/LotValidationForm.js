import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import './LotValidationForm.css'

const LotValidationForm = () => {
  return ( 
    <Box className="lot-validation-form" component="form">
      <TextField className="lot-validation-form-field" label="Reference" variant="outlined" required />
      <TextField className="lot-validation-form-field lot" label="Lot on Plan" variant="outlined" required />
    </Box>
  );
}
 
export default LotValidationForm;