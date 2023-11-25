import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import InputForm from '../components/InputForm'
import LoanBalanceChart from '../components/LoanBalanceChart'
import { useState } from 'react'
import { Mortgage } from '../model/Mortgage'



const Home: NextPage = () => {
  const [mortgageInfo, setMortgageInfo] = useState<Mortgage>();

  const handleSubmit = (mortgageInfo: Mortgage) => {
    setMortgageInfo(mortgageInfo);
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
          <div className="bg-white p-8 rounded-md shadow-lg max-w-xl w-full md:w-1/2">
            <h1 className="text-xl font-semibold mb-6">Mortgage Calculator</h1>
            <InputForm onSubmit={handleSubmit} />
          </div>
          <div className="bg-white p-8 rounded-md shadow-lg max-w-xl w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Loan Balance Over Time</h2>
            {
              mortgageInfo &&
              mortgageInfo.totalLoan &&
              mortgageInfo.monthlyMortgage &&
              <LoanBalanceChart
                firstPaymentDate={mortgageInfo.firstPaymentDate}
                lastPaymentDate={mortgageInfo.lastPayment}
                monthlyPayment={mortgageInfo.monthlyMortgage}
                totalLoan={mortgageInfo.totalLoan + mortgageInfo.totalInterest}
              />
            }
          </div>
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
