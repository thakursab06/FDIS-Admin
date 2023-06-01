import React, { useState, useEffect } from "react";
import axios from "axios";
import "assets/css/login.css";
import config from '../../config'
import LoaderComp from "../../Loader/LoaderComp";
import ReactPaginate from "react-paginate";
import { Modal } from "react-bootstrap";
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
import EditModal from '../floor/Edit_Model'

function Floor() {
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [successfull, setSuccessfull] = useState(false)
  const [failure, setFailure] = useState(false)
  const [success, setSuccess] = useState(false)
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [lgEditShow, setLgEditShow] = useState(false);
  const [modalValue, setModalValue] = useState()
  //Modal Visibility
  const newFloors = () => {
    setmodalVisibility(true);
  };
//Get
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}//floor`, {
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

  //Paggination
  const handlePageClick = (event) => {
    const newOffset = ((event.selected + 1));
    setCurrentPage(newOffset);
    fetchData({ page: newOffset })
  };

  //Reload page
  const reload=()=>window.location.reload();

  // Delete  Data
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?");
    if(DELETE) {
      setTimeout(async () => {
        await axios
        .delete(`${config.API_URL}//floor/${id}`)
        .then((response) => {
          if (response) {
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
  
  //create
  const [floor, setfloors] = useState({
    FloorName: "",
    FloorNameAbv: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setfloors({ ...floor, [e.target.name]: e.target.value });
    console.log(floor);
  };
  const formData = {
    FloorName: floor.FloorName,
    FloorNameAbv: floor.FloorNameAbv,
  };
  const onSubmit = async (e) => {
      e.preventDefault();
      setTimeout(async () => {
        await axios
        .post(`${config.API_URL}//floor`, formData)
        .then((response) => {
          if (response) {
            console.log("posted Data:");
            console.log(response);
            setSuccess(true);
          }
          else{
            setFailure(true);
          }
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      });
  };

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
            <button className="btn button" onClick={newFloors}>
              Create
            </button>
          </Col>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h3">
                Floor
              </CardTitle>
            </CardHeader>
               <div className="row"></div>
                 <Table responsive className="">
                    <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Code </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {
                  data? <tbody>
                    {/* -------------------------Daynamic------------------------ */}
                    {data.map((val, index) => (
                        <tr key={index}>
                        <td scope="col">{val.FloorName}</td>
                        <td scope="col">{val.FloorNameAbv}</td>
                        <td>
                          <i className="fas fa-edit icon-edit"
                            onClick={() => {
                              handleEditShow(val.Id);
                            }}
                          ></i>{" "}
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
                      }}>
                      <LoaderComp type={"Circles"} height={100} color={"#0e2434"} />
                    </Container>
                }
              </Table>
            
          </Card>
        </Col>
      </Row>
    </div>
    <Modal show={modalVisibility} id="floorcreate">
        <Modal.Header className="create">Create</Modal.Header>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Modal.Body>
            <label> Floor Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              id="name"
              name="FloorName"
              onChange={handleChange}
              required
            />
          </Modal.Body>
          <Modal.Body>
            <label> Floor Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Code"
              id="code"
              name="FloorNameAbv"
              onChange={handleChange}
              required
            />
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
export default Floor;
