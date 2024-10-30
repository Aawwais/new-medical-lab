import React from "react";
import { Container } from "reactstrap";
import Header from "../components/Header/Header";

const index = () => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        Tests
      </Container>
    </>
  );
};

export default index;