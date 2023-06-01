import React, { useState, useEffect } from "react";
import axios from "axios";
import "assets/css/login.css";
import config from '../../config'
import LoaderComp from "../../Loader/LoaderComp";
import ReactPaginate from "react-paginate";
import AsyncSelect from 'react-select/async'
import moment from 'moment'
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
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import EditModal from '../ElementType/edit_model'
import { Modal } from "react-bootstrap";

function Element() {
  const [data, setUsers] = useState([]);
  const [client,setclient]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalVisibility, setmodalVisibility] = useState(false); 
  const [lgEditShow, setLgEditShow] = useState(false);
  const [modalValue, setModalValue] = useState("");

  //Modal Show
  function onclickbut() {
    setmodalVisibility(true);
  }
  //GET
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}/elementType`, {
      params: {
        page: currentPage,
        limit: postsPerPage,
        ...query
      }
    })
      .then((res) => {
        const response = res.data.data.rows;
        setUsers(response);
        setTotal(res.data.data.count)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clientData = async () => {
    await axios
      .get(
        `${config.API_URL}/country`
      )
      .then((res) => {
        const response = res.data.data.rows;
        setclient(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    fetchData();
    clientData();
  }, []);

  //Paggination
  const handlePageClick = (event) => {
    const newOffset = ((event.selected + 1));
    setCurrentPage(newOffset);
    fetchData({ page: newOffset })
  };

  //create
  const [elemintType, setElemintType] = useState({
    ElementTypeValue: "",
    AreaDescriptionIds: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setElemintType({ ...elemintType, [e.target.name]: e.target.value });
  };
  const formData = {
    ElementTypeValue: elemintType.ElementTypeValue,
    AreaDescriptionIds: [elemintType.AreaDescriptionIds],
  };
  const onSubmit = async (e) => {
    let headers = { 'content-type': 'application/json' }
    e.preventDefault();
    await axios
      .post(`${config.API_URL}/elementType`, formData,{headers})
      .then((res) => {
        if (res) {
          console.log("Post data:")
          console.log(res);
          setSuccess(true);
        } else {
          console.log(res);
          setFailure(true);
        }
      });
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
  };

  //Deleted  Data
  const onDelete = async (id) => {
    console.log(id);
    const DELETE = window.confirm("Are you sure to delete ?");
    if (DELETE) {
        await axios
        .delete(`${config.API_URL}//elementType/${id}`)
        .then((response) => {
          if (response) {
            console.log(response);
            setSuccessfull(true);
          }
        });
        setTimeout(() => {
          setSuccessfull(false);
        }, 3000);
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
  
   //Reload Page
   const reload=()=>window.location.reload();


  return (
  <>
    <div className="content">
      <Success
        show={success}
        variant={"success"}
        message={"Added Successfully"}
      />
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
      
      <Row>
        <Col md="12">
            <button className="btn button" onClick={onclickbut}>
              Create
            </button>
          </Col>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h3">
                Element Types
              </CardTitle>
            </CardHeader>
               <div className="row"></div>
                 <Table responsive className="">
                    <thead className="text-primary">
                    <tr>
                      <th>S.No.</th>
                      <th>Value</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                {
                  data? <tbody>
                    {/* -------------------------Daynamic------------------------ */}
                    {data.map((val, index) => (
                        <tr key={index}>
                        <td scope="col">{index + 1}</td>
                          <td scope="col">{val.ElementTypeValue}</td>

                          <td>
                            <i
                              className="fas fa-edit icon-edit"
                              onClick={() => {
                              handleEditShow(val.ElementTypeId);
                            }}
                            ></i>
                            <i
                              className="fas fa-trash icon-delete"
                              onClick={() => onDelete(val.ElementTypeId)}
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
                      }}>
                      <LoaderComp type={"Circles"} height={100} color={"#0e2434"} />
                    </Container>
                }
              </Table>
            
          </Card>
        </Col>
      </Row>
    </div>
    <Modal show={modalVisibility}>
          <Modal.Header className="create">Create</Modal.Header>
          <form onSubmit={onSubmit}  autoComplete="off">
            <Modal.Body>
            <Col md="12">
              <label> Element Value</label>
              <input
                type="text"
                className="form-control"
                placeholder="Value"
                name="ElementTypeValue"
                onChange={handleChange}
                required
              />
            </Col>  
              <Col md="12">
                <label htmlFor="test" className="Klaten-label">
                  Areas
                </label>
                <select
                  name="AreaDescriptionIds"
                  className="form-control"
                  onChange={handleChange}
                  required
                >
                <option className="defaultSelect" disabled>Select Area</option>
                {client.map((val, index) => (
                  <option value={val.Id} 
                  >{val.CountryName}</option>
                ))}
                </select>
              </Col>
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
export default Element;
