import React from 'react';
import { Container, } from 'reactstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const About = () => {
  return (
    <Container className="mt-4">
      <p>Click here to go to the home page</p>
      <Link to="/" className="btn btn-primary">
          Home
      </Link>
    </Container>
  );
};

export default About;
