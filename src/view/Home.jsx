import React from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import Header from "../components/Header/Header";

const index = () => {
  
  return (
    <>
      <Header />
      <Container className="mt--7 home-page" fluid>
        <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h6"
                          className="text-uppercase text-muted mb-0"
                        >
                          contract signed date
                        </CardTitle>
                        <span className="h4 font-weight-bold mb-0">
                          20
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h6"
                          className="text-uppercase text-muted mb-0"
                        >
                          Attached Students
                        </CardTitle>
                        <span className="h4 font-weight-bold mb-0">
                          12
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              </Row>
      </Container>
    </>
  );
};

export default index;