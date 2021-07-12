import React from 'react';
import Loader from './Loader';

let scriptPromise;
let isScriptLoaded = false;

const GoogleCharts = {
    loadScript: () => {
        if (!scriptPromise) {
            scriptPromise = new Promise(resolve => {
                const body = document.body;
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.onload = () => {
                    isScriptLoaded = true;
                    GoogleCharts.api = window.google;
                    GoogleCharts.api.charts.load('current', { packages: ['corechart'] });
                    GoogleCharts.api.charts.setOnLoadCallback(() => resolve());
                };
                script.src = 'https://www.gstatic.com/charts/loader.js';
                body.appendChild(script);
            });
        };

        return scriptPromise;
    },

    init: (callback, type) => {
        if (isScriptLoaded) {
            if (typeof callback !== 'function') {
                throw ('callback must be a function');
            } else {
                callback();
            }
        }

        GoogleCharts.loadScript().then(() => {
            if (type) {
                let config = { packages: [type] }

                config = type instanceof Object ?
                    type : Array.isArray(type) ?
                        { packages: type } : config;

                GoogleCharts.api.charts.load('current', config);
                GoogleCharts.api.charts.setOnLoadCallback(callback);
            } else {
                if (typeof callback !== 'function') {
                    throw ('callback must be a function');
                } else {
                    callback();
                }
            }
        })
    }
};

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