import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import Spreadsheet from "react-spreadsheet";
import 'bootstrap/dist/css/bootstrap.min.css';

const SpreadsheetComponent = ({ onSubmit }) => {
  const [data, setData] = useState([
    [{ value: "Item 1" }, { value: "Detail 1" }, { value: "Value 1" }],
    [{ value: "Item 2" }, { value: "Detail 2" }, { value: "Value 2" }],
  ]);

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

  // Handle submit action
  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Button color="primary" onClick={addRow}>Add Row</Button>
          <Button color="success" onClick={addColumn}>Add Column</Button>
          <Button color="danger" onClick={removeRow}>Remove Last Row</Button>
          <Button color="warning" onClick={removeColumn}>Remove Last Column</Button>
          <Button color="info" onClick={handleSubmit}>Save Data</Button> {/* Submit Button */}
        </Col>
      </Row>
      <Row>
        <Col>
          <Spreadsheet
            data={data}
            onChange={handleCellChange}
            columnLabels={data[0].map((_, index) => `Column ${index + 1}`)}
            rowLabels={data.map((_, index) => `Item ${index + 1}`)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SpreadsheetComponent;
