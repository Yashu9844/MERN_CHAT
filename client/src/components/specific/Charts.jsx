import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { ArcElement, CategoryScale, Chart as Chartjs, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import { getLast7Days } from '../../lib/features';


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

const labels = getLast7Days();
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

const LineCharts = ({value=[]}) => {
    const data = {
        labels,
        datasets: [
            {
                label: 'Sample Dataset',
                data: value, // Ensure data has the same length as labels
                fill: true, //
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)'
            },
        ]
    };

    return (
        <Line data={data} options={lineChartOptions} />
    );
};

const dognutChartOptions ={
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false
        }
    },

   
   
}


const DoughnutCharts = ({value=[],labels=[]}) => {
    const data = {
        labels,
        datasets: [
            {
                label: 'Total Chats vs group Chats',
                data: value, // Ensure data has the same length as labels
                fill: true, //
                borderColor: 'gray',
                backgroundColor: ['rgba(75,192,192,0.2)',"orange"],
                offset:40
            },
        ]
    };
    return <Doughnut data={data} options={dognutChartOptions} style={{
        zIndex:10
    }}  />
};

export { LineCharts, DoughnutCharts };
