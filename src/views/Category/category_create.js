import React, { useState, useEffect } from "react";
import "assets/css/login.css";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import config from '../../config'
function Category_create() {
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [client, setclient] = useState([]);
  const [array,setArray]=useState([])
  const history = useHistory();

  //get Client
  useEffect(async () => {
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
    clientData();
   
  },[]);



  const handlePush = (e)=>{
     e.preventDefault();
     const data = array.push(e.target.value);
     setArray(data);
     console.log(array)
  }
  //create
  const [cate, setfloors] = useState({
    CategoryNameAbv:"",
    IsFixed: "",
    CategoryName: "",
    SortOrder: 0,
    UserClientIds:array,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setfloors({ ...cate, [e.target.name]: e.target.value })
  };
  
  const formData = {
    CategoryNameAbv:'null',
    IsFixed:cate.IsFixed == "yes" ? true : false,
    CategoryName: cate.CategoryName,
    SortOrder: 0,
    UserClientIds: cate.UserClientIds
    };
  

  const onSubmit = async (e) => {
    e.preventDefault();
      await axios
        .post(`${config.API_URL}//category`, formData)
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
          history.push('/admin/categories');
        }, 3000);    
  };
  

  return (
    <>
      
      <div className="content">
      <Success
        show={false}
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
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Register New Category</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={onSubmit} className="Pading">
                <input
                   className="form-control"
                    name="CategoryNameAbv"
                    type="hidden"
                    value="null"
                    required
                    onChange={handleChange}
                   />
                  <Row>
                      <Col className="pr-1" md="6">
                        <div>
                          <div className="editor-label">
                            <label for="CategoryName">Name</label>
                          </div>
                          <div Name="editor-field">
                            <input
                              className="form-control"
                              name="CategoryName"
                              type="text"
                              required
                              onChange={handleChange}
                            />
                            <span
                              class="field-validation-valid"
                              data-valmsg-for="CategoryName"
                              data-valmsg-replace="true"
                            ></span>
                          </div>
                        </div>
                      </Col>
                  </Row>

                  <Row>
                    <Col  md="6">
                            <div className="editor-label">
                                <label for="IsFixed">Is Fixed</label>
                                <select
                              className="form-control"
                              name="IsFixed"
                              onChange={handleChange}
                              value={cate.ElementStatus}
                              required
                            >
                              <option>Select Active</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                                </select>
                            </div>
                    </Col>

                    <Col className="pr-1" md="6">
                        <div htmlFor="test" className="Klaten-label">
                          Clients
                        </div>
                        <select
                          name="UserClientIds"
                          className="form-control"
                          onChange={handlePush}
                          required
                         >
                         <option>Select Clients </option>
                          {client.map((val, index) => (
                            <option value={val.Id} 
                         >{val.CompanyName}</option>
                          ))}
                        </select>

                    </Col>
                  </Row>

                  <Row>
                  <div className="editor-label">Constants per size</div>
                  </Row>

                  <Row>
                      <Col md="6">
                        <div className="editor-field bold Aline">
                          Size : <b>from 0 t/m 249</b>
                        </div>
                      </Col>
                      <Col md="6">
                        <div>
                        Approved limit &nbsp;<span>
                        <input
                         type="text"
                         className="input-size"
                         data-val="true"
                          data-val-number="The field Goedgekeurde limiet must be a number."
                          data-val-range="De waarde valt buiten de reeks"
                          data-val-range-max="2147483647"
                          data-val-range-min="1"
                          data-val-required="Dit veld is verplicht"
                          id="SizeCategories_0__ApprovedLimit"
                          name=""
                          // type="text"
                          value="1"
                        />
                        </span>
                        
                        </div> 
                      </Col> 
                  
                      <Col md="6">
                        <div className="editor-field bold Aline">
                        Minimum sample size in elements &nbsp;
                        <span>
                        <input
                         type="text"
                         className="input-size"
                         data-val="true"
                            data-val-number="The field Goedgekeurde limiet must be a number."
                            data-val-range="De waarde valt buiten de reeks"
                            data-val-range-max="2147483647"
                            data-val-range-min="1"
                            data-val-required="Dit veld is verplicht"
                            id="SizeCategories_0__ApprovedLimit"
                            name="SizeCategories[0].ApprovedLimit"
                            // type="text"
                            value="1"
                        />
                        </span>
                        </div>
                      </Col>
                      <Col md="6">
                        <div>
                        Maximum sample size in elements &nbsp;	
                        <span>
                        <input
                         type="number"
                         className="input-size"
                        //  type="text"
                        //  className="input-size"
                         data-val="true"
                            data-val-number="The field Goedgekeurde limiet must be a number."
                            data-val-range="De waarde valt buiten de reeks"
                            data-val-range-max="2147483647"
                            data-val-range-min="1"
                            data-val-required="Dit veld is verplicht"
                            id="SizeCategories_0__ApprovedLimit"
                            name="SizeCategories[0].ApprovedLimit"
                            // type="text"
                          
                        />
                        </span>
                        
                        </div> 
                      </Col> 
                  </Row>
                  <hr></hr>

                  <Row>
                      <Col md="6">
                        <div className="editor-field bold Aline">
                          Size : <b>from 250 to 499 </b>
                        </div>
                      </Col>
                      <Col md="6">
                        <div>
                        Approved limit &nbsp;<span>
                        <input
                         type="text"
                         className="input-size"
                         data-val="true"
                            data-val-number="The field Goedgekeurde limiet must be a number."
                            data-val-range="De waarde valt buiten de reeks"
                            data-val-range-max="2147483647"
                            data-val-range-min="1"
                            data-val-required="Dit veld is verplicht"
                            id="SizeCategories_0__ApprovedLimit"
                            name="SizeCategories[0].ApprovedLimit"
                            // type="text"
                            value="1"
                        />
                        </span>
                        
                        </div> 
                      </Col> 
                  
                      <Col md="6">
                        <div className="editor-field bold Aline">
                        Minimum sample size in elements &nbsp;
                        <span>
                        <input
                         type="text"
                         className="input-size"
                         data-val="true"
                            data-val-number="The field Goedgekeurde limiet must be a number."
                            data-val-range="De waarde valt buiten de reeks"
                            data-val-range-max="2147483647"
                            data-val-range-min="1"
                            data-val-required="Dit veld is verplicht"
                            id="SizeCategories_0__ApprovedLimit"
                            name="SizeCategories[0].ApprovedLimit"
                            // type="text"
                            value="1"
                        />
                        </span>
                        </div>
                      </Col>
                      <Col md="6">
                        <div>
                        Maximum sample size in elements &nbsp;	
                        <span>
                        <input
                         type="number"
                         className="input-size"
                        //  type="text"
                        //  className="input-size"
                            data-val-number="The field Goedgekeurde limiet must be a number."
                            data-val-range="De waarde valt buiten de reeks"
                            data-val-range-max="2147483647"
                            data-val-range-min="1"
                            data-val-required="Dit veld is verplicht"
                            id="SizeCategories_0__ApprovedLimit"
                            name="SizeCategories[0].ApprovedLimit"
                            // type="text"
                        />
                        </span>
                        
                        </div> 
                      </Col> 
                  </Row>
                  <hr></hr>

                  <Row>
                      <Col md="6">
                        <div className="editor-field bold Aline">
                          Size : <b>greater than 500 </b>
                        </div>
                      </Col>
                      <Col md="6">
                        <div>
                        Approved limit &nbsp;<span>
                        <input
                         type="text"
                         className="input-size"
                         data-val="true"
                            data-val-number="The field Goedgekeurde limiet must be a number."
                            data-val-range="De waarde valt buiten de reeks"
                            data-val-range-max="2147483647"
                            data-val-range-min="1"
                            data-val-required="Dit veld is verplicht"
                            id="SizeCategories_0__ApprovedLimit"
                            name="SizeCategories[0].ApprovedLimit"
                            // type="text"
                            value="1"
                        />
                        </span>
                        
                        </div> 
                      </Col> 
                  
                      <Col md="6">
                        <div className="editor-field bold Aline">
                        Minimum sample size in elements &nbsp;
                        <span>
                        <input
                         type="text"
                         className="input-size"
                         data-val="true"
                            data-val-number="The field Goedgekeurde limiet must be a number."
                            data-val-range="De waarde valt buiten de reeks"
                            data-val-range-max="2147483647"
                            data-val-range-min="1"
                            data-val-required="Dit veld is verplicht"
                            id="SizeCategories_0__ApprovedLimit"
                            name="SizeCategories[0].ApprovedLimit"
                            // type="text"
                            value="1"
                        />
                        </span>
                        </div>
                      </Col>
                      <Col md="6">
                        <div>
                          Maximum sample size in elements &nbsp;	
                        <span>
                        <input
                         type="number"
                         className="input-size"
                        //  type="text"
                        //  className="input-size"
                         data-val-number="The field Goedgekeurde limiet must be a number."
                            data-val-range="De waarde valt buiten de reeks"
                            data-val-range-max="2147483647"
                            data-val-range-min="1"
                            data-val-required="Dit veld is verplicht"
                            id="SizeCategories_0__ApprovedLimit"
                            name="SizeCategories[0].ApprovedLimit"
                            // type="text"
                        />
                        </span>
                        
                        </div> 
                      </Col> 
                  </Row>
                  <hr></hr>
                
                  <div>
                    <Button className="btn-round" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Category_create;
