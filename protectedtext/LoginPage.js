import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/logins.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { login } from "../../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import parseJwt from "../../components/ParseJWT";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import PatientNavbar from "../../components/PatientNavbar";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { invalidCredentials, isLogin } = useSelector((state) => state.user);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isLogin) {
      const token = localStorage.getItem("token");
      const obj = parseJwt(token !== null && token);

      obj.user.role === "ADMIN" ? navigate("/dashboard") : navigate("/");
    }
  }, [isLogin, navigate]);

  // const initialValues = {
  //   email: "",
  //   password: "",
  // };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().email().required("Email is Required"),
        password: Yup.string()
          .required("Password is Required")
          .min(8, "Password not less than 8"),
      }),
      onSubmit: (values) => {
        dispatch(
          login({
            email: values.email,
            password: values.password,
          })
        );
      },
    });

  return (
    <>
      {/* <PatientNavbar /> */}
      <section className="login-section d-flex align-items-center justify-content-center">
        <Container>
          <Row className="login-row no-gutters p-4">
            <Col md="6">
              <Image fluid src={loginImage} alt="Handouts" />
            </Col>

            <Col md="6" className="">
              <div className="login-title">
                <h1 className="px-3"> Login</h1>
                <span>
                  {invalidCredentials ? (
                    <p className="text-danger ml-3">
                      Invalid Email or Password
                    </p>
                  ) : null}
                </span>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="">
                  <Col md="10" className="error-height">
                    <Form.Label htmlFor="email">
                      {" "}
                      <i
                        className="fa fa-lg fa-envelope"
                        aria-hidden="true"
                      ></i>{" "}
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="input-design"
                      placeholder="Enter Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      autoComplete="false"
                    />

                    {errors.email && touched.email ? (
                      <span className="text-danger mt-1 pl-1">
                        {errors.email}
                      </span>
                    ) : null}
                  </Col>
                </Form.Group>

                <Form.Group className="">
                  <Col md="10" className="error-height">
                    <Form.Label htmlFor="password">
                      {" "}
                      <i
                        className="fa fa-lg fa-key"
                        aria-hidden="true"
                      ></i>{" "}
                      Password
                    </Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input-design"
                      placeholder="Enter Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      autoComplete="false"
                    />
                    <span className="visibility-icon">
                      {showPassword ? (
                        <AiFillEye size={24} onClick={togglePassword} />
                      ) : (
                        <AiFillEyeInvisible
                          size={24}
                          onClick={togglePassword}
                        />
                      )}
                    </span>
                    {errors.password && touched.password ? (
                      <span className="text-danger mt-1 pl-1">
                        {errors.password}
                      </span>
                    ) : null}
                  </Col>
                </Form.Group>

                <Form.Group>
                  <Col md="10" className="login-margin mt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn login-btn"
                      // onClick={errorLogin}
                    >
                      Login
                    </Button>
                    <br />
                    <br />
                    <p>
                      New to Handouts ?{" "}
                      <span className="signup-text">
                        Sign up now as &nbsp;
                        <NavLink to="/patientsignup">Patient</NavLink> /{" "}
                        <NavLink to="/donorsignup">Donor</NavLink>{" "}
                      </span>
                    </p>
                    {/* <NavLink to="/patientsignup"> SignUp as Patient</NavLink>
                    <br />
                    <NavLink to="/donorsignup"> SignUp as Donor</NavLink> */}
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LoginPage;
