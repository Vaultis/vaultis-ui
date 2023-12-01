import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import InputForm from '../components/InputForm'
import LoanBalanceChart from '../components/LoanBalanceChart'
import { useState } from 'react'
import { Mortgage } from '../model/Mortgage'
import { formatPrice } from '../utils'
import { Affordability } from '../model/Affordability'
import { PieChartComponent } from '../components/PieChart'



const Home: NextPage = () => {
  const [mortgageInfo, setMortgageInfo] = useState<Mortgage>();
  const [affordability, setAffordability] = useState<Affordability>();

  const handleSubmit = (mortgageInfo: Mortgage, affordability: Affordability) => {
    setMortgageInfo(mortgageInfo);
    setAffordability(affordability);
  }

  const getTitleColor = () => {
    if (affordability === undefined) return '';
    
    if (affordability.isAffordable) {
      if (affordability.isComfortablyAffordable) {
        return 'text-green-500';
      } else {
        return 'text-yellow-500';
      }
    } else {
      return 'text-red-500';
    }
  }

  const getTitle = () => {
    if (affordability === undefined) return '';

    if (affordability.isAffordable) {
      if (affordability.isComfortablyAffordable) {
        return 'Affordable';
      } else {
        return 'Affordable but...';
      }
    } else {
      return 'Not Affordable';
    }
  }


  const getDescription = () => {
    if (affordability === undefined) return '';

    if (affordability.isAffordable) {
      if (affordability.isComfortablyAffordable) {
        return 'Based on your current income and expenses, you can afford this property. You have a buffer of at least 20% of disposable income per month to account for savings and unexpected expenses.';
      } else if (affordability.recommendedAdditionalAffordability) {
        return `Based on your current income and expenses, you can afford this property, but we recommend generating an additional ${formatPrice(affordability.recommendedAdditionalAffordability)} per month (20% of your monthly salary) as a buffer in order to comfortably afford the house.`;
      }
    } else if (affordability.missingAffordability) {
      return `Based on your current income and expenses, you cannot afford this property. You need a minimum of ${formatPrice(affordability.missingAffordability)} more per month to cover the costs of this property.`;
    }
  }

  const getRecommendations = () => {
    if (affordability === undefined) return [];

    const recommendations: string[] = [];

    if (affordability.isAffordable) {
      if (affordability.isComfortablyAffordable) {
        recommendations.push('You reach out to your bank to get a pre-approval for a mortgage');
        recommendations.push('You express interest in the property and start the process of buying it');
        recommendations.push('You may wish to continue saving for a down payment if you do not feelr eady to buy yet');
      } else if (affordability.recommendedAdditionalAffordability) {
        recommendations.push('You may consider looking for ways to generate additional income');
        recommendations.push('You may consider looking for ways to reduce your expenses');
        recommendations.push('You may consider looking for a cheaper property');
      }
    } else {
      recommendations.push('You may consider looking for ways to generate additional income');
      recommendations.push('You may consider looking for ways to reduce your expenses');
      recommendations.push('You may consider looking for a cheaper property');
    }

    return recommendations;
  }

  const getPieChartData = () => {
    if (mortgageInfo === undefined) return [];

    const data = [
      { category: 'Mortgage', value: mortgageInfo.monthlyMortgage },
      { category: 'Taxes', value: mortgageInfo.monthlyPropTaxes },
      { category: 'Maintenance', value: mortgageInfo.monthlyMaintenaceExpenses },
      { category: 'Other Expenses', value: mortgageInfo.other },
      { category: 'Savings', value: mortgageInfo.savings },
    ];

    return data;
  }

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Vaultis</title>
        <meta name="description" content="Vaultis is your go-to tool for effortlessly keeping tabs on your income, expenses, investments; savings goals and any other financial needs. With this app by your side, you're not just managing finances; you're charting a path toward your financial dreams with a confident stride." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-white p-8 rounded-md shadow-lg max-w-xl w-full">
            <div>
              <h1 className="text-2xl font-semibold mb-6">Mortgage Calculator</h1>
              <InputForm onSubmit={handleSubmit} />
            </div>
            {mortgageInfo && 
            <div className="mt-16">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <p className='mb-4'>Here is a summary of the costs related to the house</p>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">Category</th>
                      <th className="border px-4 py-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Monthly Payment</td>
                      <td className="border px-4 py-2">{formatPrice(mortgageInfo.monthlyMortgage)}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Total Mortgage</td>
                      <td className="border px-4 py-2">{formatPrice(mortgageInfo.totalLoan)}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Total Interest</td>
                      <td className="border px-4 py-2">{formatPrice(mortgageInfo.totalInterest)}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Total Sum</td>
                      <td className="border px-4 py-2">{formatPrice(mortgageInfo.totalLoan + mortgageInfo.totalInterest)}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Last Payment</td>
                      <td className="border px-4 py-2">{mortgageInfo.lastPayment.toISOString().split('T')[0]}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Monthly Maintenance</td>
                      <td className="border px-4 py-2">{formatPrice(mortgageInfo.monthlyMaintenaceExpenses)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
}
          </div>

          {affordability && (
            <div className={`bg-white p-8 rounded-md shadow-lg max-w-xl w-full md:w-1/2`}>
              <div className='affordable-message'>
                <h2 className={`text-xl ${getTitleColor()} font-bold`}>{getTitle()}</h2>
                <p className="mt-2">{getDescription()}</p>
                <ul className="list-disc list-inside mt-4">
                  {getRecommendations().map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>

              <div className='mt-8'>
                <h2 className="text-xl font-semibold mb-4">Loan Balance Over Time</h2>
                {mortgageInfo && (
                  <LoanBalanceChart
                    firstPaymentDate={mortgageInfo.firstPaymentDate}
                    lastPaymentDate={mortgageInfo.lastPayment}
                    monthlyPayment={mortgageInfo.monthlyMortgage}
                    totalLoan={mortgageInfo.totalLoan + mortgageInfo.totalInterest}
                  />
                )}
              </div>

              <div className='mt-8'>
                <h2 className="text-xl font-semibold mb-4">Monthly Spending Breakdown</h2>
                <PieChartComponent data={getPieChartData()} />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
