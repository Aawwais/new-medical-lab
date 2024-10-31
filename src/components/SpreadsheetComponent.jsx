import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import Spreadsheet from "react-spreadsheet";
import 'bootstrap/dist/css/bootstrap.min.css';

const SpreadsheetComponent = ({ data,setData}) => {


  const addRow = () => {
    setData((prevData) => [
      ...prevData,
      Array(data[0].length).fill({ value: "" }),
    ]);
  };

  const addColumn = () => {
    setData((prevData) =>
      prevData.map((row) => [...row, { value: "" }])
    );
  };

  const removeRow = () => {
    if (data.length > 0) {
      setData((prevData) => prevData.slice(0, -1));
    }
  };

  const removeColumn = () => {
    if (data[0]?.length > 0) {
      setData((prevData) =>
        prevData.map((row) => row.slice(0, -1))
      );
    }
  };

  // Handle changes in spreadsheet
  const handleCellChange = (newData) => {
    setData(newData);
  };


  return (
   
      <Row className="my-3">
      <Row className="mb-3">
        <Col className="overflow-auto">
          <Spreadsheet
            data={data}
            onChange={handleCellChange}
            columnLabels={data[0].map((_, index) => `Column ${index + 1}`)}
            rowLabels={data.map((_, index) => `Item ${index + 1}`)}
          />
        </Col>
      </Row>
        <Col>
          <Button className="mx-2" color="primary" size="sm" onClick={addRow}>Add Row</Button>
          <Button className="mx-2"  color="success" size="sm"  onClick={addColumn}>Add Column</Button>
          <Button className="mx-2"  color="danger" size="sm"  onClick={removeRow}>Remove Row</Button>
          <Button className="mx-2"  color="warning" size="sm"  onClick={removeColumn}>Remove Column</Button>
          {/* <Button color="info" onClick={handleSubmit}>Save Data</Button> Submit Button */}
        </Col>
      </Row>
      
  
  );
};

export default SpreadsheetComponent;
