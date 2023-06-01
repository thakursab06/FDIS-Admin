import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Row,
  Col,
  CardFooter,
  CardHeader,
  Card,
  CardBody,
  Form,
} from "reactstrap";
import "../assets/css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  // const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const userData = {
    //   username: info.username,
    //   password: info.password,
    // };
    setLoading(true);
    setTimeout(async () => {
      if (username == "user" && password == "user") {
        localStorage.setItem("token", "Brilliance");
        toast.success("login Sucsesfully!!!");

        history.push("/admin/dashboard");
      } else {
        toast.error("User not found please Try Agan!");
        setLoading(false);
        setError(true);
      }
      setTimeout( ()=>{
        setError(false);
      },3000)
    },2000);
  };

  const onClickForgotPassword = () => {
    console.log("hello");
    history.push("/forget_pasword");
  };
  // ..............................................................

  return (
    <div className="row contener">
      <div className="col-sm-4 text-center abc">
        <Form onSubmit={handleSubmit}>
          <p className="h4 mb-4 text-left">
            <b>Account Details</b>
          </p>
          <row>
            <col-2>
              <label for="mail" className="in">
               <b>UserName</b>
              </label>{" "}
              <input
                type="text"
            id="defaultLoginFormEmail"
            className="form-controls mb-4"
            placeholder="Enter Username"
            required
                onChange={(e) => setusername(e.target.value)}
              />
            </col-2>
            <col-2>
              <label for="pass" className="in">
              <b>password</b>
              </label>{" "}
              <input
               required
            type="password"
            className="form-controls mb-4"
            placeholder="Enter Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </col-2>
            <col-2>
              <div className="custom-control custom-checkbox text-left checkleft">
                {" "}
                <input type="checkbox" className="custom-control-input " />{" "}
                <label
                  className="custom-control-label"
                  for="defaultLoginFormRemember"
                >
                  <p className="textSize">Remember my login details</p>
                </label>{" "}
              </div>
            </col-2>
            <col-2>
              <div className='divleft'>
                <button className="btns btn-info btn-block " type="submit"> Login </button>
                <button className="btns btn-info btn-block " type="submit" onClick={onClickForgotPassword}>Forgot your password?</button>
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </col-2>
          </row>
        
        </Form>
      </div>
      <div className="col-sm-8 xyz text-center">
        <img src={require("../image/voorblad.jpg").default} />
      </div>
    </div>
  );
};

export default Login;
