import React from 'react';
import Loader from './Loader';
import GoogleCharts from './GoogleChartsLoader';

const Chart = ({ data, title, options }) => {
    const chartRef = React.useRef(null);
    const defaultOptions = {
        title: title,
        is3D: false
    };
    const draw = () => {
        GoogleCharts.init(function () {
            const chartData = GoogleCharts.api.visualization.arrayToDataTable(data);
            const pie_chart = new GoogleCharts.api.visualization.PieChart(chartRef.current);
            pie_chart.draw(chartData, options ? options : defaultOptions);
        });
    }

    React.useEffect(() => {
        if (!!data) {
            draw();

            window.addEventListener('resize', function () {
                this.setTimeout(draw, 500);
            });
        }

    }, [data]);

    return (
        <div id="google-chart" ref={chartRef} className="text-center position-relative">
            <Loader />
        </div>
    )
}

export default Chart;