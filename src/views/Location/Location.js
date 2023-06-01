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
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Audit() {
  const history = useHistory();
  const [user, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);

  //Then inside your component
  const { ucId } = useParams();
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}/userClient`)
      .then((res) => {
        console.log(res)
        const response = res.data.data;
        console.log(response)
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  
  const locationFile = (username,ID) => {
    history.push(`/Edit_Location/${ID}/username=${username}`);
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h3">
                Client
              </CardTitle>
            </CardHeader>
               <div className="row"></div>
                 <Table responsive className="">
                    <thead className="text-primary">
                    <tr>
                    <th scope="col">User name</th>
                      <th scope="col">Bedrijf</th>
                      <th scope="col">Contact Person</th>
                      <th scope="col">Active</th>
                      <th scope="col">Industry</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                {
                  user? <tbody>
                    {/* -------------------------Daynamic------------------------ */}
                    {user.map((val, index) => (
                        <tr key={index}>
                        <td>{val.UserName}</td>
                          <td scope="col">{val.CompanyName}</td>
                          <td scope="col">{val.ContactPerson}</td>
                          <td scope="col">{val.IsActive ?"Yes" : "No"}</td>
                          <td scope="col">{val.BranchName}</td>
                          {" "}
                          <td>
                            <i
                              className="fas fa-edit icon-edit"
                              onClick={() => locationFile(val.UserName,val.Id)} 
                              ></i>
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
                          //onPageChange={handlePageClick}
                          postsPerPage={postsPerPage}
                          pageCount={user.length}
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
export default Audit;
