// utils/index.ts
import { Affordability } from '../model/Affordability'
import { Mortgage } from '../model/Mortgage'

const YearlyMaintenanceRate = 0.03

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMortgageInfo(formData: any): Mortgage {
  const numberOfPayments = parseFloat(formData.mortgageLength) * 12
  const loanAmount =
    parseFloat(formData.price) - parseFloat(formData.downPayment)
  const monthlyMortgage = getMonthlyMortgage(
    loanAmount,
    parseFloat(formData.interestRate),
    numberOfPayments
  )
  const totalMortgage = monthlyMortgage * numberOfPayments
  const totalInterest = totalMortgage - loanAmount
  const monthlyPropTaxes = getMonthlyPropTaxes(formData.yearlyPropTax)
  const monthlyMaintenace = getMonthlyMaintenance(formData.price)
  const totalMonthlyCost =
    monthlyMortgage + monthlyPropTaxes + monthlyMaintenace
  const lastPayment = getLastPayment(formData.start, numberOfPayments)
  const startDate = new Date(formData.start)

  const mortgageInfo: Mortgage = {
    monthlyMortgage: monthlyMortgage,
    totalLoan: loanAmount,
    totalInterest: totalInterest,
    totalMortgage: totalMortgage,
    monthlyPropTaxes: monthlyPropTaxes,
    monthlyMaintenaceExpenses: monthlyMaintenace,
    totalMonthlyCost: totalMonthlyCost,
    lastPayment: lastPayment,
    firstPaymentDate: new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      1
    ),
  }
  return mortgageInfo
}

function getMonthlyMortgage(
  loan: number,
  interestRate: number,
  numberOfPayments: number
): number {
  const monthlyInterest = interestRate / 100 / 12
  return (
    (loan * monthlyInterest) /
    (1 - (1 + monthlyInterest) ** (-1 * numberOfPayments))
  )
}

function getMonthlyPropTaxes(taxes: number): number {
  return taxes / 12
}

function getMonthlyMaintenance(price: number): number {
  return (price * YearlyMaintenanceRate) / 12
}

function getLastPayment(start: string, numberOfPayments: number): Date {
  const startDate = new Date(start)
  const lastPaymentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + numberOfPayments,
    1
  )
  return lastPaymentDate
}

export function getAffordability(formData: any, mortgageInfo: Mortgage): Affordability {
  const salaryMinusExpenses = formData.monthlySalary - formData.monthlyExpenses;
  const affordable = salaryMinusExpenses >= mortgageInfo.totalMonthlyCost;
  const message = getMessage(salaryMinusExpenses, mortgageInfo.totalMonthlyCost);
  const affordability: Affordability = {
    affordable: affordable,
    message: message
  }
  return affordability
}

function getMessage(salaryMinusExpenses:number, costs:number): String {
  if (salaryMinusExpenses - costs <= 0){
    return "Cannot afford the property at all we recommend generating a minimum of " + (-1*(salaryMinusExpenses-costs)).toFixed(2) + " dollars per month in order to meet the minimum requirement to afford the property. Here are some possible solutions: finding a less expensive property, reduce expenses or increase income."
  }
  if ((salaryMinusExpenses-costs)/costs <0.2) {
    const extraAmount = costs*0.2 - (salaryMinusExpenses - costs);
    return "You can afford the property but we recommend generating an additional " + extraAmount.toFixed(2) + " dollars per month in order to comfortably afford the house. Here are some recommendations: reduce expenses or increase income."
  }

  return "You can definitly afford the house it is well within your means."

}