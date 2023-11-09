import { Meta, StoryObj } from '@storybook/react';
import { PieChartComponent } from '../components/PieChart';

const meta: Meta<typeof PieChartComponent> = {
    title: 'Components/PieChart',
    component: PieChartComponent,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PieChartComponent>;


export const PieChart: Story = {
    args: {
        data: [
            { category: 'Base Salary', value: 60000 },
            { category: 'Bonuses', value: 10000 },
            { category: 'Benefits', value: 8000 },
            { category: 'Taxes', value: 12000 },
        ],
    },
};
