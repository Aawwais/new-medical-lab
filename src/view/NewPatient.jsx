import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  FormGroup,
} from "reactstrap";
import Header from "../components/Header/Header";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/patient/patientThunk";
import { fetchTests } from "../store/tests/testThunk";

const NewPatient = () => {
  let dispatch=useDispatch()
  const [step, setStep] = useState(1);
  const [patientData,setPatientData]=useState({
    name:"",
    age:"",
    gender:"",
    phoneNumber:"",
    email:"",
    address:"",
    referredBy:"",
    assignedTestsId:[],
    discountType:"",
    discount:""
  })
  const [selectTests,setSelectTests]=useState({
    category:"",
    testName:"",
    testId:""
  })
  const {tests}=useSelector((state)=>state.tests)
  const {category}=useSelector((state)=>state.patient)
  
  useEffect(()=>{
    if(step==2){
      dispatch(fetchCategory())
    }
  },[step])
    useEffect(()=>{
      if((selectTests.category ||selectTests.testName)&& !selectTests.testId ){
          selectTests.category=selectTests.category.toUpperCase()
          dispatch(fetchTests({filter:selectTests,lastVisible:null,onSuccess :() => {

          }}))
      }
      if(selectTests.testId){
        const handler = setTimeout(() => {
        dispatch(fetchTests({filter:{testId:selectTests.testId,category:"",testName:""},lastVisible:null,onSuccess :() => {
          setSelectTests((prev) => ({
            ...prev,
            testName: tests.length>0?tests[0]?.testName:"",
            category: tests.length>0?tests[0]?.testCategory:""
          }))
        }}))
      }, 3000);
      return () => clearTimeout(handler);
      }
    },[selectTests])
  const handleChangeTests=(e)=>{
let {value,name}=e.target 
setSelectTests((prev)=>({
  ...prev,
  [name]:value
}))
  }
  const handleChange=(e)=>{
let {value,name}=e.target
setPatientData((prev)=>({
  ...prev,
  [name]:value
}))
  }
   
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h5>Patient General Information</h5>
            <Row>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="patientName">Full Name</Label>
                  <Input id="patientName" placeholder="Enter Patient Name" name="name" value={patientData.name} onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="Age">Age</Label>
                  <Input id="Age" placeholder="Enter Patient Age" name="age" value={patientData.age} onChange={handleChange}/>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="phone-number">Contact Number</Label>
                  <Input
                    id="phone-number"
                    placeholder="Enter Patient Phone Number"
                    name="phoneNumber" value={patientData.phoneNumber} onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="Gender">Gender</Label>
                  <Input id="Gender" type="select" name="gender" value={patientData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>

                  </Input>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input id="Email" placeholder="Enter Email" name="email" value={patientData.email} onChange={handleChange}/>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="Address" >Address</Label>
                  <Input id="Address" placeholder="Enter address" name="address" value={patientData.address} onChange={handleChange}/>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="referred-by">Referred By</Label>
                  <Input id="referred-by" placeholder="Enter Reference" name="referredBy" value={patientData.referredBy} onChange={handleChange}/>
                </FormGroup>
              </Col>
            </Row>
          </>
        );
      case 2:
        return (
          <>
            <h5>Select Test's </h5>
            <Row>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="testCategory">Select Category</Label>
                  <Input type="select" id="testCategory" name="category" value={selectTests.category} onChange={(e)=>{handleChangeTests(e);setSelectTests((prev) => ({
                        ...prev,
                        testName: "",
                        testId: ""
                      }));}}>
                    <option value="">Select a Category</option>
                    {category.map((items,index)=>{
                      return(
                        <option value={items.name} key={index}>{items.name}</option>
                      )
                    })}
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="test-name">Test Name</Label>
                  <Input type="select" id="test-name" placeholder="Enter Test Name"  name="testName" value={selectTests.testName} 
                    onChange={(e) => {
                      const selectedTest = tests.find((test) => test.testName === e.target.value);
                      setSelectTests((prev) => ({
                        ...prev,
                        testName: e.target.value,
                        testId: selectedTest ? selectedTest.testId : ""
                      }));
                    }}>
                  <option value="">Select a Category</option>
                  {tests.map((items,index)=>{
                    return(
                      <option value={items.testName} key={index}>{items.testName}</option>
                    )
                  })}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="test-id"  >Test Id</Label>
                  <Input id="test-id" name="testId" placeholder="Enter Test Id" value={selectTests.testId} onChange={handleChangeTests}/>
                </FormGroup>
              </Col>
            </Row>
          </>
        );
      case 3:
        return (
          <>
            <h5>Summary and Discount</h5>
            <Row>
              <Col xs="12">
                <Card className="p-4 border-none shadow">
                  <Container>
                    <h2 className="text-center my-4">Patient Detail</h2>
                    <Row className="mt-4">
                      <Col lg="6" className="d-flex mb-4"><h5 className="mx-2">Name : </h5>{" "} Awais Ali</Col>
                      <Col lg="6" className="d-flex mb-4"><h5 className="mx-2">Age : </h5>{" "}  27</Col>
                      <Col lg="6" className="d-flex mb-4"><h5 className="mx-2">Phone Number : </h5>{" "}  03059508153</Col>
                      <Col lg="6" className="d-flex mb-4"><h5 className="mx-2">Gender : </h5>{" "}  Male</Col>
                      <Col lg="6" className="d-flex mb-4"><h5 className="mx-2">Assigned Tests : </h5> {" "} Blood</Col>
                      <Col lg="6" className="d-flex mb-4"><h5 className="mx-2">Patient ID : </h5> {" "} as23</Col>
                      <Col lg="6" className="d-flex mb-4"><h5 className="mx-2">Discount  : </h5> {" "} 23</Col>
                      <Col lg="6" className="d-flex mb-4"><h5 className="mx-2">Total Amount : </h5> {" "} 23</Col>
                    </Row>
                  </Container>
                </Card>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="discount-type">Discount Type</Label>
                  <Input type="select" id="discount-type" name="discountType" value={patientData.discountType} onChange={handleChange}>
                    <option value="">No Discount</option>
                    <option value="percentage">Percentage</option>
                    <option value="flat-discount">Flat discount</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="discount-amount" name="discount" value={patientData.discount} onChange={handleChange}>Add Discount</Label>
                  <Input type="number" id="discount-amount"/>
                </FormGroup>
              </Col>
            </Row>
          </>
        );
      default:
        return null;
    }
  };

  const stepLabels = [
    { label: "General Information", stepNumber: 1 },
    { label: "Test & Category", stepNumber: 2 },
    { label: "Payment", stepNumber: 3 },
  ];

  const renderStepLabels = () => {
    return (
      <div className="stepper mb-4">
        <ul className="stepper-list">
          {stepLabels.map(({ label, stepNumber }, index) => (
            <li
              key={index}
              className={`stepper-item ${step === stepNumber ? "active" : ""} ${
                step > stepNumber ? "completed" : ""
              }`}
            >
              <div className="stepper-circle">{}</div>
              <div className="stepper-label">{label}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Card className="p-4" style={{ minHeight: "500px" }}>
          {renderStepLabels()}

          {stepContent()}

          <div className="d-flex justify-content-between mt-4">
            <Button color="secondary" disabled={step === 1} onClick={prevStep}>
              Previous
            </Button>
            <Button
              color="primary"
              onClick={step === 3 ?()=>{toast.success("jspdf and add data here")}   : nextStep}
            >
              {step === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default NewPatient;
