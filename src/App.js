import './App.css';
import React from 'react';
import Selection from './components/Selection';
import SalesTable from './components/SalesTable';
import Chart from './components/Chart';
import { fetchPropertySales, fetchPropertyTypes } from './api';

function App() {
  const [selectedAgent, setSelectedAgent] = React.useState(null);
  const [sales, setSales] = React.useState([]);
  const [chartData, setChartData] = React.useState(null);

  React.useEffect(() => {
    try {
      fetchPropertySales()
        .then(data => {
          setSales(Object.entries(data));
          setSelectedAgent(Object.keys(data)[0]);
        })
    } catch (e) {
      console.log('Failed to load sales data', e);
    }

  }, []);

  React.useEffect(() => {
    try {
      if (!selectedAgent) return;

      fetchPropertyTypes(selectedAgent)
        .then(data => {
          const newData = Object.entries(data)
          setChartData([
            ['Property Type', 'Property Type Percentage'], ...newData
          ]);
        })
    } catch (e) {
      console.log(`failed to load property types for ${selectedAgent}`, e);
    }
  }, [selectedAgent])

  return (
    <div className="container pt-4">
      <h1 className="">Data Analysis for CommRE</h1>
      <Selection agent={selectedAgent} />
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          <SalesTable data={sales} selectedAgent={selectedAgent} onSelect={setSelectedAgent} />
        </div>
        <div className="col-12 col-md-6 col-lg-8">
          <Chart data={chartData} title='Agent Sales Chart' />
        </div>
      </div>
    </div>
  );
}

export default App;
