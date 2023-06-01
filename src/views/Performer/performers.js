import React, { useState, useEffect ,useRef} from "react";
import axios from "axios";
import LoaderComp from "../../Loader/LoaderComp";
import '../../assets/css/login.css'
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container
} from "reactstrap";

import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PasswordModal from './forgetPwd'
import config from '../../config'
import ReactPaginate from "react-paginate";
function Performer() {
  const history = useHistory();
  const editPerformer = () => {
    console.log("perfomer");
    history.push("/edit_perfomer");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [user, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);
  const [client,setclient]=useState([]);
  const [lgEditShow, setLgEditShow] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [modalValue1, setModalValue1] = useState("");
  const inputElement = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // ---------------------kundan changes -----------
  
  
  //chnagePage
  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);

  const clientData = async () => {
    await axios.get(
        `${config.API_URL}/Performer`)
      .then((res) => {
        console.log(res)
        const response = res.data.data;
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Customer = async () => {
    await axios
      .get(
        `${config.API_URL}/userClient`
      )
      .then((res) => {
        const response = res.data.data;
        setclient(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    clientData();
    Customer();
  },[]);
  
  //Forget Password
  const handlePassword = (id,user) => {
    setModalValue(id);
    setModalValue1(user);
    setLgEditShow(true);
  };

  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };
  
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newItemsList = user.filter((items) => {
        // console.log(Object.values(item));
        return Object.values(items)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newItemsList);
    } else {
      setSearchResults(user);
    }
  };

  // Delete  Data
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?"+id);
    if(DELETE) {
      setTimeout(async () => {
        await axios
        .delete(`${config.API_URL}/SuperAdmin/${id}`)
        .then((response) => {
          if (response) {
            console.log("item deleted");
            console.log(response);
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
      console.log("Error detected");
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }  
  }
  
  //update
  const Performer_edit = (ID) => {
    history.push(`/edit_perfomer/${ID}`);
  };
  return (
    <>
      <PasswordModal
        setLgEditShow={setLgEditShow}
        id={modalValue}
        user={modalValue1}
        lgEditShow={lgEditShow}
      />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Performers</CardTitle>
              </CardHeader>
              <Col>
                <span className="d-flex flex-wrap-reverse Controller">
                  <div className="d-flex bd-highlight mb-3">
                  <span className="m-2">
                      Coustomer
                      <select
                          name="NameClient_Id"
                          className="form-control"
                          required

                       >
                        <option> Select Customer</option>
                        {client.map((val, index) => (
                        <option value={val.Id} 
                          >{val.UserName}</option>
                        ))}
                      </select>
                    </span>
                    <span className="m-2">
                      Actief
                      <select
                        id="active"
                        name="active"
                        className="form-control input-sizePerformer"
                      >
                        <option selected="selected" value="all"> All</option>
                        <option value="true">YES</option>
                        <option value="false">No</option>
                      </select>
                    </span>
                    <span className="m-2">
                      Auditor
                      <select
                        id="auditor"
                        name="auditor"
                        className="form-control input-sizePerformer"
                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </span>
                    <span className="m-2">
                      Project Leader
                      <select
                        id="pLeader"
                        name="pLeader"
                        className="form-control input-sizePerformer"

                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </span>
                    <span className="m-2">
                      <div>Search on String</div>
                      <input
                        placeholder="Search on string"
                        type="text"
                        value={searchTerm}
                        className="form-control"
                        style={{width:"200px",
                        height:"40px"}}
                        ref={inputElement}
                        onChange={getSearchTerm}

                      /> 
                    </span>
                    <span style={{marginTop:"18px"}}
                    >
                    <input type="submit" value="Search" style={{
                        height:"40px"}}
                        className="btn btn-primary"
                        />
                    </span>
                  </div>
                </span>
              </Col>

              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th scope="col">User Name</th>
                      <th scope="col">First Name </th>
                      <th scope="col">Last Name </th>
                      <th scope="col">Email</th>
                      <th scope="col">Actief</th>
                      <th scope="col">Auditor</th>
                      <th scope="col">Project Leader</th>
                      <th scope="col">Reset Password</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tr>

                  </tr>
                  {searchResults.length > 1 || currentPosts.length > 1 ? (
                    <tbody>
                     {(searchTerm.length < 1 ? currentPosts : searchResults)?.map((val, index) => (
                      <tr key={index}>
                        <td scope="col">{val.UserName}</td>
                        <td scope="col">{val.FirstName}</td>
                        <td scope="col">{val.LastName?val.LastName:<p style={{color: "red"}}>No Such Entry</p>}</td>
                        <td scope="col">{val.EmailAddress}</td>
                        <td scope="col">{val.PerformerTypes_Id?"Yes":"No"}</td>
                        <td scope="col">{val.Name=="Auditor"?"Yes":"No"}</td>
                        <td scope="col">{val.Name=="Project Leader"?"Yes":"No"}</td>
                        <td>
                          <Link onClick={() => {
                              handlePassword(val.UserId,val.UserName);}}>Reset Password</Link>
                        </td>
                        <td>
                        <i
                              className="fas fa-edit icon-edit"
                              onClick={() =>Performer_edit(val.UserId)}
                            ></i>
                            {" "}
                            <i
                              className="fas fa-trash icon-delete"
                              onClick={() => onDelete(val.UserId)}
                            ></i>{" "}
                        </td>
                      </tr>
                     ))}
                     <tr>
                      <th colSpan="10">
                      <Container
                          className="col-lg-8 col-xl-8 col-sm-8 col-md-8"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "grid",
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
                          //onPageChange={handlePageClick}
                          postsPerPage={postsPerPage}
                          pageCount={user.length}
                          previousLabel="pre "
                          renderOnZeroPageCount={null}
                        />

                        </Container>
                      </th>
                        
                     </tr>
                    </tbody>
                    ) : (
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
                  )}

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header>
                      <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete</Modal.Body>
                    <Modal.Footer>
                      <button onClick={handleClose}>Cancel</button>
                      <button>Yes</button>
                    </Modal.Footer>
                  </Modal>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
            marginTop: "10%",
          }}
        >
          {/* <LoaderComp type={"Circles"} height={100} color={"#0e2434"} /> */}
        </Row>
      </div>
    </>
  );
}

export default Performer;
