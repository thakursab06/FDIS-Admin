import React from "react";
import "assets/css/login.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Row,
  Col,
} from "reactstrap";

function Error_type() {
  
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Select Error Type</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <button className="btn button">
                          {/* onClick={ErrorPage} */}
                          Error Types
                        </button>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <button className="btn button">
                          Error category list
                          {/* onClick={CategorieEdit} */}
                        </button>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <button className="btn button">
                          Error kind list
                          {/* onClick={Errorkindlist} */}
                        </button>
                      </FormGroup>
                    </Col>
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

export default Error_type;
