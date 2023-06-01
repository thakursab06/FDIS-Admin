import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import LoaderComp from "../../Loader/LoaderComp";
import Axios from "axios";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import config from "../../config";
const EditModal = ({ lgEditShow, setLgEditShow, id }) => {
  const [item, setItem] = useState({
    Name: "",
  });
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const formData = {
    Name: item?.Name,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        Axios.get(`${config.API_URL}//errorKind/${id}`).then((response) => {
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
    fetchData();
  }, [id]);

  //Reload page
  const reload = () => window.location.reload();

  console.log(formData);

  //Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(async () => {
        await Axios.patch(`${config.API_URL}//errorKind/${id}`, formData).then(
          (response) => {
            if (response.status === 200) {
              setLoading(false);
              setSuccessfull(true);
            }
          }
        );
        setTimeout(() => {
          setSuccessfull(false);
          reload();
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
                  <label>Floor Name</label>
                  <Container className="measure_conatiner">
                    <input
                      placeholder="Name"
                      type="text"
                      name="Name"
                      onChange={handleChange}
                      value={item?.Name}
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
