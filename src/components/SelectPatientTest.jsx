import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { deleteFetchTests, fetchTests } from "../store/patient/patientThunk";

const SelectPatientTest = ({setPatientData}) => {
    const dispatch = useDispatch();
    const [selectTests, setSelectTests] = useState([{ category: "", testName: "", testId: "" }]);
    const { category, selectedTests } = useSelector((state) => state.patient);
    const handleChangeTests = (e, index) => {
        const { value, name } = e.target;
        setSelectTests((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                          ...item,
                          testId:
                              name === "testName" 
                                  ? selectedTests[index]?.find((test) => test.testName === value)?.testId || ""
                                  : name === "category"
                                  ? ""
                                  : name === "testId" 
                                  ? value
                                  : item.testId,
                          category:  name === "category" ?value:item.category,
                          testName: name=="testName"? value:item.testName
                      }
                    : item
            )
        );
        if(name !=="category"){
            setPatientData((prev) => {
                const updatedAssignedTestsId = [...prev.assignedTestsId];
                updatedAssignedTestsId[index] = name === "testId" 
                ? value:selectedTests[index]?.find((test) => test.testName === value)?.testId;
                return {
                    ...prev,
                    assignedTestsId: updatedAssignedTestsId,
                };
            });
        }
        if(name==="testId" || name==="category"){
            if(value==""){
                dispatch(deleteFetchTests({index})) 
            }else{
                dispatch(
                    fetchTests({
                        filter:{[name]:value},
                        index,
                        onSuccess: (data) => {
                            if(name==="testId" && data.length>0){
                                setSelectTests((prev) =>
                                prev.map((item, i) =>
                                    i === index
                                        ? {
                                              ...item,
                                              category: data[0].
                                              testCategory,
                                              testName: data[0].testName
                                          }
                                        : item
                                )
                            );
                            }
                        },
                    })
                );
            }
        }
    };

    const addTest = (e) => {
        e.preventDefault()
        setSelectTests([...selectTests, { category: "", testName: "", testId: "" }]);
    };

    const deleteTest = (index) => {
        setSelectTests((prev) => prev.filter((_, i) => i !== index));
        setPatientData((prev) => {
            const updatedAssignedTestsId = prev.assignedTestsId.filter((_, i) => i !== index);
            return {
                ...prev,
                assignedTestsId: updatedAssignedTestsId,
            };
        });
    };

    return (
        <div>
            <h5>Select Test's</h5>
            {selectTests.map((item, index) => (
                <Form onSubmit={addTest} key={index}>
                <Row key={index}>
                    <Col lg="3" className="mt-4">
                        <FormGroup>
                            <Label>Select Category</Label>
                            <Input
                            required
                                type="select"
                                name="category"
                                value={item.category}
                                onChange={(e) => handleChangeTests(e, index)}
                            >
                                <option value="">Select a Category</option>
                                {category.map((cat, i) => (
                                    <option key={i} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col lg="3" className="mt-4">
                        <FormGroup>
                            <Label>Test Name</Label>
                            <Input
                            required
                                type="select"
                                name="testName"
                                value={item.testName}
                                onChange={(e) => handleChangeTests(e, index)}
                            >
                                <option value="">Select Test Name</option>
                                {selectedTests[index]?.map((test, i) => (
                                    <option key={i} value={test.testName}>
                                        {test.testName}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col lg="3" className="mt-4">
                        <FormGroup>
                            <Label>Test Id</Label>
                            <Input
                            disabled={item.category}
                            required
                                type="text"
                                name="testId"
                                placeholder="Add Test Id"
                                value={item.testId}
                                onChange={(e) => handleChangeTests(e, index)}
                            />
                        </FormGroup>
                    </Col>

                    <Col lg="3" className="mt-4">
                        <Button color="primary" type="submit">+</Button>
                        {index>0&&
                        <Button color="danger" onClick={() => {deleteTest(index);dispatch(deleteFetchTests({index}))}}>-</Button>
                        }
                    </Col>
                </Row>
                </Form>
            ))}
        </div>
    );
};

export default SelectPatientTest;
