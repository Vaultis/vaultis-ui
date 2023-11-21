// utils/index.ts
import {Mortgage} from '../model/Mortgage';

const YearlyMaintenanceRate = 0.03


export function getMortgageInfo(formData: any): Mortgage {
    const numberOfPayments = parseFloat(formData.mortgageLength) * 12;
    const loanAmount = parseFloat(formData.price) - parseFloat(formData.downPayment);
    const monthlyMortgage = getMonthlyMortgage(loanAmount, parseFloat(formData.interestRate), numberOfPayments);
    const totalMortgage = monthlyMortgage * numberOfPayments;
    const totalInterest = totalMortgage - loanAmount;
    const monthlyPropTaxes = getMonthlyPropTaxes(formData.price, formData.taxes/100);
    const monthlyMaintenace = getMonthlyMaintenance(formData.price);
    const totalMonthlyCost = monthlyMortgage + monthlyPropTaxes + monthlyMaintenace
    const mortgageInfo: Mortgage = {
        monthlyMortgage: monthlyMortgage,
        totalLoan: loanAmount,
        totalInterest: totalInterest,
        totalMortgage: totalMortgage,
        monthlyPropTaxes: monthlyPropTaxes,
        monthlyMaintenaceExpenses: monthlyMaintenace,
        totalMonthlyCost: totalMonthlyCost,
        //ToDo lastPayment
    }
    return mortgageInfo
}

function getMonthlyMortgage(loan: number, interestRate: number, numberOfPayments: number): number {
    const monthlyInterest = (interestRate/100)/12;
    return (loan * monthlyInterest) / (1-(1+monthlyInterest)**(-1*numberOfPayments));
}

function getMonthlyPropTaxes(price: number, taxes: number): number {
    return price * taxes / 12
}

function getMonthlyMaintenance(price: number): number {
    return price * YearlyMaintenanceRate / 12
}