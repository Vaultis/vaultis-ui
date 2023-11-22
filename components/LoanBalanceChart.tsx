/**
 * Loan Balance Over Time:
 * Show a line graph illustrating how the loan balance decreases over time.
 * X-axis: Time (e.g., months or years).
 * Y-axis: Remaining loan balance.
 */

/*
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LoanBalanceChartProps {
  monthlyPayment: number;
  totalLoan: number;
  loanTermInMonths: number;
}

const LoanBalanceChart: React.FC<LoanBalanceChartProps> = ({ monthlyPayment, totalLoan, loanTermInMonths }) => {
  // Calculate the loan balance over time
  const calculateLoanBalanceOverTime = (): Array<{ month: number; loanBalance: number }> => {
    const data = [];
    let loanBalance = totalLoan;

    for (let month = 0; month <= loanTermInMonths; month++) {
      data.push({ month, loanBalance });
      loanBalance = loanBalance - (monthlyPayment - (loanBalance * (monthlyPayment / totalLoan)));
    }

    return data;
  };

  // Generate data for the line chart
  const chartData = calculateLoanBalanceOverTime();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: 'Loan Balance', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="loanBalance" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoanBalanceChart;
*/

// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// interface LoanBalanceChartProps {
//   startDate: Date;
//   loanTermMonths: number;
//   monthlyPayment: number;
//   totalLoan: number;
// }

// const LoanBalanceChart: React.FC<LoanBalanceChartProps> = ({
//   startDate,
//   loanTermMonths,
//   monthlyPayment,
//   totalLoan,
// }) => {
//   // Calculate the loan balance over time
//   const data = Array.from({ length: loanTermMonths + 1 }, (_, index) => {
//     const monthsPassed = index;
//     const remainingBalance =
//       totalLoan * Math.pow(1 + monthlyPayment / totalLoan, -monthsPassed);
//     const date = new Date(startDate);
//     date.setMonth(startDate.getMonth() + monthsPassed);
//     const formattedDate = `${date.toLocaleString('default', {
//       month: 'short',
//     })} ${date.getFullYear()}`;
//     return {
//       date: formattedDate,
//       loanBalance: remainingBalance.toFixed(2),
//     };
//   });

//   return (
//     <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="date" label={{ value: 'Month and Year', position: 'insideBottom', offset: -10 }} />
//       <YAxis label={{ value: 'Loan Balance ($)', angle: -90, position: 'insideLeft' }} />
//       <Tooltip />
//       <Legend />
//       <Line type="monotone" dataKey="loanBalance" stroke="#8884d8" />
//     </LineChart>
//   );
// };

// export default LoanBalanceChart;

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LoanChartProps {
  startDate: Date;
  monthlyPayment: number;
  totalLoan: number;
}

const LoanChartBalance: React.FC<LoanChartProps> = ({ startDate, monthlyPayment, totalLoan }) => {
  
  // Calculate the loan balance over time
  const calculateLoanBalance = () => {
    const loanData = [];
    let remainingLoan = totalLoan;
    const currentDate = new Date(startDate);

    while (remainingLoan > 0) {
      remainingLoan -= monthlyPayment;

      if (remainingLoan < 0) {
        remainingLoan = 0;
      }

      loanData.push({
        date: new Date(currentDate).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        balance: remainingLoan,
      });

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return loanData;
  };

  const formatYAxis = (tickItem: number) => {
    return `$${tickItem / 1000}k`;
  }

  const loanBalanceData = calculateLoanBalance();

  return (
    <ResponsiveContainer height={400}>
      <LineChart data={loanBalanceData} margin={{ left: 20, bottom: 15 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          interval={'equidistantPreserveStart'}
          label={{ value: 'Date', position: 'insideBottom', offset: -15 }}
        />
        <YAxis
          dataKey="balance"
          label={{ value: 'Loan Balance ($)', angle: -90, position: 'insideLeft', offset: -10 }}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          formatter={(value) => [`$${value}`, 'Loan Balance']}
          labelFormatter={(value) => `Date: ${value}`}
        />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="balance" name="Remaining Loan Balance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoanChartBalance;
