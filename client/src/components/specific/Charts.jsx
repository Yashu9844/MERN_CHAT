import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { ArcElement, CategoryScale, Chart as Chartjs, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';

Chartjs.register(
    CategoryScale,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
);

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false
        }
    },
    scales: {
        x: {
            
            grid: {
                display: false
            }
        },
        y: {
            
            grid: {
                display: false
            }
        }
    }
};

const LineCharts = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sample Dataset',
                data: [1, 2, 34,6],
                fill: true,
                borderColor: 'rgba(75,192,192,1)',
                // backgroundColor: 'rgba(75,192,192,0.2)'
            },
            {
                label: 'Sample Dataset',
                data: [1, 5, 48,2],
                fill: true,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)'
            },
        ]
    };

    return (
        <Line data={data} options={lineChartOptions} />
    );
};

const DoughnutCharts = () => {
    return (
        <div>
            Doughnut Chart
        </div>
    );
};

export { LineCharts, DoughnutCharts };
