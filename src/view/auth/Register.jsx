import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { signUp } from "../../store/auth/authThunk";

const Register = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [btnLoader, setBtnLoader] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    setBtnLoader(true);
   
    dispatch(
      signUp({userData,onSuccess:()=>{
        setBtnLoader(false);
        history.push("/auth/login");
      }})
    );
  };

  return (
    <Col lg="6" md="8">
      <Card className="shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Sign up</small>
          </div>
          <Form role="form" onSubmit={handleSubmit}>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupText>
                <i className="fa fa-graduation-cap" />
                </InputGroupText>
                <Input
                  required
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={userData.name}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupText>
                <i className="fa fa-envelope" />
                </InputGroupText>
                <Input
                  required
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  name="email"
                  onChange={handleChange}
                  value={userData.email}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupText>
                <i className="fa fa-lock" />
                </InputGroupText>
                <Input
                  required
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  onChange={handleChange}
                  value={userData.password}
                />
              </InputGroup>
            </FormGroup>
            <Row className="my-4">
              <Col xs="12"></Col>
            </Row>
            <div className="text-center">
              <Button
                className="mt-4"
                color="primary"
                type="submit"
                disabled={btnLoader}
              >
                {btnLoader ? <Spinner size="sm" /> : " Create account"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
