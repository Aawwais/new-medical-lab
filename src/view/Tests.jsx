



import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Button,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Col,
  Row,
  Form,
  Spinner,
  ModalHeader,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import Header from "../components/Header/Header";
import { addTest, deleteTest, editTest, fetchTests } from "../store/tests/testThunk";
import SpreadsheetComponent from "../components/SpreadsheetComponent";

const Tests = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [testUid, setTestUid] = useState("");
  const [data, setData] = useState([
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
  ]);
  const [loader, setLoader] = useState({
    btn: false,
    data: false,
    filterApply: false,
    filterClear: false,
    loadMore:false
  });
  const [filters, setFilters] = useState({
    category: "",
    testId: "",
  });
  const [testData, setTestData] = useState({
    testName: "",
    testCategory: "",
    testPrice: null,
  });

  const { tests, hasMore,lastVisible } = useSelector((state) => state.tests);

  const handleChangeFilters = (e) => {
    const { value, name } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { value, name,type } = e.target;
    setTestData((prev) => ({
      ...prev,
      [name]: type=="number"? Number(value): value,
    }));
  };

  const toggleModal = () => {
    setModal(!modal);
    if (modal) resetForm();
  };

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const resetForm = () => {
    setTestData({
      testName: "",
      testCategory: "",
      testPrice: 0,
    });
    setTestUid("");
  };

  useEffect(() => {
    setLoader((prev) => ({ ...prev, data: true }));
    dispatch(
      fetchTests({
        filter: { category: "", testId: "" }, 
        isLoadMore: false, 
        onSuccess: () => {
          setLoader((prev) => ({ ...prev, data: false })); 
        },
      })
    );
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader((prev) => ({ ...prev, btn: true }));
    let {testCategory,...testNewData}=testData
    let newData = {
      ...testNewData,
      testCategory: testCategory.toUpperCase(),
      excelData: data.map((row, rowIndex) => {
        const rowObject = {  }; 
        row.forEach((cell, colIndex) => {
          rowObject[`Column_${colIndex + 1}`] = cell.value; 
        });
        return rowObject;
      }),
    };
    
    if (testUid) {  
     dispatch(
        editTest({id:testUid, test:newData, onSuccess:() => {
          setLoader((prev) => ({ ...prev, btn: false }));
          toggleModal();
          setTestUid("");
        }})
      );
    } else {
      dispatch(
        addTest({data:newData, onSuccess:() => {
          setLoader((prev) => ({ ...prev, btn: false }));
          toggleModal();
        }})
      );
    }
  };

  const handleDelete = () => {
    setLoader((prev) => ({ ...prev, btn: true }));
   
     dispatch(
      deleteTest({id:testUid,onSuccess:() => {
        setLoader((prev) => ({ ...prev, btn: false }));
        toggleDeleteModal();
        setTestUid("");
      }})
    );
  };

  const openEditModal = (item) => {
    setTestData({
      ...item,
      testName: item.testName,
      testCategory: item.testCategory,
      testPrice: item.testPrice,
    });
    setData(
      item.excelData.map((row) =>
        Object.keys(row).map((colKey) => ({ value: row[colKey] }))
      )
    );
    setTestUid(item.uid);
    toggleModal();
  };

  const loadMore = () => {
    setLoader((prev) => ({ ...prev, loadMore: true }));
    dispatch(
      fetchTests({
        filter: { category: "", testId: "" }, 
        lastVisible, 
        onSuccess: () => {
          setLoader((prev) => ({ ...prev, loadMore: false })); 
        },
      })
    );
  };
  const [isFilteredData,setIsFilteredData]=useState(false)

  const applyFilter = () => {
    if (filters.category || filters.testId) {
      setLoader((prev) => ({
        ...prev,
        filterApply: true,
      }));
      let {category,...data}=filters
      let newData={
        ...data,
        category:category.toUpperCase(),
      }
      dispatch(
        fetchTests({filter:newData, lastVisible:null , onSuccess :() => {
          setIsFilteredData(true)
          setLoader((prev) => ({
            ...prev,
            filterApply: false,
          }));
        }})
      );
    } else {
      toast.warning("Please Add Any Filter");
    }
  };
  const clearFilter = () => {
    setLoader((prev) => ({
      ...prev,
      filterClear: true,
    }));
    dispatch(
      fetchTests({filter:null, lastVisible:null,onSuccess: () => {
        setIsFilteredData(false)
        setFilters((prev) => ({
          ...prev,
          category: "",
          testId: "",
        }));
        setLoader((prev) => ({
          ...prev,
          filterClear: false,
        }));
      }})
    );
  };

  const [showDataModal,setShowDataModal]=useState(false)

  const toggleShowData=()=>{
    setShowDataModal(!showDataModal)
  }

  const handleShowDetails=(item)=>{
    setTestData({
      ...item,
      testName: item.testName,
      testCategory: item.testCategory,
      testPrice: item.testPrice,
    });
    setData(
      item.excelData.map((row) =>
        Object.keys(row).map((colKey) => ({ value: row[colKey] }))
      )
    );
    toggleShowData()
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
  <Card className="shadow">
    <CardBody>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <CardTitle tag="h5" className="m-0 ">
          Test Details
        </CardTitle>
        <Button
          color="primary"
          className="px-4"
          onClick={() => {
            toggleModal();
            setTestUid("");
            setData([
              [{ value: "" }, { value: "" }, { value: "" }],
              [{ value: "" }, { value: "" }, { value: "" }],
            ]);
          }}
        >
          Add New Test
        </Button>
      </div>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <Input
          placeholder="Add Test ID"
          name="testId"
          value={filters.testId}
          onChange={handleChangeFilters}
          className="input-field me-2"
        />
        <Input
          placeholder="Add Test Category"
          name="category"
          value={filters.category}
          onChange={handleChangeFilters}
          className="input-field me-2"
        />
        <Button
          className="text-nowrap"
          color="primary"
          onClick={applyFilter}
          disabled={!filters.category && !filters.testId}
        >
          {loader.filterApply ? <Spinner size="sm" /> : "Apply Filter"}
        </Button>
        <Button
          className="text-nowrap mx-2"
          color="danger"
          onClick={clearFilter}
          disabled={!isFilteredData}
        >
          {loader.filterClear ? <Spinner size="sm" /> : "Clear Filter"}
        </Button>
      </div>

      <Card className="mt-2">
        {loader.data ? (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <Table className="table-custom " responsive>
          <thead>
            <tr>
              <th scope="col">Test ID</th>
              <th scope="col">Test Name</th>
              <th scope="col">Test Category</th>
              <th scope="col">Price</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tests.length > 0 ? (
              tests.map((item, index) => (
                <tr key={index}>
                  <td>{item.testId}</td>
                  <td>{item.testName}</td>
                  <td>{item.testCategory}</td>
                  <td>{item.testPrice}</td>
                  <td>{moment.unix(item.created_at.seconds).format("MM/DD/YYYY")}</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => {
                        setTestUid(item.uid);
                        toggleDeleteModal();
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      className="mx-2"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="info"
                      size="sm"
                      className="mx-2"
                      onClick={() => handleShowDetails(item)}
                    >
                    <i className="fa fa-eye"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No tests available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        


        )}

        <div className="text-center mt-3">
          <Button
            color="primary"
            onClick={loadMore}
            disabled={!hasMore || loader.loadMore}
            className="px-4"
          >
            {loader.loadMore ? <Spinner size="sm" /> : "Load More"}
          </Button>
        </div>
      </Card>
    </CardBody>
  </Card>
</Container>


      <Modal isOpen={modal} toggle={toggleModal} centered size="xl">
      <ModalHeader className="mx-auto modal-header">
        <h4 className="m-0 modal-title">{testUid ?"Edit":"Add"} Test</h4>
        <span onClick={toggleModal} className="close-icon">&times;</span>
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody className="pt-4 px-4">
      
          <Row>
            <Col md="4">
              <FormGroup>
                <Label for="test-name" className="fw-bold">Test Name</Label>
                <Input
                  required
                  type="text"
                  id="test-name"
                  name="testName"
                  placeholder="Enter test name"
                  value={testData.testName}
                  onChange={handleChange}
                  className="input-field"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="test-category" className="fw-bold">Test Category</Label>
                <Input
                  required
                  type="text"
                  id="test-category"
                  name="testCategory"
                  placeholder="Enter test category"
                  value={testData.testCategory}
                  onChange={handleChange}
                  className="input-field"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="price" className="fw-bold">Test Price</Label>
                <Input
                  required
                  type="number"
                  id="price"
                  name="testPrice"
                  placeholder="Enter test price"
                  value={testData.testPrice}
                  onChange={handleChange}
                  className="input-field"
                />
              </FormGroup>
            </Col>
            <Col xs="12">
            <div className="spreadsheet-section mt-2">
                <h5>Spreadsheet Data</h5>
              <SpreadsheetComponent data={data} setData={setData} showBtn={true} />

              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleModal}>
            Close
          </Button>
          <Button color="success" type="submit" disabled={loader.btn}>
            {loader.btn ? (
              <Spinner size="sm" />
            ) : testUid ? (
              "Update Test"
            ) : (
              "Save Test"
            )}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>

      <Modal isOpen={deleteModal} centered toggle={toggleDeleteModal}>
        <ModalBody>
          <div className="text-center">
            <span className="mt-5" style={{ fontSize: 30 }}>
              Are you sure?
            </span>
            <br />
            <br />
            <span className="mt-5" style={{ fontSize: 16 }}>
              You want to delete this test.
            </span>
            <br />
            <br />
            <Button color="secondary" onClick={toggleDeleteModal}>
              Cancel
            </Button>{" "}
            <Button color="danger" onClick={handleDelete} disabled={loader.btn}>
              {loader.btn ? <Spinner size="sm" /> : "Delete"}
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={showDataModal} centered size="xl" toggle={toggleShowData}>
      <ModalHeader className="mx-auto modal-header">
        <h4 className="m-0 modal-title">Test Details</h4>
        <span onClick={toggleShowData} className="close-icon">&times;</span>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Container fluid>
          <Row className="gy-3">
            <Col md="4">
              <div className="data-card">
                <small className="label">Test Name</small>
                <p className="value">{testData.testName}</p>
              </div>
            </Col>
            <Col md="4">
              <div className="data-card">
                <small className="label">Test Category</small>
                <p className="value">{testData.testCategory}</p>
              </div>
            </Col>
            <Col md="4">
              <div className="data-card">
                <small className="label">Test Price</small>
                <p className="value">{testData.testPrice}</p>
              </div>
            </Col>

            <Col xs="12">
              <div className="spreadsheet-section">
                <h5>Spreadsheet Data</h5>
                <SpreadsheetComponent data={data} setData={setData} showBtn={false} />
              </div>
            </Col>
          </Row>
        </Container>

        <div className="text-end mt-4">
          <Button onClick={toggleShowData} className="action-button">Confirm</Button>
        </div>
      </ModalBody>
    </Modal>
    </>
  );
};

export default Tests;

