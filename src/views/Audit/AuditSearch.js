import React, { useState, useEffect } from "react";
import axios from "axios";
import "assets/css/login.css";
import config from '../../config'
import LoaderComp from "../../Loader/LoaderComp";
import ReactPaginate from "react-paginate";
import AsyncSelect from 'react-select/async'
import moment from 'moment'
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

function AuditSearch() {
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [locationSelected,setLocationSelected] = useState({});
  const [dateSelected,setDateSelected] = useState('');
  const [defaultLocationOption, setDefaultLocationOption] = useState([]);

  //Then inside your component
  const { ucId } = useParams();
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}/audit`, {
      params: {
        
        ucId: ucId,
        page: currentPage,
        limit: postsPerPage,
        date:dateSelected,
        locationId: locationSelected?.value,
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
    loadDefaultLocaiton();
    fetchData();
  }, []);

  const handlePageClick = (event) => {
    const newOffset = ((event.selected + 1));
    setCurrentPage(newOffset);
    fetchData({ page: newOffset })
  };

  const loadOptions = async (inputValue, callback) => {
    await axios.get(`${config.API_URL}/location`, {
      params: {
        page: currentPage,
        limit: postsPerPage,
        search: inputValue
      }
    })
      .then((res) => {
        const response = res.data.data.rows;
        const opt = response.map((item) => ({ label: item?.Name, value: item?.Id }))
        callback(opt)
      })
      .catch((error) => {
        callback([])
      });
  }
  const loadDefaultLocaiton = async () => {
    try {
      const result = await axios.get(`${config.API_URL}/location`, {
        params: {
          page: currentPage,
          limit: postsPerPage
        }
      })
      const response = result.data.data.rows
      if (response) {
        setDefaultLocationOption(response.map((item) => ({ label: item?.Name, value: item?.Id })))
      }
    } catch (error) {

    }

  }
  const handleLocationChange = (options) => {
    setLocationSelected(options)
  }

  const onSearch = () => {
    fetchData({ page: 1, locationId: locationSelected?.value, date: dateSelected })
  }
  
  const onClearSearch  = () =>{
    setDateSelected('')
    setLocationSelected({})
    fetchData({ page: 1, locationId: '', date: ''})  
  }

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h3">
                Audits. Clients:
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="d-flex bd-highlight mb-3 ">
                <Link to="/admin/create-audits">
                  {" "}
                  <button type="button" className="btn btn-primary m-2">
                    Create
                  </button>{" "}
                </Link>
                <button type="button" className="btn btn-primary m-2">
                  Remove all Audits
                </button>
                <Link to="/admin/dashboard">
                  {" "}
                  <button className="btn btn-danger btn-round m-2">
                    Back To Audits
                  </button>
                </Link>
              </div>
              <div className="d-flex">
                <div className="col-lg-6 col-xl-6 col-sm-12 col-md-4">
                    <b>Location</b>
                     <AsyncSelect
                        // isMulti
                        // isDisabled={isDisabled}
                        className="react-select"
                        instanceId={'select-user'}
                        placeholder="Location"
                        value={locationSelected}
                        cacheOptions
                        defaultOptions={defaultLocationOption}
                        loadOptions={loadOptions}
                        onChange={handleLocationChange}
                        />

                </div>
                <div className="col-lg-4 col-xl-4 col-sm-6 col-md-4">
                      <b>Date</b>
                      <br/>
                        <input
                        className="form-control input-lg"
                        data-datepicker="True"
                        id="strDate"
                        name="strDate"
                        type="Date"
                        onChange={(event) => setDateSelected(event.target.value)}
                        value={dateSelected}
                        style={{width:"200px",
                        height:"40px"}}
                      />
                </div>
                <div className="col-lg-2 col-xl-2 col-sm-6 col-md-4" style={{marginTop:"-10px"}}>
                      <b><a onClick={onClearSearch} id="clear-audits-filters" class="clear">(Clear filters)</a></b>
                      <br/>
                      <input  type="submit" onClick={onSearch} value="Search" className="btn btn-primary"/>
                </div>
              </div>
              <div className="row"></div>
              <Table responsive className="">
                <thead className="text-primary">
                  <tr>
                    <th>Code</th>
                    <th>Actief</th>
                    <th>Branch</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {
                  data? <tbody>
                    {/* -------------------------Daynamic------------------------ */}
                    {data.map((val, index) => (
                      <tr key={index}>
                        <td scope="col">{val.AuditCode}</td>
                        <td scope="col">{val.IsActive ? 'Yes' : 'No'}</td>
                        <td scope="col">{val.UserClient?.Branch?.BranchName}</td>
                        <td scope="col">{val.Location?.Name}</td>
                        <td scope="col">{moment(val.Date).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td scope="col">{val.Activate ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                    <Row>
                      <Container
                        className="col-lg-8 col-xl-8 col-sm-8 col-md-8"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "grid",
                          marginLeft: "100%",
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
                      }}>
                      <LoaderComp type={"Circles"} height={100} color={"#0e2434"} />
                    </Container>
                }
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default AuditSearch;
