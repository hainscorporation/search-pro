import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import './PropertyDetailsForm.css';
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { Context } from '../../store/Store';

const PropertyDetailsForm = () => {
  let orderObject = {
    lotonplan: '',
    ref: '',
    price: '',
    buyers: [{value: ''}],
    sellers: [{value: ''}],
    status: 0,
  }

  const [state, dispatch] = useContext(Context)
  const { validatedLotOnPlan } = state.FormReducer
  const [formData, setFormData] = useState(orderObject)
  const [fields, setFields] = useState([{ value: '' }]);

  useEffect(() => {
    console.log(validatedLotOnPlan)
    setFormData({
      ...formData,
      council: validatedLotOnPlan.council.Name,
      propertyAddress: validatedLotOnPlan.address.Value,
      lotonplan: `${validatedLotOnPlan.parcel.Lot}/${validatedLotOnPlan.parcel.Plan}`
    })
  }, [validatedLotOnPlan])
  
  const addBuyer = () => {
    setFormData({ ...formData, buyers: [...formData.buyers, { value: '' }] });
  };

  return (
    <Box className='property-details-form' component="form">
      <TextField className='property-details-form-field' label="Address" value={formData.address} variant="outlined" disabled/>
      <TextField className='property-details-form-field' label="Council" value={formData.propertyAddress}  variant="outlined" disabled/>
      <TextField className='property-details-form-field' label="Lot on Plan" value={formData.lotonplan} variant="outlined" disabled/>
      <FormControl className='property-details-form-field' required>
        <TextField
          value={formData.ref}
          label="Your Reference"
          onChange={(e) => setFormData({...formData, ref: e.target.value})}
        />
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl required fullWidth margin="normal">
        <FormLabel>Price</FormLabel>
        <TextField
          className='property-details-form-field'
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
        />
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel>Buyers</FormLabel>
        <FormGroup>
          {formData.buyers.map((field, index) => (
            <FormControlLabel
              key={index}
              control={
                <TextField
                  className='property-details-form-field'
                  value={field.value}
                  onChange={(e) => {
                    const newFields = [...formData.buyers];
                    newFields[index].value = e.target.value;
                    setFormData({...formData, buyers: newFields});
                  }}
                />
              }
            />
          ))}
        </FormGroup>
        <Button
          onClick={addBuyer}
        >
          +
        </Button>
      </FormControl>
    </Box>
  );
}

export default PropertyDetailsForm;