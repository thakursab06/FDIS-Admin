import React from 'react'
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

export default function home() {
    return (
        <>
           
          
          <div className="content">
            <Row>
             
              <Col md="12">
                <Card>
                  <CardBody>
                  <img src={require("../../image/img.png").default}  style={{height:"500px"}}/>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
         
        </>
      );
}
