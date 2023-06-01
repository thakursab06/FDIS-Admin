import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "assets/css/login.css";
import { Modal } from "react-bootstrap";
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
import LoaderComp from "../../Loader/LoaderComp";
import Paginetion from '../paggination';
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import EditModal from './edit_modal';
import config from '../../config'
import ReactPaginate from "react-paginate";
import { Alert } from "react-bootstrap";

function KPI_Element() {
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [failure, setFailure] = useState(false)
  const [successfull, setSuccessfull] = useState(false)
  const [success, setSuccess] = useState(false)
  const [client,setclient]=useState([]);
  const [lgEditShow, setLgEditShow] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [modalVisibility, setmodalVisibility] = useState(false);
  const KPLeliment = () => {
    setmodalVisibility(true);
  };
  
  
 //GET
 const fetchData = async (query) => {
  await axios.get(`${config.API_URL}//kpiElement`, {
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
const clientData = async () => {
  await axios
    .get(
      `${config.API_URL}//userClient`
    )
    .then((res) => {
      const response = res.data.data;
      setclient(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
  useEffect(async () => {
    clientData();
    fetchData();
  },[]);

  const handlePageClick = (event) => {
    const newOffset = ((event.selected + 1));
    setCurrentPage(newOffset);
    fetchData({ page: newOffset })
  };
  
  //create
  const [kpi, setKpi] = useState({
    ElementLabel: "",
    ElementStatus: "",
    UserClientIds:"",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setKpi({ ...kpi, [e.target.name]: e.target.value });
  };
  const formData = {
    ElementLabel: kpi.ElementLabel,
    ElementStatus:kpi.ElementStatus == "yes" ? true : false,
    UserClientIds: [kpi.UserClientIds]
  };
  console.log(formData);

  const onSubmit = async (e) => {
    let headers = { 'content-type': 'application/json' }
    e.preventDefault();
    
    await axios
      .post(`${config.API_URL}//kpiElement`, formData,{headers})
      .then((res) => {
        if (res) {
          // alert('done')
          console.log(res);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        } 
        else {
          console.log("Error is:")
          console.log(res);
          setFailure(true);
        }
      });
  };

  //delete
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?");
    if(DELETE) {
      setTimeout(async () => {
        await axios
        .delete(`${config.API_URL}//kpiElement/${id}`)
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
      
        
        {/* {success?<Alert variant="success">
        Added Successfully
        </Alert> : ""} */}
       
        <Row>
          <Col md="12">
            <button className="btn button" onClick={KPLeliment}>
              Create
            </button>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">KPI Elements</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>

                  <thead className="text-primary">
                    <tr>
                      <th scope="col"> S.No.</th>
                      <th scope="col">Element</th>
                      <th scope="col">Element Status</th>
                      <th scope="col"> Action </th>
                    </tr>
                  </thead>
                  {
                     data ?
                  <tbody>
                    {data?.map((val, index) => (
                      <tr key={index}>
                        <td scope="col">{index + 1}</td>
                        <td scope="col">{val.ElementLabel}</td>
                        <td scope="col"> {val.ElementStatus ? "Yes" : "No"}</td>
                        <td>
                          <i
                            className="fas fa-edit icon-edit"
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
                  
                  
                  </tbody>:<Container
                          style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "grid",
                          marginLeft:"100%",
                         }}>
                         <LoaderComp type={"Circles"} height={100} color={"#0e2434"} />
                  </Container>}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

        <Modal show={modalVisibility}>
        <Modal.Header className="create">Create</Modal.Header>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Modal.Body>
          <Col md="12">
            <label>Element Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              id="name"
              name="ElementLabel"
              onChange={handleChange}
              required  

            />
          </Col>

          <Col md="12">
          <div>
            <div>
              Active
              <select
              className="form-control"
              name="ElementStatus"
              onChange={handleChange}
              value={kpi.ElementStatus}
              required
              >
                <option>Select Active</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              
            </div>
          </div>
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
              Customers
            </label>
            <select
              name="UserClientIds"
              className="form-control"
              onChange={handleChange}
              required
            >
            {client.map((val, index) => (
              <option value={val.Id} 
              >{val.CompanyName}</option>
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

export default KPI_Element;
