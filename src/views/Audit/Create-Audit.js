import React, { useState, useEffect } from "react";
import axios from "axios";
import config from '../../config'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";

function CreateAudit() {
  // //create
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [client,setclient]=useState([]);
  const [location,setLocation]=useState([]);
  const [perfomer,setPerfomer]=useState([]);
  //----------------------------Event for client dropdown--------------------------------------//

  const [selectClient , setselectClient]=useState({
     NameClient_Id: "",
  });

  const changeSelectOptionHandler = (event) => {
    const clientId=event.target.value
    setselectClient(clientId);
  };
   
  //-------------------------------Create------------------------------------//
  
  const [audit, setAudit] = useState({
    AuditCode:"",
    Date: "",
    IsActive: "",
    IsDone: "",
    Type: "",
    LocationClient_Id: "",
    PresentClient: "",
    LastControlDate: "",
    Activate: "",

  });
  const handleChange = (e) => {
    e.preventDefault();
    setAudit({ ...audit, [e.target.name]: e.target.value });
    // console.log(audit[e.target.name]);
  };
  let formData = {
    //AuditCode:Math.floor(100000 + Math.random() * 900000),
    AuditCode:200625,
    Date:audit.Date,
    IsActive:audit.IsActive == "yes" ? 1 : 0 ,
    IsDone:1 ,
    Type:audit.Type ,
    NameClient_Id:selectClient ,//client
    LocationClient_Id:audit.LocationClient_Id , //Location
    PresentClient:audit.PresentClient, //
    LastControlDate:audit.Date,
    Activate:audit.Activate == "yes" ? 1 : 0 ,
  }; 
  console.log(formData)

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${config.API_URL}//audit`, formData)
      .then((response) => {
        if (response) {
          setSuccess(true);
          console.log("Data post");
        }
        else{
          alert(response)
          setFailure(true);
        }
      }).catch(err=>{
        console.log(`this is an catch err`,err)
      })
      setTimeout(() => {
        setSuccess(false);
      }, 3000);  
  };

  //-------------------------GET----------------------------//
  const clientid= formData.NameClient_Id 
  const clientData = async () => {
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
  const LocationData = async () => {
    await axios
      .get(
        `${config.API_URL}/location/filterLocation/${clientid}`
      )
      .then((res) => {
        const response = res.data.data;
        setLocation(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const PerformerData = async () => {
    await axios
      .get(
        `${config.API_URL}/location/filterPerformer/${clientid}`
      )
      .then((res) => {
        const response = res.data.data;
        setPerfomer(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
    useEffect( async () => {
      clientData();
      LocationData();
      PerformerData();
    },[clientid]); 
      
  return (
    <>
      <div className="content ">
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
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Create Audit</CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  onSubmit={onSubmit}
                  className="Pading"
                  autoComplete="off"
                >
                  <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <label>Client </label>
                        <select
                          name="NameClient_Id"
                          className="form-control"
                          onChange={changeSelectOptionHandler}
                          style={{width:"610px"}}
                          required
                       >
                        <option> Select Client</option>
                        {client.map((val, index) => (
                        <option value={val.Id} 
                          >{val.CompanyName}</option>
                        ))}
                      </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                        <label>Location</label>
                        <select
                          className="form-control"
                          data-val="true"
                          data-val-required="This field is required"
                          id="location"
                          name="LocationClient_Id"
                          required
                          onChange={handleChange}
                        >
                          <option >Select</option>
                        {location.map((val, index) => (
                        <option value={val.Id} 
                          >{val.Name}</option>
                        ))}
                          
                        </select>
                    </Col>
                    <Col className="pr-1" md="6">
                        <label>Performers</label>
                        <select
                          className="form-control"
                          data-val="true"
                          data-val-required="This field is required"
                          id=""
                          name="PresentClient"
                          required
                          onChange={handleChange}
                        >
                          
                        <option>Select</option>
                        {perfomer.map((val, index) => (
                        <option value={val.Id} 
                          >{val.FirstName}{" "}{val.LastName}</option>
                        ))}
                        </select>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          // placeholder="Date"
                          type="Date"
                          name="Date"
                          value={audit.Date}
                          onChange={handleChange}
                          style={{height:"40px"}}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Type</label>
                        <Input
                          placeholder="Type"
                          type="text"
                          name="Type"
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Actief</label>
                        <select
                          className="form-control"
                          name="IsActive"
                          defaultValue="yes"
                          value={audit.IsActive}
                          onChange={handleChange}
                          required
                        >
                          <option values="yes">Yes</option>
                          <option values="no">No</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Activate</label>
                        <select
                          className="form-control"
                          name="Activate"
                          required
                          onChange={handleChange}
                        >
                          <option disabled>Select Activation</option>
                          <option values='yes'>Activate</option>
                          <option values='no'>Deactivate</option>
                        </select>                      </FormGroup>
                    </Col>
                  </Row>
                 

                  <Row>
                    <div>
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Link to="/admin/dashboard">
                        <button className="btn btn-danger btn-round m-2">
                          Back To Audits
                        </button>
                      </Link>
                      <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateAudit;
