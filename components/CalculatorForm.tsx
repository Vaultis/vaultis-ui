import React, {useState} from 'react';
import styles from '../styles/Home.module.css';

export const CalculatorFormComponent = () => {

    const [price, setPrice] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [start, setStart] = useState('');
    const [yearlyPropTax, setYearlyPropTax] = useState('');
    const [mortgageLength, setMortgageLength] = useState('');
    const [monthlySalary, setMonthlySalary] = useState('');
    const [monthlyExpenses, setMonthlyExpenses] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(price);
    }

    return (
        <form>
            <div className={styles.grid}>
                 <div className={styles.gridItem}>
                     <label htmlFor="price">Price</label> <br/>
                     <input type="number" step="0.01" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                 <div className={styles.gridItem}>
                     <label htmlFor="interestRate">Interest Rate</label> <br/>
                     <input type="number" step="0.01" id="interestRate" name="interestRate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}/>
                 </div>
                 <div className={styles.gridItem}>
                     <label htmlFor="downPayment">Down Payment</label> <br/>
                     <input type="number" step="0.01" id="downPayment" name="downPayment" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}/>
                 </div>
                 <div className={styles.gridItem}>
                     <label htmlFor="start">Start day</label> <br/>
                     <input type="date" id="start" name="start" value={start} onChange={(e) => setStart(e.target.value)}/>
                 </div>
                 <div className={styles.gridItem}>
                     <label htmlFor="yearlyPropTax">Yearly Property Taxes</label> <br/>
                     <input type="number" step="0.01" id="yearlyPropTax" name="yearlyPropTax" value={yearlyPropTax} onChange={(e) => setYearlyPropTax(e.target.value)}/>
                 </div>
                 <div className={styles.gridItem}>
                    <label htmlFor="mortgageLength">Mortgage length</label> <br/>
                    <input type="number" step="0.01" id="mortgageLength" name="mortgageLength" value={mortgageLength} onChange={(e) => setMortgageLength(e.target.value)}/>
                 </div>
                 <div className={styles.gridItem}>
                    <label htmlFor="monthlySalary">Monthly Salary</label> <br/>
                    <input type="number" step="0.01" id="monthlySalary" name="monthlySalary" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)}/>
                 </div>
                 <div className={styles.gridItem}>
                    <label htmlFor="monthlyExpenses">Monthly Expenses</label> <br/>
                    <input type="number" step="0.01" id="monthlyExpenses" name="monthlyExpenses" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)}/>
                 </div>
                 <div className={styles.gridItem}>
                    <input type="submit" value="Submit"/>
                 </div>
            </div>
        </form>
    )
}