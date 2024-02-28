import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import LotValidationForm from '../LotValidationForm/LotValidationForm';
import PropertyDetailsForm from '../PropertyDetailsForm/PropertyDetailsForm';
import { Context } from '../../store/Store';
import { SaveLotOnPlan, ValidateLotOnPlan } from '../../actions/Actions';

import './ClientStepper.css'

const steps = ['Validate Lot on Plan', 'Fill out property information'];

const ClientStepper = () => {
  const [state, dispatch] = useContext(Context)
  const { lotonplan } =  state.FormReducer
	const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  useEffect(() => {
    const [lot, plan] = lotonplan.split('/')
    const body = {
      lot: lot,
      plan: plan
    }
    validateLotOnPlanExists(body)
  }, [lotonplan])

  const renderStep = (step) => {
    if (step === 0) {
      return <LotValidationForm onSubmitForm={onSubmitForm} /> 
    }
    if (step === 1 ) {
      return <PropertyDetailsForm />
    }
  }

  const validateLotOnPlanExists = async (body) => {
    try {
      const response = await axios.post(`http://localhost:8000/validate-lot-plan`, body)
      console.log(response.data)
      const data = await response.data
      if (data) {
        dispatch(SaveLotOnPlan(data))
      }
    } catch (error) {
      console.error('Error processing request, please check the format of the lot on plan entered:', error)
    }
  }

  const onSubmitForm = (event, lotOnPlan) => {
    event.preventDefault()
    dispatch(ValidateLotOnPlan(lotOnPlan))
  }

	const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

	const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

	const handleReset = () => {
    setActiveStep(0);
  };
	
  return (
    <div className='client-stepper'>
      <Box className="client-stepper-container" sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box className="client-stepper-button-group" sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderStep(activeStep)}
            <Box className="client-stepper-button-group" sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                type="button"
              >
                Back
              </Button>

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default ClientStepper;
