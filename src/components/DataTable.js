import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';

const OriginalRow = ({ data, index, selectedRows, onCheckboxChange }) => {
  const row = data[index];

  const handleCheckboxChange = () => {
    onCheckboxChange(row.id);
  };

  return (
    <tr key={row.id}>
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={handleCheckboxChange}
        />
      </td>
      {Object.keys(row).map(column => (
        <td key={column}>{row[column]}</td>
      ))}
    </tr>
  );
};

const VirtualizedRow = ({ data, index, style, selectedRows, onCheckboxChange }) => {
  const row = data[index];

  const handleCheckboxChange = () => {
    onCheckboxChange(row.id);
  };

  return (
    <div style={style}>
      <input
        type="checkbox"
        checked={selectedRows.includes(row.id)}
        onChange={handleCheckboxChange}
      />
      {Object.keys(row).map(column => (
        <span key={column}>{row[column]}</span>
      ))}
    </div>
  );
};

const DataTable = ({ data, onCheckboxChange, useVirtualization }) => {
  const [selectedRows, setSelectedRows] = useState(() => data.slice(0, 5).map(row => row.id));

  const handleCheckboxChange = (id) => {
    const updatedRows = selectedRows.includes(id)
      ? selectedRows.filter(rowId => rowId !== id)
      : [...selectedRows, id];
    setSelectedRows(updatedRows);
  };

  useEffect(() => {
    onCheckboxChange(selectedRows);
  }, [selectedRows, onCheckboxChange]);

  const columns = Object.keys(data[0]);

  if (useVirtualization) {
    return (
      <List
        height={400}
        itemCount={data.length}
        itemSize={50}
        width={600}
        itemData={{ data, selectedRows, onCheckboxChange }}
      >
        {VirtualizedRow}
      </List>
    );
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Checkbox</th>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <OriginalRow
              key={row.id}
              data={data}
              index={data.indexOf(row)}
              selectedRows={selectedRows}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </tbody>
      </table>
    );
  }
};

export default DataTable;
