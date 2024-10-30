import React from "react";
import { Button, Container } from "reactstrap";
import Header from "../components/Header/Header";
import SpreadsheetComponent from "../components/SpreadsheetComponent";

const index = () => {
  const handleSubmit=(data)=>{
console.log(data)
  }
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        Tests
        <SpreadsheetComponent onSubmit={handleSubmit}/>
        
      </Container>
    </>
  );
};

export default index;