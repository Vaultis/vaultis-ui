import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface SliceProps {
    /**
     * Represents different components or categories of salary spending
     */
    category: string;
    /**
     * Indicates the amount allocated to a specific salary category
     */
    value: number;
};

interface PieChartProps {
    /**
     * Pie chart data
     */
    data: SliceProps[];
};

/**
 * Primary Pie Chart component for user interaction
 */
export const PieChartComponent = ({ data }: PieChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    fontFamily='sans-serif'
                    data={data}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.category}/>
                    ))}
                </Pie>
                <Legend
                    height={36}
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                />
            </PieChart>
        </ResponsiveContainer>
    );
};
