import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Grid, Button, Typography } from '@mui/material';

interface FormData {
  price: string;
  interestRate: string;
  downPayment: string;
  startYear: string;
  yearlyPropTax: string;
  mortgageLength: string;
  monthlySalary: string;
  monthlyExpenses: string;
}

const InputForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    price: '',
    interestRate: '',
    downPayment: '',
    startYear: '',
    yearlyPropTax: '',
    mortgageLength: '',
    monthlySalary: '',
    monthlyExpenses: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement your mortgage calculation logic here
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* First Column */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('price', e.target.value)
            }
          />
          {/* Add other fields for the first column */}
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Interest Rate"
            type="number"
            fullWidth
            value={formData.interestRate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('interestRate', e.target.value)
            }
          />
          {/* Add other fields for the second column */}
        </Grid>

        {/* Third Column */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Down Payment"
            type="number"
            fullWidth
            value={formData.downPayment}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('downPayment', e.target.value)
            }
          />
          {/* Add other fields for the third column */}
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Calculate
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default InputForm;
