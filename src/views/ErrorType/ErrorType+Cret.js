import React, { useState, useEffect } from "react";
import axios from "axios";
import "assets/css/login.css";
import config from '../../config'
import LoaderComp from "../../Loader/LoaderComp";
import ReactPaginate from "react-paginate";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Container,
} from "reactstrap";
import { Modal } from "react-bootstrap";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import EditModal from '../ErrorType/edit_module'

function ErrorKind() {
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [client, setclient] = useState([]);
  const [category,setcategory]=useState([]);
  const [editId, setEditId] = useState("");
  const [show, setShow] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lgEditShow, setLgEditShow] = useState(false);
  const [modalValue, setModalValue] = useState("");

  //Modal visibility
  const Createcate = () => {
    setmodalVisibility(true);
  };
  
  //get
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}//errorType`, {
      params: {
        page: currentPage,
        limit: postsPerPage,
        ...query
      }
    })
      .then((res) => {
        const response = res.data.data.rows;
        console.log(response)
        setUsers(response);
        setTotal(res.data.data.count)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ErrorKindData = async () => {
    await axios
      .get(
        `${config.API_URL}//errorKind`
      )
      .then((res) => {
        const response = res.data.data.rows;
        setclient(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ErrorcategoryData = async () => {
    await axios
      .get(
        `${config.API_URL}//errorCategory`
      )
      .then((res) => {
        const response = res.data.data.rows;
        console.log(response);
        setcategory(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    fetchData();
    ErrorKindData();
    ErrorcategoryData();
  }, []);

  const handlePageClick = (event) => {
    const newOffset = ((event.selected + 1));
    setCurrentPage(newOffset);
    fetchData({ page: newOffset })
  };

  //create
  const [eroorType, setEroorType] = useState({
    ErrorTypeValue: "",
    ErrorCategoryId: "",
    ErrorKindId: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setEroorType({ ...eroorType, [e.target.name]: e.target.value });
  };
  const formData = {
    ErrorTypeValue: eroorType.ErrorTypeValue,
    ErrorCategoryId: eroorType.ErrorCategoryId,
    ErrorKindId: eroorType.ErrorKindId,
    
  };
  console.log(formData)

  const onSubmit = async (e) => {
    let headers = { 'content-type': 'application/json' }
      e.preventDefault();
      setTimeout(async () => {
        await axios
        .post(`${config.API_URL}//errorType`, formData,{headers})
        .then((response) => {
          if (response) {
            console.log("response :")
            console.log(response);
            setSuccess(true);
          }
          else{
            setFailure(true);
          }
        });
        setTimeout(() => {
          setSuccessfull(false);
        }, 3000);
      });
  };

   // Delete  Data
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?");
    if (DELETE) {
      setTimeout(async () => {
        await axios
        .delete(`${config.API_URL}//errorType/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setSuccessfull(true);
          }
        });
        setTimeout(() => {
          setSuccessfull(false);
        }, 3000);
      });
    }
    else{
    
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }  
  }

  //Update
  const handleEditShow = (id) => {
    setModalValue(id);
    setLgEditShow(true);
  };
  return (
  <>
    <div className="content">
    <EditModal
        setLgEditShow={setLgEditShow}
        id={modalValue}
        lgEditShow={lgEditShow}
      />
      <Success
        show={successfull}
        variant={"success"}
        message={"Deleted Successfully"}
      />
      <Failure
        show={failure}
        variant={"danger"}
        message={"something Went Wrong"}
      />
      <Success
        show={success}
        variant={"success"}
        message={"Added Successfully"}
      />
      <Row>
      <Col md="12">
            <button className="btn button" onClick={Createcate}>
              Create
            </button>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Error Type </CardTitle>
              </CardHeader>

               <div className="row"></div>
                 <Table responsive className="">
                    <thead className="text-primary">
                    <tr>
                    <th scope="col"> Value</th>
                      <th scope="col">Error category</th>
                      <th scope="col">Error kind</th>
                      <th scope="col"> Action </th>
                    </tr>
                  </thead>
                {
                  data? <tbody>
                    {/* -------------------------Daynamic------------------------ */}
                    {data.map((val, index) => (
                        <tr key={index}>
                        <td scope="col">{val.ErrorTypeValue}</td>
                          <td scope="col">{val.ErrorCategory.Name}</td>
                          <td scope="col"> {val.ErrorKind.Name}</td>
                          <td>
                          <i className="fas fa-edit icon-edit"
                            onClick={() => {
                              handleEditShow(val.ErrorTypeId);
                            }}
                          ></i>
                            {" "}
                            <i
                              className="fas fa-trash icon-delete"
                              onClick={() => onDelete(val.ErrorTypeId)}
                            ></i>
                          </td>

                        </tr>
                    ))}
                    <Row>
                      <Container
                        className="col-lg-8 col-xl-8 col-sm-8 col-md-8"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "grid",
                          marginLeft:"50%" ,
                        }}
                      >
                        <ReactPaginate
                          containerClassName="pagination"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-link"
                          nextClassName="page-link"
                          activeClassName="active"
                          breakLabel="..."
                          nextLabel=" next"
                          onPageChange={handlePageClick}
                          pageCount={total / postsPerPage}
                          previousLabel="pre "
                          renderOnZeroPageCount={null}
                        />
                      </Container>
                    </Row>
                  </tbody>
                    :
                    <Container
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "grid",
                        marginLeft: "100%",
                      }}
                    >
                      <LoaderComp
                        type={"Circles"}
                        height={100}
                        color={"#0e2434"}
                      />
                    </Container>
                }
              </Table>
            
          </Card>
        </Col>
      </Row>
    </div>
    <Modal show={modalVisibility}>
        <Modal.Header className="create">Error type</Modal.Header>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Modal.Body>
            <label>Value</label>
            <input
              type="text"
              className="form-control"
              placeholder="Value"
              required
              name="ErrorTypeValue"
              onChange={handleChange}
            />
          </Modal.Body>
          <Modal.Body>
            <div>Error category</div>
            <select
                     className="form-control"
                      placeholder="Error Kind"
                      type="text"
                      name="ErrorCategoryId"
                      onChange={handleChange} 
                      required
                    >
                      <option className="defaultSelect" disabled>Select Category</option>
                       {category.map((val, index) => (
                          <option value={val.Id} 
                          >{val.Name}</option>
                        ))}
            </select>
          </Modal.Body>
          <Modal.Body>
            <div>Error kind</div>
            <select
                     className="form-control"
                      placeholder="Error Kind"
                      type="text"
                      name="ErrorKindId"
                      onChange={handleChange}
                      required
                    >
                      <option className="defaultSelect" disabled>Select Error Kind</option>
                       {client.map((val, index) => (
                          <option value={val.Id} 
                          >{val.Name}</option>
                        ))}
            </select>
          </Modal.Body>

          <Modal.Footer className="bottum">
            <button type="button" onClick={() => setmodalVisibility(false)}>Cancel</button>
            <button type="submit" onClick={() => setmodalVisibility(false)}>Save</button>
          </Modal.Footer>
        </form>
      </Modal>
  </>
  );
}
export default ErrorKind;
