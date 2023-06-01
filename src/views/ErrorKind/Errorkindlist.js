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
import EditModal from '../ErrorKind/Edit_modul'

function ErrorKind() {
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [modalVisibility, setmodalVisibility] = useState(false);
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
    await axios.get(`${config.API_URL}//errorKind`, {
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
  
  useEffect(() => {
    fetchData();
  }, []);

  const handlePageClick = (event) => {
    const newOffset = ((event.selected + 1));
    setCurrentPage(newOffset);
    fetchData({ page: newOffset })
  };

  //create
  let [errorCategory, setErrorCategory] = useState({
    Name: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setErrorCategory({ ...errorCategory, [e.target.name]: e.target.value });
  };
  const formData = {
    Name: errorCategory.Name,
  };
  console.log(formData);
  const onSubmit = async (e) => {
    let headers = { 'content-type': 'application/json' }
      e.preventDefault();
      setTimeout(async () => {
        await axios
        .post(`${config.API_URL}//errorKind`, formData,{headers})
        .then((response) => {
          if (response) {
            console.log("Posted data :");
            console.log(response);
            setSuccessfull(true);
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
        .delete(`${config.API_URL}//errorKind/${id}`)
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

   //Reload Page
   const reload=()=>window.location.reload();

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
                <CardTitle tag="h4">Error Kind </CardTitle>
              </CardHeader>

               <div className="row"></div>
                 <Table responsive className="">
                    <thead className="text-primary">
                    <tr>
                      <th scope="col"> S.No.</th>
                      <th scope="col">Name</th>
                      <th scope="col"> Action </th>
                    </tr>
                  </thead>
                {
                  data? <tbody>
                    {/* -------------------------Daynamic------------------------ */}
                    {data.map((val, index) => (
                        <tr key={index}>
                          <td scope="col">{index + 1}</td>
                          <td scope="col">{val.Name}</td>

                          <td>
                          <i
                              className="fas fa-edit icon-edit"
                              onClick={() => {
                              handleEditShow(val.Id);
                            }}
                            ></i>
                            <i
                              className="fas fa-trash icon-delete"
                              onClick={() => onDelete(val.Id)}
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
        <Modal.Header className="create">Create</Modal.Header>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Modal.Body>
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
              name="Name"
              onChange={handleChange}
            />
          </Modal.Body>

          <Modal.Footer className="bottum">
            <button onClick={() => setmodalVisibility(false)}>Cancel</button>
            <button onClick={() => setmodalVisibility(false)}>Save</button>
          </Modal.Footer>
        </form>
    </Modal>
  </>
  );
}
export default ErrorKind;
