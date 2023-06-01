import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import LoaderComp from "../../Loader/LoaderComp";
import Axios from "axios";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import config from "../../config";

const EditModal = ({ lgEditShow, setLgEditShow, id }) => {
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [client, setclient] = useState([]);
  const [array, setArray] = useState([]);

  const handlePush = (e) => {
    e.preventDefault();
    const data = array.push(e.target.value);
    setArray(data);
    console.log(data);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const [item, setItem] = useState({
    ElementTypeValue: "",
    AreaDescription: array,
  });

  const formData = {
    ElementTypeValue: item?.ElementTypeValue,
    AreaDescription: item?.AreaDescription,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        Axios.get(`${config.API_URL}/elementType/${id}`).then((response) => {
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
      await Axios.get(`${config.API_URL}/areaDesc?limit=1000&search`)
        .then((res) => {
          const response = res.data.data.rows;
          setclient(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    clientData();
    fetchData();
  }, [id]);

  //Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(async () => {
        await Axios.patch(
          `${config.API_URL}//elementType/${id}`,
          formData
        ).then((response) => {
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
      <Modal
        className="modal"
        show={lgEditShow}
        onHide={() => setLgEditShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Failure
          show={failure}
          variant={"danger"}
          message={"OOoops!!..something Went Wrong"}
        />
        <Modal.Header className="create">Edit</Modal.Header>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Modal.Body>
            <Container className="d-flex-grow">
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label> Element Value</label>
                  <Container className="measure_conatiner">
                    <input
                      className="form-control"
                      placeholder="Name"
                      type="text"
                      name="ElementTypeValue"
                      onChange={handleChange}
                      value={item?.ElementTypeValue}
                      required
                    />
                  </Container>
                </Col>
              </Row>
            </Container>

            <Container>
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label>Area</label>
                  {item?.AreaDescription && (
                    <select
                      className="form-control"
                      placeholder="Country"
                      type="text"
                      name="AreaDescription"
                      onChange={handlePush}
                      value={item?.AreaDescription}
                      required
                    >
                      {client
                        .map((d) => <option value={d.Id}>{d.Name}</option>)
                        .concat(
                          item?.AreaDescription.map((val) => (
                            <option selected="selected" value={val.Id}>
                              {val.Name}
                            </option>
                          ))
                        )}
                    </select>
                  )}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className="bottum">
            <button
              className="model_button"
              type="button"
              onClick={() => setLgEditShow(false)}
            >
              Cancel
            </button>
            <button
              className="model_button"
              type="submit"
              onClick={() => setLgEditShow(false)}
            >
              {" "}
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
