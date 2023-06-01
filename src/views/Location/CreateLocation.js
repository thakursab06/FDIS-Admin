import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Container
} from "reactstrap";
import axios from "axios";
import '../../assets/css/login.css'
import { Modal } from "react-bootstrap";
import { useHistory,useParams } from "react-router-dom";
import LoaderComp from "../../Loader/LoaderComp";
import Paginetion from "../paggination";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import EditModal from './Edit_Location';
import config from '../../config'

function CreateLocation() {
  const [user, setUsers] = useState([]);
  const history = useHistory();
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [item,setItem] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);
  const [lgEditShow, setLgEditShow] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  
  
  //chnagePage
  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  const CreateLoction = () => {
    setmodalVisibility(true);
  };
  const BackHandal = () => {
    history.push("/admin/locations");
  };
  //GET
  const fetchData = async () => {
    try {
      axios.get(`${config.API_URL}//location?limit=1000&ucId=${id}`)
      .then((response) => {
        const values = response.data.data.rows;
        console.log(values);
        setUsers(values);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    
      fetchData();
  },[]);

  //Create
  const [location, setlocation] = useState({
    Name:"",
    Size: "",
    ClientId: "",
    Region:"",
    City:"",
    Address:"",
    ContactPerson:"",
    Activate:"",
    Email:"",
  });

  
  const handleChange = (e) => {
    e.preventDefault();
    setlocation({ ...location, [e.target.name]: e.target.value })
  };
  
  const formData = {
    Name:location.Name,
    Size:location.Size,
    ClientId:id,
    Region:location.Region,
    City:location.City,
    Address:location.Address,
    ContactPerson:location.ContactPerson,
    Activate:location.Activate== "yes" ? true : false,
    Email:location.Email,
    };
  
  //console.log(formData)

  const onSubmit = async (e) => {
    e.preventDefault();
      await axios
        .post(`${config.API_URL}//location`, formData)
        .then((response) => {
          console.log(response);
          if (response) {
            setSuccess(true);
          }
          else{
            setFailure(true);
          }
        }).catch(err=>{
          console.log(`this is an catch err`,err)
        })
        setTimeout(() => {
          setSuccess(false);
        }, 3000);   
  };

  //delete
  const onDelete = async (ID) => {
    const DELETE = window.confirm("Are you sure to delete ?");
    if(DELETE) {
      setTimeout(async () => {
        await axios
        .delete(`${config.API_URL}//location/${ID}`)
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

  const data= user.map((val)=>(
   val.UserClient
   ))
  //console.log(data[0].CompanyName)
  // const first=data[0];
  // console.log(first, first.Companyname);
  return (
    <>
     <EditModal
        setLgEditShow={setLgEditShow}
        id={modalValue}
        lgEditShow={lgEditShow}
      /> 
      <Failure
        show={failure}
        variant={"danger"}
        message={"something Went Wrong"}
      />
      <Success
        show={successfull}
        variant={"success"}
        message={"Deleted Successfully"}
      />
       <Success
        show={success}
        variant={"success"}
        message={"Added Successfully"}
      />
      
      <div className="content ">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Location</CardTitle>
                <CardTitle tag="h3">Client :
                  {/* {data[0].CompanyName} */}
                  </CardTitle>
              </CardHeader>
              <Col md="12">
                <button className="btn button" onClick={CreateLoction}>
                  Create
                </button>
                <Button
                  type="button"
                  className="btn button btn-danger "
                  onClick={BackHandal}
                >
                  Back to Customers
                </Button>
              </Col>
              <span className="serch m-4  ">
                Active
                <select className="m-2 ">
                  <option>All</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <button className="m-2">Search</button>
              </span>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Stad </th>
                      <th>Adres </th>
                      <th>Size</th>
                      <th>Email address </th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {currentPosts.length !== 0 ? (
                  <tbody>
                     {
                      currentPosts?.map((val,index)=>(
                          <tr key={index}>
                          <td>{val.Name}</td>
                          <td>{val.City}</td>
                          <td>{val.Address}</td>
                          <td>{val.Size}</td>
                          <td>{val.Email?val.Email:"Not Available"}</td>
                          <td>{val.Activate ?"Active":"Deactive"}</td>
                          <td className="">
                            <i
                              className="fas fa-edit icon-edit"
                              onClick={() => {
                              handleEditShow(val.Id)}}
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
                            marginLeft: "80%",
                          }}
                        >
                          <Paginetion
                            postsPerPage={postsPerPage}
                            totalPosts={user.length}
                            paginate={paginate}
                          />
                            </Container>
                          </Row>
                  </tbody>
                    ) : (<Container
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
        <Modal.Header className="create">Create</Modal.Header>
        <form  onSubmit={onSubmit} noValidate autoComplete="off">
          <Modal.Body>

          <Col md="12">
              <input
              type="hidden"
              className="form-control"
              name="ClientId"
              onChange={handleChange}
              required  
            />
          </Col>
          <Col md="12">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="Name"
              onChange={handleChange}
              required  
            />
          </Col>

          <Col md="12">
          <div>
            <div>
              Adres
              <input
              type="text"
              className="form-control"
              name="Address"
              onChange={handleChange}
              required  
            />   
            </div>
          </div>
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
              Stad
            </label>
            <input
              type="text"
              className="form-control"
              name="City"
              onChange={handleChange}
              required  
            />   
            
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
            Gebied
            </label>
            <input
              type="text"
              className="form-control"
              name="Region"
              onChange={handleChange}
              required  
            />   
            
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
            Size 
            </label>
            <input
              type="number"
              className="form-control"
              name="Size"
              onChange={handleChange}
              required  
            />   
            
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
            Contact person 
            </label>
            <input
              type="text"
              className="form-control"
              name="ContactPerson"
              onChange={handleChange}
              required  
            />   
            
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
            Email address 
            </label>
            <input
              type="email"
              className="form-control"
              name="Email"
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
              name="Activate"
              onChange={handleChange}
              required
              >
                <option value="yes">Active</option>
                <option value="no">Deactive</option>
              </select>
              
            </div>
          </div>
          </Col>
          
          
          </Modal.Body>
          <Modal.Footer className="bottum">
            <button type="button" onClick={() => setmodalVisibility(false)}>Cancel</button>
            <button type="submit" onClick={() => setmodalVisibility(false)}>Save</button>
          </Modal.Footer>
          </form >
      </Modal>
    </>
  );
}

export default CreateLocation;
