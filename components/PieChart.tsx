import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#000000'];

interface SliceProps {
    /**
     * Represents different components or categories of salary spending
     */
    category: string;
    /**
     * Indicates the amount allocated to a specific salary category
     */
    value: number;
}

interface PieChartProps {
    /**
     * Pie chart data
     */
    data: SliceProps[];
}

/**
 * Primary Pie Chart component for user interaction
 */
export const PieChartComponent = ({ data }: PieChartProps) => {

    const getFormattedData = () => {
        return data.map((slice) => {
            const { category, value } = slice
            return {
                category: category,
                value: Math.round(value * 100) / 100,
            };
        });
    }

    const formatData = getFormattedData();

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={formatData}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                    format='number'
                >
                    {formatData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.category} />
                    ))}
                </Pie>
                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="bottom"
                />
            </PieChart>
        </ResponsiveContainer>
    );
};
