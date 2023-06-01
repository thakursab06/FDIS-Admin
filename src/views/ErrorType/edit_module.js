import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import LoaderComp from "../../Loader/LoaderComp";
import Axios from "axios";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import config from "../../config";
const EditModal = ({ lgEditShow, setLgEditShow, id }) => {
  const [item, setItem] = useState({
    ErrorTypeValue: "",
    ErrorCategoryId: "",
    ErrorKindId: "",
  });
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [kind, setkind] = useState([]);
  const [client, setclient] = useState([]);
  const [category, setcategory] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const formData = {
    ErrorTypeValue: item?.ErrorTypeValue,
    ErrorCategoryId: item?.ErrorCategoryId,
    ErrorKindId: item?.ErrorKindId,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        Axios.get(`${config.API_URL}//errorType/${id}`).then((response) => {
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
      await Axios.get(`${config.API_URL}//errorKind`)
        .then((res) => {
          const response = res.data.data.rows;
          console.log(response);
          setclient(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    clientData();

    const categoryData = async () => {
      await Axios.get(`${config.API_URL}//errorCategory`)
        .then((res) => {
          const response = res.data.data.rows;
          console.log(response);
          setcategory(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    categoryData();

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(async () => {
        await Axios.patch(`${config.API_URL}//errorType/${id}`, formData).then(
          (response) => {
            if (response.status === 200) {
              setLoading(false);
              setSuccessfull(true);
            }
          }
        );
        setTimeout(() => {
          setSuccessfull(false);
          window.location.reload();
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
                  <label>Value</label>
                  <Container className="measure_conatiner">
                    <input
                      className="form-control"
                      placeholder="Floor Name"
                      type="text"
                      name="ErrorTypeValue"
                      onChange={handleChange}
                      value={item?.ErrorTypeValue}
                      required
                    />
                  </Container>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label>Error category</label>
                  <Container className="measure_conatiner">
                    <select
                      className="form-control"
                      placeholder="Error Kind"
                      type="text"
                      name="ErrorKindId"
                      onChange={handleChange}
                      value={item?.ErrorCategoryId}
                      required
                    >
                      {category.map((val, index) => (
                        <option value={val.Id}>{val.Name}</option>
                      ))}
                    </select>
                  </Container>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <label>Error kind</label>
                  <Container className="measure_conatiner">
                    <select
                      className="form-control"
                      placeholder="Error Kind"
                      type="text"
                      name="ErrorKindId"
                      onChange={handleChange}
                      value={item?.ErrorKindId}
                      required
                    >
                      {client.map((val, index) => (
                        <option value={val.Id}>{val.Name}</option>
                      ))}
                    </select>
                  </Container>
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
