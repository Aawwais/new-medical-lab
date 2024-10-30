import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Col,
  Spinner,
} from "reactstrap";
import { signIn } from "../../store/auth/authThunk";

const Login = () => {
  let dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
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
    setBtnLoader(true);
    dispatch(
      signIn({data:userData,onSuccess:()=>{
        setBtnLoader(false);
      }}
      )
    );
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Sign in</small>
          </div>
          <Form role="form" onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupText>
                  <i className="fa fa-envelope" />
                </InputGroupText>
                <Input
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  required
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupText>
                <i className="fa fa-lock" />
                </InputGroupText>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  required
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>

            <div className="text-center">
              <Button
                className="my-4"
                color="primary"
                type="submit"
                disabled={btnLoader}
              >
                {btnLoader ? <Spinner size="sm" /> : "Sign in"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      {/* Uncomment if needed
      <Row className="mt-3">
        <Col xs="6">
          <a
            className="text-light"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <small>Forgot password?</small>
          </a>
        </Col>
        <Col className="text-right" xs="6">
          <a
            className="text-light"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <small>Create new account</small>
          </a>
        </Col>
      </Row> */}
    </Col>
  );
};

export default Login;
