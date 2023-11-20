// utils/index.ts
import {Mortgage} from '../model/Mortgage';

const YearlyMaintenanceRate = 0.03

export function mortgageAlgo(formData: any): Mortgage {
    const monthlyInterest = (parseFloat(formData.interestRate)/100)/12;
    const numberOfPayments = parseFloat(formData.mortgageLength) * 12;
    const loanAmount = parseFloat(formData.price) - parseFloat(formData.downPayment);
    const monthlyMortgage = (loanAmount * monthlyInterest) / (1-(1+monthlyInterest)**(-1*numberOfPayments));
    const totalMortgage = monthlyMortgage * numberOfPayments;
    const totalInterest = totalMortgage - loanAmount;
    const mortgageInfo: Mortgage = {
        monthlyMortgage: monthlyMortgage,
        totalLoan: loanAmount,
        totalInterest: totalInterest,
        totalMortgage: totalMortgage
    }
    return mortgageInfo
}

export function monthlyExpenses(price: number, taxes: number): number {
    return price * YearlyMaintenanceRate / 12
}