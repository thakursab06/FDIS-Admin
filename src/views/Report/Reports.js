import React, { useState, useEffect } from "react";
import axios from "axios";
import "assets/css/login.css";
import config from '../../config'
import LoaderComp from "../../Loader/LoaderComp";
import ReactPaginate from "react-paginate";
import AsyncSelect from 'react-select/async';
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Container,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";

function Reports() {
  const [data, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postsPerPage] = useState(10);
  const [locationSelected,setLocationSelected] = useState({});
  const [clientSelected,setClientSelected] = useState({});
  const [auditCodeSelected,setauditCodeSelected] = useState("");
  const [dateSelected,setDateSelected] = useState('');
  const [defaultLocationOption, setDefaultLocationOption] = useState([]);
  const [defaultClientOption, setDefaultClientOption] = useState([]);
  // const [client, setclient] = useState([]);
  const history = useHistory();

  //Then inside your component
  const { ucId } = useParams();
  const fetchData = async (query) => {
    await axios.get(`${config.API_URL}//audit`, {
      params: {
        ucId: clientSelected?.value,
        page: currentPage,
        limit: postsPerPage,
        auditcode:auditCodeSelected,
        // client:clientSelected?.value,
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
    loadDefaultClient();
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
    setLocationSelected(options);
  }

  // const clientData = async () => {
  //   await axios
  //     .get(
  //       `${config.API_URL}//userClient`
  //     )
  //     .then((res) => {
  //       const response = res.data.data;
  //       const resId =res.data.data.Id
  //       setclient(response);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const loadClientOptions = async (inputValue, callback) => {
    await axios.get(`${config.API_URL}/userClient`, {
      params: {
        page: currentPage,
        limit: postsPerPage,
        search: inputValue
      }
    })
      .then((res) => {
        const response = res.data.data;
        const opt = response.map((item) => ({ label: item?.UserName, value: item?.Id }))
        callback(opt)
      })
      .catch((error) => {
        callback([])
      });
  }
  const loadDefaultClient = async () => {
    try {
      const result = await axios.get(`${config.API_URL}/userClient`, {
        params: {
          page: currentPage,
          limit: postsPerPage
        }
      })
      const response = result.data.data
      if (response) {
        setDefaultClientOption(response.map((item) => ({ label: item?.UserName, value: item?.Id })))
      }
    } catch (error) {

    }

  }


  const handleClientChange = (option) => {
    setClientSelected(option);
  }

  const onSearch = () => {
    fetchData({ page: 1, locationId: locationSelected?.value,ucId: clientSelected?.value,auditcode:auditCodeSelected, date: dateSelected })
    console.log("location :");
    console.log(locationSelected);
  }
  
  
 const handleChange = (e) =>{
    setauditCodeSelected(e.target.value);
 }
 //Print Pdf
 const GeneratePDF = (ID) => {
  history.push(`/Report-Document/${ID}`);

};
const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    width:180
  })
};

  return (
    <>
    <div className="content ">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
               Reports
              </CardTitle>
            </CardHeader>

            <Col>
            
                  
                <span className="d-flex flex-wrap-reverse Controller">
                  <div className="d-flex bd-highlight mb-3">
                    <span className="m-2">
                    Audit#
                    <input 
                        type="text"
                        className="form-control"
                        name="AuditCode"
                        style={{width:"105px",height:"40px"}}
                        onChange={handleChange}
                        required
                      />
                    </span>
                    <span className="m-2">
                      Client
                      <AsyncSelect
                        // isMulti
                        // isDisabled={isDisabled}
                        className="react-select"
                        instanceId={'select-user'}
                        placeholder="Client"
                        // value={clientSelected}
                        cacheOptions
                        defaultOptions={defaultClientOption}
                        loadOptions={loadClientOptions}
                        onChange={handleClientChange}
                        styles={customStyles}
                        />
                    </span>

                    <span className="m-2">
                      Location
                      <AsyncSelect
                        // isMulti
                        // isDisabled={isDisabled}
                        className="react-select"
                        instanceId={'select-user'}
                        placeholder="Location"
                        // value={locationSelected}
                        cacheOptions
                        defaultOptions={defaultLocationOption}
                        loadOptions={loadOptions}
                        onChange={handleLocationChange}
                        styles={customStyles}
                        />
                    </span>
                    <span className="m-2">
                      Date
                      
                      <input
                        className="form-control input-lg"
                        data-datepicker="True"
                        id="strDate"
                        name="strDate"
                        type="Date"
                        onChange={(event) => setDateSelected(event.target.value)}
                        value={dateSelected}
                        style={{width:"180px",
                        height:"40px"}}
                      />
                    </span>
                    
                    <span style={{marginTop:"18px"}}
                    >
                   <input  type="submit" onClick={onSearch} value="Search" className="btn btn-primary"/>
                    </span>
                  </div>
                </span>

        
                
            </Col>


            <div>
            <CardTitle tag="h5">
               Import Imported Audit
              </CardTitle>
              <form
                action="/Quality/Reports/FileUpload"
                enctype="multipart/form-data"
                method="post"
              >
                <input
                  name="__RequestVerificationToken"
                  type="hidden"
                  value="Aw4sVY2wCtVJ9n38q6WEyqUz3VjiNoTd__fJYz4bRtqIp3vGuFChLolAEUNFGHu8GN6UGD9LEgGsV8qoqyqFbbqjiHWHlSQGdiha2XYW7zo1"
                />
                <fieldset className="borderless" id="report-list-filters">
                  <Table className="table-borderless form-table">
                    <tr>
                      <th>Generated zip file</th>
                      <th>Auditor username</th>
                    </tr>
                    <tr>
                      <td id="auditnr">
                        <input type="file" name="file" id="file" />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="performerName"
                          id="performerName"
                        />
                      </td>
                      <td>
                        <input type="submit" value="Import data" />
                      </td>
                    </tr>
                  </Table>
                </fieldset>
              </form>
            </div>
            <div id="audit-list-container"></div>

            <CardFooter>
              <Table class="list-table">
                <tr className="text-primary">
                  <th>Code</th>
                  <th>Branch</th>
                  <th>Client</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Rreport</th>
                </tr>
                {
                    
                        data? <tbody>
                          {/* -------------------------Daynamic------------------------ */}
                          {data.map((val, index) => (
                            <tr key={index}>
                              <td scope="col">{val.AuditCode}</td>
                              <td scope="col">{val.IsActive ? 'Yes' : 'No'}</td>
                              <td scope="col">{val.UserClient.CompanyName}</td>
                              <td scope="col">{val.Location?.Name}</td>
                              <td scope="col">{moment(val.Date).format('YYYY-MM-DD HH:mm:ss')}</td>
              
                              <td>
                              <i class="fa-solid fa-chart-bar"  className="fas fa-chart-bar" 
                              style={{
                                color:"blue",fontSize:"30px"
                              }}
                              onClick={() => {
                                GeneratePDF(val.Id);
                                  }}
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
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default Reports;
