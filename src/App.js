import React, { useState } from 'react';
import DataTable from './components/DataTable';
import BarChart from './components/BarChart';
import data from './data';

const App = () => {
  const [selectedRows, setSelectedRows] = useState(() => data.slice(0, 5));

  const handleCheckboxChange = (selectedIds) => {
    const updatedData = data.filter(row => selectedIds.includes(row.id));
    setSelectedRows(updatedData);
  };
 
  return (
    <div>
      <h1>Data Table and Bar Chart Visualization</h1>
      <DataTable data={data} onCheckboxChange={handleCheckboxChange} />
      <BarChart data={selectedRows} />
    </div>
  );
};

export default App;