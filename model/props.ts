export interface IFormData {
  price: string
  interestRate: string
  downPayment: string
  start: string
  yearlyPropTax: string
  mortgageLength: string
  monthlySalary: string
  monthlyExpenses: string
}

export interface IInputFormProps {
  onSubmit: (formValues: IFormData) => void
}
