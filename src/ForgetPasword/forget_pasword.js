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

// import { db } from "../DB/firebase-conffig";
import "../assets/css/login.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Login = (props) => {
//   const [username, setusername] = useState("");
//   const [password, setpassword] = useState("");

const Forget_pasword = () => {
  // console.log("find");
  // // const [isAuth, setIsAuth] = useState(false);
  // const [error, setError] = useState(false);
  // const [Loading, setLoading] = useState(false);
  // const [username, setusername] = useState("");
  // const [password, setpassword] = useState("");
  // const [info, setInfo] = useState({
  //   username: "",
  //   password: "",
  // });

  // let history = useHistory();

  // const handleSubmit = async (e) => {
  //   console.log("hello");
  //   e.preventDefault();

  // const userData = {
  //   username: info.username,
  //   password: info.password,
  // };
  // setLoading(true);
  // setTimeout(async () => {
  //   if (username == "user" && password == "user") {
  //     toast.success("login Sucsesfully!!!");

  //     history.push("/admin/dashboard");
  //   } else {
  //     toast.error("User not found please Try Agan!");
  //   }
  // }, 1000);
  // };
  // ..............................................................
  //     await db
  //       .collection("Users")
  //       .where("username", "==", username)
  //       .where("password", "==", password)
  //       .get()
  //       .then((response) => {
  //         if (response.empty) {
  //           setLoading(false);
  //           setError(true);
  //           toast.error("User not found please Try Agan!");
  //         } else {
  //           localStorage.setItem("token", true);
  //           response.forEach((data) => {
  //             console.log(data.data());
  //           });
  //           setIsAuth(true);
  //           toast.success("login Sucsesfully!!!");
  //           history.push("/admin/dashboard");
  //         }
  //         // setTimeout(() => {
  //         //   setError(false);
  //         // }, 1000);
  //       });

  return (
    <div className="row contener  ">
      <div className="col-sm-4 text-center abc">
        <Form action="#!">
          <p className="h4 mb-4 ">
            <b>Forgot your password</b>
          </p>
          <div className="in">
            <label for="mail">
              <b>Username</b>
            </label>{" "}
            <input
              required
              type="text"
              className="form-controls mb-4 text-center"
              placeholder="Enter Username"
              // onChange={(e) => setusername(e.target.value)}
            />{" "}
            <label for="pass">
              <b>Email</b>
            </label>{" "}
            <input
              type="email"
              className="form-controls mb-4"
              placeholder="Enter Email"
              required
              // onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <button className="btns btn-info   " type="submit">
            Reset Password
          </button>
          <div className="m-2">
            <Link to="/login">Go to the login page ?</Link>
          </div>
          <ToastContainer position="top-center" autoClose={3000} />
        </Form>
      </div>
      <div className="col-sm-8 xyz text-center">
        <img src={require("../image/voorblad.jpg").default} />
      </div>
    </div>
  );
};

export default Forget_pasword;
