import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'; 

import './LotValidationForm.css'

const LotValidationForm = ({onEnterClick}) => {
  const [value, setValue] = useState('');
  const { register, formState: { errors } } = useForm({ mode: "all" });

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnterClick(e, value);
    }
  }

  return ( 
    <Box className="lot-validation-form">
      <TextField 
        error={!!errors.lot}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="lot-validation-form-field lot" 
        label="Lot on Plan" variant="outlined" 
        {...register('lot', { 
          required: 'Enter the lot on plan to validate.', 
          pattern: {
            value: /[0-9]+\/[A-Za-z]+[0-9]+/i,
            message: 'Use the correct format.'
          }
        })}
        required 
      />
      <div className='validation-error-message'>
        {errors.lot && <span>{errors?.lot?.message}</span>}
      </div>
    </Box>
  );
}
 
export default LotValidationForm;