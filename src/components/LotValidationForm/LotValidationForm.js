import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import './LotValidationForm.css'

const LotValidationForm = ({onSubmitForm}) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return ( 
    <Box onSubmit={(event) => onSubmitForm(event, value)} className="lot-validation-form" component="form">
      <TextField onChange={handleChange} className="lot-validation-form-field lot" label="Lot on Plan" variant="outlined" required />
    </Box>
  );
}
 
export default LotValidationForm;