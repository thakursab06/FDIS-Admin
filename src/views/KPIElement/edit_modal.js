import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import LoaderComp from "../../Loader/LoaderComp";
import Axios from "axios";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import config from '../../config';

const EditModal = ({ lgEditShow, setLgEditShow, id }) => {
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [client,setclient]=useState([]);
  
  const [item, setItem] = useState({
    ElementLabel: "",
    ElementStatus: "",
    UserClientIds:"",
  });
 
  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const formData = {
    ElementLabel: item?.ElementLabel,
    ElementStatus: item?.ElementStatus == "yes" ? true : false,
    UserClientIds: item?.UserClientIds,
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        Axios.get(`${config.API_URL}//kpiElement/${id}`)
        .then((response) => {
          const values = response.data.data;
          console.log(values);
          setItem(() => {
            setItem(values);
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    const clientData = async () => {
      await Axios
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
    fetchData();
  }, [id]);

  //update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(async () => {
        await Axios.patch(`${config.API_URL}//kpiElement/${id}`,formData).then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setSuccessfull(true);
          }
        });
        setTimeout(() => {
          setSuccessfull(false);
          window.location.reload()
        }, 3000);
      });
    } catch (error) {
      setLoading(false);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
  };

  return (
    <>
       <Success
          show={successfull}
          variant={"success"}
          message={" Updated Successfully"}
        />
        <Failure
          show={failure}
          variant={"danger"}
          message={"OOoops!!..something Went Wrong"}
        />
    <Modal
      className="modal"
      show={lgEditShow}
      onHide={() => setLgEditShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >

      <Modal.Header className="create">
       Edit
      </Modal.Header>
      <form onSubmit={handleSubmit} autoComplete="off">
      <Modal.Body>
            <Container className="d-flex-grow">
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label>Element Name</label>
                  <Container className="measure_conatiner">
                   <input
                      className="form-control"
                      placeholder="Element Name"
                      type="text"
                      name="ElementLabel"
                      value={item?.ElementLabel}
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
                  <label>Active</label>
                  <Container className="measure_conatiner">
                    <select
                    className="form-control"
                    name="ElementStatus"
                    value={item?.ElementStatus}
                    onChange={handleChange}
                    required
                    >
                    <option className="defaultSelect">{item?.ElementStatus == false ?"No":"Yes" }</option>
                    <option>{item?.ElementStatus == true ?"No":"Yes" }</option>
                    
                    </select>
                  </Container>
                </Col>
                
              </Row>
            </Container>
            <Container>
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label>Customers</label>
                  <Container className="measure_conatiner">
                  <select
                    name="UserClientIds"
                    className="form-control"
                    value={item?.UserClientIds}
                    onChange={handleChange}
                    required
                   >
                   
                   {client.map((val, index) => (
                      <option value={item?.UserClientIds}>{val.CompanyName}</option>
                    ))}
                  </select>
                    
                  </Container>
                </Col>
                
              </Row>
            </Container>
        </Modal.Body>
          <Modal.Footer className="bottum">
            <button 
             type="button"
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
