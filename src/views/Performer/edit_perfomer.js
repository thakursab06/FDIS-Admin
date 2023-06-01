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
  const { id } = useParams();
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [client, setclient] = useState([]);
  const [array,setArray]=useState([])
  const history = useHistory();

  //get
  useEffect(() => {
   
    const fetchData = async () => {
        try {
          axios.get(`${config.API_URL}//Performer/getId/${id}`)
          .then((response) => {
            console.log(response)
            const values = response.data.data;
            setItem(() => {
              setItem(values);
            });
          });
        } catch (error) {
          console.log(error.message);
        }
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
    fetchData();
    clientData();
   
  },[]);

  //create
  const [item, setItem] = useState({
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
    setItem({ ...item, [e.target.name]: e.target.value })
  };
  
  const formData = {
    UserName:item?.UserName,
    FirstName:item?.FirstName,
    LastName:item?.LastName,
    Email:item?.Email,
    Mobile:item?.Mobile,
    IsAnonymous:0,
    Password:item?.Password,
    PasswordFormat:1,   
    IsApproved:0,
    IsLockedOut:0,
    Count:0,
    CreateDate:Date(),
    Ordinal:0,
    Date:Date(),
    Phone:item?.Phone,
    PerformerTypes_Id:item?.itemTypes_Id== "yes" ? true : false,
    ReportType:1,
    CompanyName:item?.ClientId ,
    ClientId:item?.ClientId
  };

  // console.log(formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios
        .patch(`${config.API_URL}/SuperClient/${id}`, formData)
        .then((response) => {
          if (response) {
            window.alert("Updated");
            console.log("Record Updated")
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
          history.push('/admin/');
        }, 3000);   
  };
  
  return (
    <>
      <div className="content ">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Performer</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}
                  className="Pading"
                  autoComplete="off">
                  
                  <Row>
                    <Col className="pr-1" md="12">
                        <label>User Name</label>
                        <Input
                          type="text"
                          name="UserName"
                          value={item?.UserName}
                          className="form-control"
                          onChange={handleChange}
                          required
                          style={{width:"730px"}}
                        />
                    </Col> 
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                        <label>First Name</label>
                        <Input
                          type="text"
                          name="FirstName"
                          value={item?.FirstName}
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
                          value={item?.LastName}
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
                          value={item?.Email}
                          onChange={handleChange}
                          required
                          style={{width:"730px"}}
                        />
                    </Col> 
                  </Row>
                  
                  <Row>
                    <Col className="pr-1" md="6">
                        <label>Phone</label>
                        <Input
                          type="Number"
                          name="Phone"
                          value={item?.Phone}
                          onChange={handleChange}
                          required
                        />
                    </Col>
                    <Col className="pr-1" md="6">
                        <label>Mobile</label>
                        <Input
                          type="Number"
                          name="Mobile"
                          value={item?.Mobile}
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
                          value={item?.IsApproved}
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
                          value={item?.ClientId}
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
                          value={item?.PerformerTypes_Id}
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
                      <Button className="btn-round" color="danger" type="button">
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
