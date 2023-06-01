import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import LoaderComp from "../../Loader/LoaderComp";
import Axios from "axios";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import config from "../../config";

const EditModal = ({ lgEditShow, setLgEditShow, id }) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [client, setclient] = useState([]);
  const [array, setArray] = useState([]);

  // Events
  const handleSelect = (e) => {
    const data = e.target.value;
    setArray(data);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  //GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        Axios.get(`${config.API_URL}//areaDesc/${id}`).then((response) => {
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
      await Axios.get(`${config.API_URL}//category?limit=1000&search`)
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

  const [item, setItem] = useState({
    Name: "",
    Abbreviation: "",
    Active: "",
    CategoryIds: [],
  });

  const formData = {
    Name: item?.Name,
    Abbreviation: item?.Abbreviation,
    Active: item?.Active == true ? true : false,
    CategoryIds: [array],
  };
  //console.log(formData);

  //Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.patch(`${config.API_URL}//areaDesc/${id}`, formData)
      .then((response) => {
        if (response) {
          console.log(response);
          setSuccess(true);
        } else {
          alert(response);
          setFailure(true);
        }
      })
      .catch((err) => {
        console.log(`this is an catch err`, err);
      });
    setTimeout(() => {
      setSuccess(false);
      window.location.reload();
    }, 3000);
  };

  return (
    <>
      <Success
        show={success}
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
            <Row>
              <Col md="12">
                <div>Name</div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  name="Name"
                  value={item?.Name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div>Abbreviation</div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Abbreviation"
                  id="Abbre"
                  required
                  name="Abbreviation"
                  onChange={handleChange}
                  value={item?.Abbreviation}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                Active
                <select
                  className="form-control"
                  data-val-required="true"
                  name="Active"
                  required
                  onChange={handleChange}
                >
                  <option>{item?.Active === true ? "Yes" : "No"}</option>
                  <option>{item?.Active === false ? "Yes" : "No"}</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <label htmlFor="test" className="Klaten-label">
                  Categories
                </label>
                {item?.Category && (
                  <select
                    className="form-control"
                    placeholder="Country"
                    type="text"
                    name="CategoryIds"
                    onChange={handleSelect}
                    required
                  >
                    {item?.Category.map((d, index1) => (
                      <option selected="selected" key={index1} value={d.ID}>
                        {d.CategoryName}
                      </option>
                    )).concat(
                      client.map((val, index2) => (
                        <option key={index2} value={val.ID}>
                          {val.CategoryName}
                        </option>
                      ))
                    )}
                  </select>
                )}
              </Col>
            </Row>
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
