import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import LoaderComp from "../../Loader/LoaderComp";
// import Axios from "axios";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";
import config from '../../config'
import axios from "axios";



const EditModal = ({ lgEditShow, setLgEditShow, id }) => {
    const [loading, setLoading] = useState(false);
    const [successfull, setSuccessfull] = useState(false);
    const [failure, setFailure] = useState(false);
    // const reload= window.location.reload();
    const [item, setItem] = useState({
      Name:"",
      Size: "",
      ClientId: "",
      Region:"",
      City:"",
      Address:"",
      ContactPerson:"",
      Activate:"",
      Email:"",
    });

    const handleChange = (e) => {
      e.preventDefault();
      setItem({ ...item, [e.target.name]: e.target.value });
    };

  useEffect(() => {
    const fetchData = async () => {
        await axios.get(
            `${config.API_URL}/location/${id}`
          )
          .then((response) => {
            const values = response.data.data;
            setItem(() => {
             setItem(values);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };
      ;
    fetchData();
  },[id]);

  

  const formData = {
    Name:item?.Name,
    Size:item?.Size,
    ClientId:item?.ClientId,
    Region:item?.Region,
    City:item?.City,
    Address:item?.Address,
    ContactPerson:item?.ContactPerson,
    Activate:item?.Activate== "yes" ? true : false,
    Email:item?.Email,
  };
  
  console.log(formData);
  // console.log(id);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLgEditShow(false);
    setLoading(true);
    try {
      setTimeout(async () => {
        await axios.patch(`${config.API_URL}/location/${id}`,formData).then((response) => {
          if (response) {
            console.log("Data Updated");
            setLoading(false);
            setSuccessfull(true);
          }
        });
        setTimeout(() => {
          setSuccessfull(false);
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      setLoading(false);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
   
    // await axios
    //   .patch(`${config.API_URL}//location/${id}`, formData)
    //   .then((response) => {
    //     if (response) {
          
    //       console.log("Record Updated")
    //       setSuccessfull(true);
          
    //     }
    //     else{
    //       alert(response)
    //       setFailure(true);
    //     }
    //   }).catch(err=>{
    //     console.log(`this is an catch err`,err)
    //   })
    //   setTimeout(() => {
    //     setSuccessfull(false);
    //     setLgEditShow(false);
        
    //   }, 1000); 
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
        <Col md="12">
              <input
              type="hidden"
              className="form-control"
              name="ClientId"
              value={item?.ClientId}
              onChange={handleChange}
              required  
            />
          </Col>
          <Col md="12">
            <label>Name</label>
            <input
                      className="form-control"
                      placeholder="Element Name"
                      type="text"
                      name="Name"
                      value={item?.Name}
                      onChange={handleChange}
                      required
                    />
          </Col>

          <Col md="12">
          <div>
            <div>
              Adres
              <input
              type="text"
              className="form-control"
              name="Address"
              value={item?.Address}
              onChange={handleChange}
              required  
            />   
            </div>
          </div>
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
              Stad
            </label>
            <input
              type="text"
              className="form-control"
              name="City"
              value={item?.City}
              onChange={handleChange}
              required  
            />   
            
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
            Gebied
            </label>
            <input
              type="text"
              className="form-control"
              name="Region"
              value={item?.Region}
              onChange={handleChange}
              required  
            />   
            
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
            Size 
            </label>
            <input
              type="number"
              className="form-control"
              name="Size"
              value={item?.Size}
              onChange={handleChange}
              required  
            />   
            
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
            Contact person 
            </label>
            <input
              type="text"
              className="form-control"
              name="ContactPerson"
              value={item?.ContactPerson}

              onChange={handleChange}
              required  
            />   
            
          </Col>

          <Col md="12">
            <label htmlFor="test" className="Klaten-label">
            Email address 
            </label>
            <input
              type="email"
              className="form-control"
              name="Email"
              value={item?.Email==null?"No Email Available" :item?.Email}
              onChange={handleChange}
           
            />   
            
          </Col>
         
          <Col md="12">
          <div>
            <div>
              Active
              <select
              className="form-control"
              name="Activate"
              value={item?.Activate}
              onChange={handleChange}
              required
              >
              <option value="no">{item?.Activate == false ?"Deactive":"Active" }</option>
              <option value="yes">{item?.Activate == true ?"Deactive":"Active" }</option>
              </select>
              
            </div>
          </div>
          </Col>
          
        </Modal.Body>
        <Modal.Footer className="bottum">
            <button 
             className="model_button"
             type="button"
             onClick={() => setLgEditShow(false)}
            >Cancel</button>

            <button
             className="model_button" 
             type="submit" 
             > Update</button>
          </Modal.Footer>    
            
      </form>
    </Modal>
    </>
  );
  
};

export default EditModal;
