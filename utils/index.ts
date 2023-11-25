// utils/index.ts
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
