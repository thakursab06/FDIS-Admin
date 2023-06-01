import React, { useState, useEffect } from "react";
import "../../assets/css/pdf.css";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import axios from "axios";
import { useForm } from "react-hook-form";
import Moment from 'react-moment';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Container
} from "reactstrap";
import { useHistory } from "react-router-dom";
import {Link,useParams } from "react-router-dom";
import config from '../../config'
function Category_create() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const history = useHistory();
  
  //get
  const fetchData = async () => {
    await axios.get(
        `${config.API_URL}//Report/${id}`
      )
      .then((response) => {
        console.log(response);
        const values = response.data.data;
        console.log(values);
        setItem(() => {
         setItem(values);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {  
    fetchData();
  }, []);
  

  //print pdf
  const print = () => {
    window.print();
  };

  
  const ControlDate = item.map((val)=>{
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date(val.Date);
    let dt = d.getDate()
    let year = d.getFullYear()
    if (dt < 10) {
       dt = '0' + dt
    }
    var monthName=months[d.getMonth()];
    const CompleteDate=dt+" "+ monthName +" "+ year
    return CompleteDate;
  })

  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card className="card-user">
              <CardHeader>
              <Row>
                <Col className="pr-1" md="12">
                <img src={require("../../image/img.png").default} style={{marginLeft:"100px"}}/>
                <h3 className="col-xl-6 col-lg-6 col-md-6 col-sm-6 Background"> Reporting VSR-IMPO Quality Measurement</h3>
                </Col>
              </Row>  
              </CardHeader>
              <CardBody>
              {item.map((val,index)=>
                 <Container className="col-xl-6 col-lg-6 col-md-6 col-sm-6 center" >
                  <Row>
                    <Col className="col-xl-4 col-lg-3 col-md-3 col-sm-3">
                      <h6>Organization</h6>
                      </Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
                      -
                    </Col>
                      <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                       <h6>{val.CompanyName?val.CompanyName:"No Entry Available"}</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-4 col-lg-3 col-md-3 col-sm-3">Contact person</Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                     {val.ContactPerson?val.ContactPerson:"No Entry Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-4 col-lg-3 col-md-3 col-sm-3">Project</Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                      {val.Location?val.Location:"No Entry Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-4 col-lg-3 col-md-3 col-sm-3">Report number</Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                    {val.AuditCode?val.AuditCode:"No Entery Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-4 col-lg-3 col-md-3 col-sm-3">Date</Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
                    <Col id="ControlDate"  className="col-xl-7 col-lg-7 col-md-7 col-sm-7" >
                      {ControlDate}
                    </Col>
                  </Row> 
                   <Row>
                    <Col className="col-xl-4 col-lg-3 col-md-3 col-sm-3">Time control</Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                        {val.Date.toString().slice(11,19)}
                    </Col>
                  </Row> 
                  <Row>
                    <Col className="col-xl-6 col-lg-3 col-md-3 col-sm-3"> <h5>Oldemarkt</h5></Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-4 col-lg-4 col-md-3 col-sm-3">Aduit carried out by</Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                      {val.note}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-4 col-lg-4 col-md-3 col-sm-3">Present client</Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                      {val.PresentClient?val.PresentClient:"No Entry Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-4 col-lg-4 col-md-3 col-sm-3"></Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1"></Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                      <p> <h6>ICCA Advies B.V</h6>  
                      <h6>Eikkiop 15</h6>
                      <h6>8375 Oldemarkt</h6> </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-5 col-lg-4 col-md-3 col-sm-3">
                      <Button id="printPageButton" className="btn-round" color="primary" type="submit" onClick={print}> Print </Button>
                    </Col>
                    <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1"> {" "}</Col>
                    <Col className="col-xl-6 col-lg-7 col-md-7 col-sm-7">
                      <Link to={"/admin/reports"}>
                        <Button id="printPageButton" className="btn-round" color="danger" type="submit">Cancle</Button>
                      </Link>
                    </Col>

                  </Row>
                  </Container> 
               )}   
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>   
    </> 
  );
}
export default Category_create;
