import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import './PropertyDetailsForm.css';
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Divider
} from '@mui/material';
import { Context } from '../../store/Store';

const PropertyDetailsForm = () => {
  let orderObject = {
    lotonplan: '',
    ref: '',
    price: '',
    buyers: [{ value: '' }],
    sellers: [{ value: '' }],
    status: 0,
  }

  const { register, handleSubmit, formState: { errors } } = useForm();
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

  const addSeller = () => {
    setFormData({ ...formData, sellers: [...formData.sellers, { value: '' }] });
  };

  return (
    <Box className='property-details-form' component="form">
      <h3 className='property-details-title'>Property Details</h3>
      <TextField className='property-details-form-field lg' label="Address" value={formData.propertyAddress} variant="outlined" disabled />
      <TextField className='property-details-form-field' label="Council" value={formData.council} variant="outlined" disabled />
      <TextField className='property-details-form-field' label="Lot on Plan" value={formData.lotonplan} variant="outlined" disabled />
      <Divider variant="middle" />
      <h3 className='property-details-title'>Purchase Details</h3>
      <FormControl className='property-details-form-field' required>
        <TextField
          value={formData.ref}
          label="Your Reference"
          onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
          variant="outlined"
        />
      </FormControl>
      <FormControl className='property-details-form-field' required>
        <TextField
          type="number"
          value={formData.price}
          label="Price"
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          variant="outlined"
        />
      </FormControl>
      <div className='property-details-section'>
        <FormControl className='property-details-column' margin="normal">
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
                      setFormData({ ...formData, buyers: newFields });
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
        <FormControl className='property-details-column' margin="normal">
          <FormLabel>Sellers</FormLabel>
          <FormGroup>
            {formData.sellers.map((field, index) => (
              <FormControlLabel
                key={index}
                control={
                  <TextField
                    className='property-details-form-field'
                    value={field.value}
                    onChange={(e) => {
                      const newFields = [...formData.sellers];
                      newFields[index].value = e.target.value;
                      setFormData({ ...formData, sellers: newFields });
                    }}
                  />
                }
              />
            ))}
          </FormGroup>
          <Button
            onClick={addSeller}
          >+
          </Button>
        </FormControl>
      </div>
    </Box>
  );
}

export default PropertyDetailsForm;