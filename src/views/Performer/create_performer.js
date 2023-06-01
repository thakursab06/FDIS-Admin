import React, { useState, useEffect } from "react";
import "assets/css/login.css";
import { useForm } from "react-hook-form";
// reactstrap components
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
} from "reactstrap";
import {Link,useParams } from "react-router-dom";
import axios from "axios";
import config from '../../config'
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import { useHistory } from "react-router-dom";

function CreatePerformer() {
  const { register, handleSubmit } = useForm();
  const [client, setclient] = useState([]);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const history = useHistory();
  //get Client
  useEffect(() => {
  
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
    clientData();
   
  },[]);

  //create
  const [performer, setPerformer] = useState({
    UserName:"",
    FirstName: "",
    LastName: "",
    Email:"" ,
    LoweredEmail:"",
    Mobile:"",
    IsAnonymous:"",
    Password:"",
    PasswordFormat:"",   
    IsApproved:"",
    IsLockedOut:"",
    Count:"",
    CreateDate:"",
    Ordinal: "",
    Date:"",
    Phone:"",
    PerformerTypes_Id: "",
    ReportType: "",
    CompanyName: "",
    ClientId:""
    
  });

  const handleChange = (e) => {
    e.preventDefault();
    setPerformer({ ...performer, [e.target.name]: e.target.value })
  };
  
  const formData = {
    UserName:performer.UserName,
    FirstName:performer.FirstName,
    LastName:performer.LastName,
    Email:performer.Email,
    LoweredEmail:performer.Email.toLowerCase(),
    Mobile:performer.Mobile,
    IsAnonymous:performer.IsAnonymous=="yes"? 1 : 0,
    Password:performer.Password=="1"?1:2,
    PasswordFormat:1,   
    IsApproved:0,
    IsLockedOut:0,
    Count:0,
    CreateDate:Date(),
    Ordinal:0,
    Date:Date(),
    Phone:performer.Phone,
    PerformerTypes_Id:performer.PerformerTypes_Id== "yes" ? true : false,
    ReportType:1,
    CompanyName:performer.ClientId ,
    ClientId:performer.ClientId
    };

    console.log(formData)
  

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${config.API_URL}/Performer`, formData)
      .then((response) => {
        if (response) {
          setSuccess(true);
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
        history.push('/admin/performers');
      }, 3000);  
  };
  


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
                <CardTitle tag="h5">Create Performer</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}
                  className="Pading"
                  autoComplete="off">
                  
                  <Row>
                    <Col className="pr-1" md="12">
                        <label>User Name</label>
                        <Input
                          type="text"
                          name="UserName"
                          className="form-control"
                          onChange={handleChange}
                          required
                          style={{width:"610px"}}
                        />
                    </Col> 
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                        <label>First Name</label>
                        <Input
                          type="text"
                          name="FirstName"
                          className="form-control"
                          onChange={handleChange}
                          required
                        />
                    </Col>

                    <Col className="pr-1" md="6">
                        <label>Last Name</label>
                        <Input
                          type="text"
                          name="LastName"
                          className="form-control"
                          onChange={handleChange}
                          required
                        />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                    <label>Email Address</label>
                        <Input
                          type="email"
                          name="Email"
                          onChange={handleChange}
                          required
                          style={{width:"610px"}}
                        />
                    </Col> 
                  </Row>
                  <Row>
                    <Col md="6">
                        <label>Password</label>
                        <Input
                          type="password"
                          name="Password"
                          onChange={handleChange}
                          required

                          {...register("type", { required: true })}
                        />
                    </Col>
                    <Col className="pr-1" md="6">
                        <label>Confirm Password</label>
                        <Input
                          type="password"
                          name="Password"
                          onChange={handleChange}
                          required
                        />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                        <label>Phone</label>
                        <Input
                          type="Number"
                          name="Phone"
                          onChange={handleChange}
                          required
                        />
                    </Col>
                    <Col className="pr-1" md="6">
                        <label>Mobile</label>
                        <Input
                          type="Number"
                          name="Mobile"
                          onChange={handleChange}
                          required
                        />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <div className="editor-label">
                        <label>Actief</label>
                        <select
                          className="form-control"
                          name="IsApproved"
                          onChange={handleChange}
                          required
                        >
                          <option>Select Actief</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </Col>
                    <Col className="pr-1" md="6">
                      <div className="editor-label">
                        <label>Client</label>
                        <select
                          className="form-control"
                          name="ClientId"
                          onChange={handleChange}
                          required
                        >
                          <option>Select Clients </option>
                          {client.map((val, index) => (
                            <option value={val.Id} 
                         >{val.CompanyName}</option>
                          ))}
                        </select>
                      </div>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col className="pr-1" md="6">
                      <div className="editor-label">
                        <label for="IsFixed">Types of performer</label>
                        <select
                          className="form-control"
                          name="PerformerTypes_Id"
                          style={{width:"310px",height:"40px"}}
                          required
                         >
                         <option>Select Performer Type</option>
                         <option value="1">Auditor</option>
                         <option value="2">Performer</option>
                         </select>
                      </div>
                    </Col>
                    <Col className="pr-1" md="6">
                      <div className="editor-label">
                        <label for="IsFixed">Profile Image</label>
                        <input
                          className="form-control"
                          name=""
                          type="file"
                          style={{width:"300px",height:"40px"}}
                          required
                          {...register("chooseFile", { required: true })}
                        />
                      </div>
                    </Col>
                    
                  </Row>
                  <Row>
                    {/* //className="update ml-auto mr-auto" */}
                    <div>
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        name="submit"
                        onSubmit={onsubmit}
                      >
                        Submit
                      </Button>
                      <Link to={"/admin/performers"}>
                      <Button className="btn-round" color="danger" type="submit">
                       Cancle
                      </Button>
                    </Link>
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

export default CreatePerformer;
