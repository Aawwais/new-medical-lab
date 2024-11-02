import React from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import Header from "../components/Header/Header";

const index = () => {
  return (
    <>
      <Header />
      <Container className=" home-page" fluid>
        <Row>
          <Col lg="6" xl="3" className="mb-2">
            <Card className="card-stats h-100 ">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h6" className="text-uppercase text-muted mb-0">
                    TO BE DELIVERED TODAY
                    </CardTitle>
                    <span className="h4 font-weight-bold mb-0">35</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                      <i className="fas fa-flask" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3" className="mb-2">
            <Card className="card-stats  h-100">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h6" className="text-uppercase text-muted mb-0">
                    DATE PASSES BUT NOT DELIVERED
                    </CardTitle>
                    <span className="h4 font-weight-bold mb-0">5</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      <i className="fas fa-clock" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3" className="mb-2">
            <Card className="card-stats h-100 ">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h6" className="text-uppercase text-muted mb-0">
                    TOTAL TESTS
                    </CardTitle>
                    <span className="h4 font-weight-bold mb-0">4 Active</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                      <i className="fas fa-tools" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3" className="mb-2">
            <Card className="card-stats h-100 ">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle tag="h6" className="text-uppercase text-muted mb-0">
                    TOTAL DELIVERABLES
                    </CardTitle>
                    <span className="h4 font-weight-bold mb-0">15</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-secondary text-white rounded-circle shadow">
                      <i className="fas fa-file-alt" />
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
