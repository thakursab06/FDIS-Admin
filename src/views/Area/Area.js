import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/login.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container,
} from "reactstrap";
import LoaderComp from "../../Loader/LoaderComp";
import { Modal } from "react-bootstrap";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import EditModal from './Edit'
import config from '../../config'
import ReactPaginate from "react-paginate";

function Area() {
  const [modalVisibility, setmodalVisibility] = useState(false);
  const AreaDesc = () => {
    setmodalVisibility(true);
  };
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [category,setcategory]=useState([]);
  const [lgEditShow, setLgEditShow] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [array,setArray]=useState([])
 //GET
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}//areaDesc`, {
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
  
  const categoryData = async () => {
    await axios
      .get(
        `${config.API_URL}//category`
      )
      .then((res) => {
        const response = res.data.data.rows;
         setcategory(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    categoryData();
    fetchData();
  }, []);

  const handlePageClick = (event) => {
    const newOffset = ((event.selected + 1));
    setCurrentPage(newOffset);
    fetchData({ page: newOffset })
  };
  
  const handlePush = (e)=>{
    e.preventDefault();
    const data = array.push(e.target.value);
    console.log(data)
    setArray(data);
 }
  //create
  const [area, setArea] = useState({
    Name: "",
    Abbreviation: "",
    Active: "",
    CategoryIds:array,
  });
  const handleChange = (e) => {
    e.preventDefault();
    setArea({ ...area, [e.target.name]: e.target.value });
  };
  const formData = {
    ModuleId:2,
    Name: area.Name,
    Abbreviation: area.Abbreviation,
    Active: area.Active == "true" ? true : false,
    CategoryIds: area.CategoryIds,
  };
  //console.log(formData);
 
  const onSubmit = async (e) => {
        e.preventDefault();
        await axios
        .post(`${config.API_URL}//areaDesc`, formData)
        .then((response) => {
            if (response) {
              setSuccess(true);
            }
        });
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 3000);
  };

  
  // Delete  Data
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?");
    if(DELETE) {
      setTimeout(async () => {
        await axios
        .delete(`${config.API_URL}//areaDesc/${id}`)
        .then((response) => {
          if (response) {
            console.log("Delete Succefull")
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
     alert(id);
    setModalValue(id);
    setLgEditShow(true);
  };

  return (
    <>
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
      <div className="content">
        <Row>
          <Col md="12">
            <button className="btn button" onClick={AreaDesc}>
              Create
            </button>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Area Description List</CardTitle>
              </CardHeader>
              <CardBody>
                  <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Abbreviation</th>
                      <th>Actief</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {data ? (
                    <tbody>
                      {data?.map((val, index) => (
                        <tr key={index}>
                          <td scope="col">{val.Name}</td>
                          <td scope="col">{val.Abbreviation}</td>
                          <td scope="col"> {val.Active ? "Yes" : "No"}</td>

                          <td>
                          <i
                              className="fas fa-edit icon-edit"
                              onClick={() => {
                              handleEditShow(val.Id);
                            }}
                            ></i>{" "}
                            <i
                              className="fas fa-trash icon-delete "
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
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal show={modalVisibility}>
        <Modal.Header className="create">Create Area Description</Modal.Header>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Modal.Body>
            <Row>
              <Col md="12">
                <div>Name</div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  required
                  name="Name"
                  onChange={handleChange}
                />
              </Col>
              </Row>
              <Row>
               <Col md="12">
               <div>Abbreviation</div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Abbreviation"
                  id="Abbre"
                  required
                  name="Abbreviation"
                  onChange={handleChange}
                />
               </Col>
              </Row>
              <Row>
                <Col>
                Active
                  <select
                    className="form-control"
                    data-val-required="true"
                    name="Active"
                    required
                    onChange={handleChange}
                    value={area.Active}
                  >
                    <option className="defaultSelect" >Select Active</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                
                </Col>
              </Row>
              <Row>
              <Col md="12">
                <label htmlFor="test" className="Klaten-label">
                  Categories
                </label>
                <select
                  name="CategoryIds"
                  className="form-control klaten-list"
                  required
                  onChange={handlePush}
                >
                 <option className="defaultSelect">Select Category</option>
                       {category.map((val, index) => (
                          <option value={val.ID} 
                          >{val.CategoryName}</option>
                        ))}
                  
                </select>
              </Col>
              </Row>       
          </Modal.Body>

          <Modal.Footer className="bottum">
            <button  type="button" onClick={() => setmodalVisibility(false)}>Cancel</button>
            <button type="submit" onClick={() => setmodalVisibility(false)}>Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Area;

