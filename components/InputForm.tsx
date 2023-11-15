// components/InputForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

const InputForm: React.FC = () => {
  const [formData, setFormData] = useState({
    price: '',
    interestRate: '',
    downPayment: '',
    start: '',
    yearlyPropTax: '',
    mortgageLength: '',
    monthlySalary: '',
    monthlyExpenses: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add mortgage calculation logic here
    console.log('Form submitted with data:', formData);
  };

  const labelClassName = "block text-sm font-medium leading-6 text-gray-900"
  const inputClassName = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-y-6">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 grid sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        <label className={labelClassName} aria-required>
          Price
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </label>

        <label className={labelClassName}>
          Interest Rate (%)
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </label>

        <label className={labelClassName}>
          Down Payment
          <input
            type="number"
            name="downPayment"
            value={formData.downPayment}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </label>

        <label className={labelClassName}>
          Start
          <input
            type="date"
            name="start"
            value={formData.start}
            min={todayDate}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </label>

        <label className={labelClassName}>
          Yearly Property Tax
          <input
            type="number"
            name="yearlyPropTax"
            value={formData.yearlyPropTax}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </label>

        <label className={labelClassName}>
          Mortgage Length
          <input
            type="number"
            name="mortgageLength"
            value={formData.mortgageLength}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </label>

        <label className={labelClassName}>
          Monthly Salary
          <input
            type="number"
            name="monthlySalary"
            value={formData.monthlySalary}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </label>

        <label className={labelClassName}>
          Monthly Expenses
          <input
            type="number"
            name="monthlyExpenses"
            value={formData.monthlyExpenses}
            onChange={handleChange}
            className={inputClassName}
            required
          />
        </label>
      </form>

      <input
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-md mx-auto block"
        value="Calculate"
        required
      />
    </div>
  );
};

export default InputForm;
