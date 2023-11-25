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
  firstPaymentDate: Date;
  lastPaymentDate: Date;
  monthlyPayment: number;
  totalLoan: number;
}

const LoanChartBalance: React.FC<LoanChartProps> = ({
  firstPaymentDate,
  lastPaymentDate,
  monthlyPayment,
  totalLoan
}) => {

  const calculateLoanBalance = () => {
    const loanData = [];
    let remainingLoan = totalLoan;

    for (let currentDate = new Date(firstPaymentDate);
      currentDate <= lastPaymentDate;
      currentDate.setMonth(currentDate.getMonth() + 1)
    ) {
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
          formatter={(value) => [`
          ${value.toLocaleString('en-CA', {
            style: 'currency',
            currency: 'CAD',
          })}`, 'Remaining']}
          labelFormatter={(value) => `Date: ${value}`}
        />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="balance" name="Remaining Loan Balance (with total interest)" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoanChartBalance;
