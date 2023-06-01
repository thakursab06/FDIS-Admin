import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import Axios from "axios";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import config from '../../config'
const EditModal = ({ lgEditShow, setLgEditShow, id , user }) => {
  console.log(id);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false); 
  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const [item, setItem] = useState({
    Password: "",
    conf_pwd:"",
  });

  //Update
  const handleSubmit = async (e) => {
    e.preventDefault();
      if(item.Password == item.conf_pwd)
      {
          await Axios.patch(`${config.API_URL}/SuperAdmin/${id}`,item.Password).then((response) => {
            if (response.status === 200) {
              console.log(response)
              setSuccessfull(true);
            }
          });
      }
      else
      {
        setFailure(true);
      }
     setTimeout(() => {
      setSuccessfull(false);
    }, 3000);
  };

  return (
    <>
       
    <Modal
      className="modal"
      show={lgEditShow}
      onHide={() => setLgEditShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
        <Success
          show={successfull}
          variant={"success"}
          message={" Password Changed Successfully"}
        />
        <Failure
          show={failure}
          variant={"danger"}
          message={"OOoops!!..something Went Wrong"}
        />
      <Modal.Header className="create">
      Change Password
      </Modal.Header>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Modal.Body>
        <Container className="d-flex-grow">
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label>User Name : <span style={{color: "blue"}}>{user}</span> </label>
                </Col>
                
              </Row>
            </Container>
            <Container className="d-flex-grow">
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label>New Password</label>
                  <Container className="measure_conatiner">
                   <input
                      className="form-control"
                      placeholder="New Password"
                      type="password"
                      name="Password"
                      onChange={handleChange}
                      required
                    />
                  </Container>
                </Col>
                
              </Row>
            </Container>

            <Container>
              <Row className="mb-3">
              <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label>Confirm Password</label>
                  <Container className="measure_conatiner">
                   <input
                      className="form-control"
                      placeholder="Confirm Name"
                      type="password"
                      name="conf_pwd"
                      onChange={handleChange}
                      required
                    />
                  </Container>
                </Col>
              </Row>
            </Container>
            
        </Modal.Body>
        <Modal.Footer className="bottum">
            <button 
             className="model_button"
             onClick={() => setLgEditShow(false)}
            >Cancel</button>
            <button
             className="model_button" 
             type="submit" 
             onClick={() => setLgEditShow(false)}
             > Update</button>
          </Modal.Footer>    
            
      </form>
    </Modal>
    </>
  );
  
};

export default EditModal;
