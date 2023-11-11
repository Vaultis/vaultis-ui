import React from 'react';
import styles from '../styles/Home.module.css';

export const CalculatorFormComponent = () => {
    return (
        <form>
            <div className={styles.grid}>
                 <div className={styles.gridItem}>
                     <label htmlFor="price">Price</label> <br/>
                     <input type="number" step="0.01" id="price" name="price"/>
                </div>
                 <div className={styles.gridItem}>
                     <label htmlFor="mSalary">Monthly Salary</label> <br/>
                     <input type="number" step="0.01" id="mSalary" name="mSalary"/>
                 </div>
                 <div className={styles.gridItem}>
                     <label htmlFor="downPayment">Down Payment</label> <br/>
                     <input type="number" step="0.01" id="downPayment" name="downPayment"/>
                 </div>
                 <div className={styles.gridItem}>
                     <label htmlFor="start">Start day</label> <br/>
                     <input type="date" id="start" name="start"/>
                 </div>
                 <div className={styles.gridItem}>
                     <label htmlFor="yearlyPropTax">Yearly Property Taxes</label> <br/>
                     <input type="number" step="0.01" id="yearlyPropTax" name="yearlyPropTax"/>
                 </div>
                 <div className={styles.gridItem}>
                    <label htmlFor="mortgageLength">Mortgage length</label> <br/>
                    <input type="number" step="0.01" id="mortgageLength" name="mortgageLength"/>
                 </div>
                 <div className={styles.gridItem}>
                    <label htmlFor="monthlySalary">Monthly Salary</label> <br/>
                    <input type="number" step="0.01" id="monthlySalary" name="monthlySalary"/>
                 </div>
                 <div className={styles.gridItem}>
                    <label htmlFor="monthlyExpenses">Monthly Expenses</label> <br/>
                    <input type="number" step="0.01" id="monthlyExpenses" name="monthlyExpenses"/>
                 </div>
                    <div className={styles.gridItem}>
                    <input type="submit" value="Submit"/>
                 </div>
            </div>
        </form>
    )
}