// src/components/Chart.tsx
import { useEffect, useState } from 'react';
import getItemQuantity from '../service/getItemQuantity';

declare global {
    interface Window {
        google: any;
    }
}

const Chart = () => {
    const [chartData, setChartData] = useState<(string | number)[][]>([['Producto', 'Cantidad']]);

    useEffect(() => {
        // 1. Obtener datos desde el backend
        const loadData = async () => {
            try {
                const data = await getItemQuantity();
                const formatted: (string | number)[][] = [['Producto', 'Cantidad']];
                Object.entries(data).forEach(([product, quantity]) => {
                    formatted.push([product, quantity as number]);
                });
                setChartData(formatted);
            } catch (error) {
                console.error('Error al obtener datos del backend:', error);
            }
        };

        // 2. Cargar Google Charts
        const loadGoogleCharts = () => {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.async = true;
            script.onload = () => {
                window.google?.charts.load('current', { packages: ['corechart'] });
                window.google?.charts.setOnLoadCallback(drawChart);
            };
            document.body.appendChild(script);
        };

        // 3. Dibujar el gráfico
        const drawChart = () => {
            if (chartData.length <= 1) return; // Evitar errores si no hay datos

            const dataTable = window.google.visualization.arrayToDataTable(chartData);

            const options = {
                title: 'Cantidad de productos surtidos',
                legend: { position: 'none' },
                hAxis: { title: 'Producto' },
                vAxis: { title: 'Cantidad' },
                colors: ['#00aaff'],
            };

            const chart = new window.google.visualization.ColumnChart(
                document.getElementById('product_chart') as HTMLElement
            );
            chart.draw(dataTable, options);
        };

        loadData();
        loadGoogleCharts();
    }, [chartData]);

    return <div id="product_chart" style={{ width: '100%', height: '500px' }} />;
};

export default Chart;
