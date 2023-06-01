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

function Audit() {
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);

  //Then inside your component
  const { ucId } = useParams();
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}/audit/join`, {
      params: {
        page: currentPage,
        limit: postsPerPage,
        ...query
      }
    })
      .then((res) => {
        const response = res.data.data.rows;
        console.log(response)
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


  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h3">
                Audits
              </CardTitle>
            </CardHeader>
               <div className="row"></div>
                 <Table responsive className="">
                    <thead className="text-primary">
                    <tr>
                      <th>Business</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Industry</th>
                      <th scope="col">Audits</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  { data ? (
                    <tbody>
                     {data.map((val, index) => (
                      <tr key={index}>
                        <td>{val.CompanyName}</td>
                              <td>{val.ContactPerson}</td>
                              <td>{val.Branch == null?"No Data PResent":val.Branch.BranchName}</td>
                              <td>{val.AuditCount}</td>
                              <td>
                                <Link to={`/admin/auditsearch/${val.Id}`} className="fas fa-search"></Link>
                              </td>
                      </tr>
                     ))}
                     <tr>
                      <th colSpan="10">
                        <Container
                          className="col-lg-8 col-xl-8 col-sm-8 col-md-8"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "grid",
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
                          postsPerPage={postsPerPage}
                          pageCount={data.length}
                          previousLabel="pre "
                          renderOnZeroPageCount={null}
                        />
                        </Container>
                      </th>    
                     </tr>
                    </tbody>
                    ) : 
                    (
                     <Container
                       style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "grid",
                        marginLeft: "100%",
                       }}>
                      <LoaderComp
                        type={"Circles"}
                        height={100}
                        color={"#0e2434"}
                      />
                    </Container>
                  )}
                  
              </Table>
            
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Audit;
