import React, { useState, useEffect } from "react";
import axios from "axios";
import "assets/css/login.css";
import config from '../../config'
import LoaderComp from "../../Loader/LoaderComp";
import ReactPaginate from "react-paginate";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Container,
} from "reactstrap";
import { Link, useParams,useHistory } from "react-router-dom";
import Success from "../../Alert/Success";
import Failure from "../../Alert/Fail";

function Categories() {
  const history = useHistory();
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [locationSelected,setLocationSelected] = useState({});
  const [dateSelected,setDateSelected] = useState('');
  const [defaultLocationOption, setDefaultLocationOption] = useState([]);

  //Then inside your component
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}//category`, {
      params: {
        page: currentPage,
        limit: postsPerPage,
        ...query
      }
    })
      .then((res) => {
        const response = res.data.data.rows;
        setUsers(response);
        setTotal(res.data.data.count)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handlePageClick = (event) => {
    const newOffset = ((event.selected + 1));
    setCurrentPage(newOffset);
    fetchData({ page: newOffset })
  };

  // Delete  Data
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?");
    if(DELETE) {
      setTimeout(async () => {
        await axios.delete(`${config.API_URL}//category/${id}`)
        .then((response) => {
          if (response) {
            setSuccessfull(true);
          }
          else{
            console.log(response)
          }
        });
        setTimeout(() => {
          setSuccessfull(false);
        }, 3000);
      });
    }
    else{
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }  
  }

  //Update
  const Category_eddit = (ID) => {
    history.push(`/category_eddit/${ID}`);
  };


  return (
    <div className="content">
      <Success
        show={successfull}
        variant={"success"}
        message={"Deleted Successfully"}
      />
      <Failure
        show={failure}
        variant={"danger"}
        message={"something Went Wrong"}
      />
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h3">
              Categories
              </CardTitle>
            </CardHeader>
               <div className="row"></div>
                 <Table responsive className="">
                    <thead className="text-primary">
                    <tr>
                    <th scope="col"> S.No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Fixed value</th>
                      <th scope="col"> Action </th>
                    </tr>
                  </thead>
                {
                  data? <tbody>
                    {/* -------------------------Daynamic------------------------ */}
                    {data.map((val, index) => (
                        <tr key={index}>
                          <td scope="col">{index + 1}</td>
                          <td scope="col">{val.CategoryName}</td>
                          <td scope="col"> {val.IsFixed ? "Yes" : "No"}</td>
                          <td>
                          
                            <i
                              className="fas fa-edit icon-edit"
                              onClick={() => Category_eddit(val.ID)}
                            ></i>
                        
                            {" "}
                            <i
                              className="fas fa-trash icon-delete"
                              onClick={() => onDelete(val.ID)}
                            ></i>{" "}
                          </td>
                        </tr>
                    ))}
                    <Row>
                      <Container
                        className="col-lg-8 col-xl-8 col-sm-8 col-md-8"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "grid",
                          marginLeft:"50%" ,
                        }}
                      >
                        <ReactPaginate
                          containerClassName="pagination"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-link"
                          nextClassName="page-link"
                          activeClassName="active"
                          breakLabel="..."
                          nextLabel=" next"
                          onPageChange={handlePageClick}
                          pageCount={total / postsPerPage}
                          previousLabel="pre "
                          renderOnZeroPageCount={null}
                        />
                      </Container>
                    </Row>
                  </tbody>
                    :
                    <Container
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "grid",
                        marginLeft: "100%",
                      }}
                    >
                      <LoaderComp
                        type={"Circles"}
                        height={100}
                        color={"#0e2434"}
                      />
                    </Container>
                }
              </Table>
            
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Categories;
