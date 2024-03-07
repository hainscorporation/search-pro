import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'; 

import './LotValidationForm.css'

const LotValidationForm = ({onEnterClick}) => {
  const { register, formState: { errors } } = useForm({ mode: "all" });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnterClick(e, e.target.value);
    }
  }

  return ( 
    <Box className="lot-validation-form">
      <TextField 
        error={!!errors.lot}
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