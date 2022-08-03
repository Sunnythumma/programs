import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import baseUrl from "../../utils/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientNavbar from "../../components/PatientNavbar";

const PatientSignUp = () => {
  const patientURL = `${baseUrl}/auth/signup`;

  const navigate = useNavigate();
  // const initialValues = {
  //   firstName: "",
  //   lastName: "",
  //   state: "",
  //   city: "",
  //   street: "",
  //   pincode: "",
  //   phoneNo: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   gender: "Male",
  //   profilePhoto: "",
  //   role: "PATIENT",
  // };

  const phoneNumberRegExp = /^[0]?[6789]\d{9}$/;
  const pinCodeExp = /^[0]?[1-9]\d{5}$/;
  const IMAGE_FORMAT = ["image/jpg", "image/jpeg", "image/png"];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      state: "",
      city: "",
      street: "",
      pincode: "",
      phoneNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "Male",
      profilePhoto: "",
      role: "PATIENT",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required("First Name is Required")
        .max(15, "First Name not greater than 15")
        .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
      lastName: Yup.string()
        .required("Last Name is Required")
        .max(15, "Last Name not greater than 15")
        .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
      phoneNo: Yup.string()
        .matches(phoneNumberRegExp, "Phone number is not valid")
        .required("Phone Number is requried"),
      email: Yup.string().email().required("Email is Required"),
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password not less than 8"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password must be Same"
        )
        .required("Confirm Password is also required"),
      gender: Yup.string().required("Gender is Required"),
      state: Yup.string()
        .required("State is Required")
        .max(25, "State not greater than 25")
        .matches(/^[a-zA-Z ]*$/, "Please Enter valid State"),
      city: Yup.string()
        .required("City is Required")
        .max(25, "City not greater than 25")
        .matches(/^[a-zA-Z ]*$/, "Please Enter valid City"),
      street: Yup.string()
        .required("Street is Required")
        .max(50, "Street not greater than 50")
        .matches(/^[a-zA-Z ,]*$/, "Please Enter valid Street"),
      pincode: Yup.string()
        .required("PinCode is Required")
        .matches(pinCodeExp, "PinCode is not valid"),
      profilePhoto: Yup.mixed()
        .required("Please upload your Profile Photo")
        .test(
          "fileSize",
          "Uploaded File is Too Big",
          (value) => !value || (value && value.size <= 2000000)
        )
        .test(
          "fileFormat",
          "Unsupported Format (valid format : JPG,JPEG,PNG)",
          (value) => !value || (value && IMAGE_FORMAT.includes(value?.type))
        ),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNo: values.phoneNo,
        email: values.email,
        gender: values.gender,
        password: values.password,
        role: values.role,
      };

      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );

      formData.append("address[state]", values.state);
      formData.append("address[city]", values.city);
      formData.append("address[street]", values.street);
      formData.append("address[pincode]", values.pincode);
      formData.append("photo", values.profilePhoto, values.profilePhoto.name);

      axios
        .post(patientURL, formData)
        .then((response) => {
          console.log(response);
          toast.success("Signup Successful !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => navigate("/login"), 6000);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          console.log(error);
        });
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleReset,
    handleBlur,
    touched,
    values,
    errors,
    setFieldValue,
  } = formik;

  return (
    <>
      {/* <PatientNavbar /> */}
      <section className="signup-section d-flex align-items-center justify-content-center mb-3 mt-3">
        <Container className="signup-container">
          <Row className="signup-row no-gutters">
            <Col md="12">
              <h1 className="pt-3 pb-1 mb-5 text-center">Patient SignUp</h1>
            </Col>

            <Container>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Col md="12">
                  <Form.Group className="form-row row-margin mb-3">
                    <Col md="6" sm="12" className="signup-text-field-height">
                      <Form.Label htmlFor="first-name">
                        {" "}
                        <i
                          className="fa fa-lg fa-user"
                          aria-hidden="true"
                        ></i>{" "}
                        First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="first-name"
                        name="firstName"
                        className="input-design text-width"
                        placeholder="First Name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.firstName && touched.firstName ? (
                        <span className="text-danger">{errors.firstName}</span>
                      ) : null}
                    </Col>
                    <Col md="6" className="signup-text-field-height">
                      <Form.Label htmlFor="last-name">
                        {" "}
                        <i
                          className="fa fa-lg fa-user"
                          aria-hidden="true"
                        ></i>{" "}
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="last-name"
                        name="lastName"
                        className="input-design text-width"
                        placeholder="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.lastName && touched.lastName ? (
                        <span className="text-danger">{errors.lastName}</span>
                      ) : null}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-row row-margin mb-3">
                    <Col md="6" className="signup-text-field-height">
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
                        id="email"
                        className="input-design text-width"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email ? (
                        <span className="text-danger">{errors.email}</span>
                      ) : null}
                    </Col>
                    <Col md="6" className="signup-text-field-height">
                      <Form.Label htmlFor="phone-number">
                        {" "}
                        <i
                          className="fa fa-lg fa-phone"
                          aria-hidden="true"
                        ></i>{" "}
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="phone-number"
                        name="phoneNo"
                        className="input-design text-width"
                        placeholder="Phone Number"
                        value={values.phoneNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phoneNo && touched.phoneNo ? (
                        <span className="text-danger">{errors.phoneNo}</span>
                      ) : null}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-row row-margin mb-4">
                    <Col md="6" className="signup-text-field-height">
                      <Form.Label htmlFor="password">
                        {" "}
                        <i
                          className="fa fa-lg fa-key"
                          aria-hidden="true"
                        ></i>{" "}
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        id="password"
                        className="input-design text-width"
                        name="password"
                        placeholder="********"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="on"
                      />
                      {errors.password && touched.password ? (
                        <span className="text-danger">{errors.password}</span>
                      ) : null}
                    </Col>

                    <Col md="6" className="signup-text-field-height">
                      <Form.Label htmlFor="confirm-password">
                        {" "}
                        <i
                          className="fa fa-lg fa-key"
                          aria-hidden="true"
                        ></i>{" "}
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        placeholder="********"
                        className="input-design text-width"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="on"
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <span className="text-danger">
                          {errors.confirmPassword}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-row row-margin mb-4">
                    <Col md="6" className="signup-text-field-height">
                      <Form.Label htmlFor="state">
                        {" "}
                        <i
                          className="fa fa-lg fa-building"
                          aria-hidden="true"
                        ></i>{" "}
                        State
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="state"
                        className="input-design text-width"
                        name="state"
                        placeholder="State"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.state && touched.state ? (
                        <span className="text-danger">{errors.state}</span>
                      ) : null}
                    </Col>
                    <Col md="6" className="signup-text-field-height">
                      <Form.Label htmlFor="city">
                        {" "}
                        <i
                          className="fa fa-lg fa-building"
                          aria-hidden="true"
                        ></i>{" "}
                        City
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="city"
                        name="city"
                        className="input-design text-width"
                        placeholder="City"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.city && touched.city ? (
                        <span className="text-danger">{errors.city}</span>
                      ) : null}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-row row-margin mb-4">
                    <Col md="6" className="signup-text-field-height">
                      <Form.Label htmlFor="street">
                        {" "}
                        <i
                          className="fa fa-lg fa-building"
                          aria-hidden="true"
                        ></i>{" "}
                        Street
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="street"
                        className="input-design text-width"
                        name="street"
                        placeholder="Street"
                        value={values.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.street && touched.street ? (
                        <span className="text-danger">{errors.street}</span>
                      ) : null}
                    </Col>
                    <Col md="6" className="signup-text-field-height">
                      <Form.Label htmlFor="pincode">
                        {" "}
                        <i
                          className="fa fa-lg fa-map-marker-alt"
                          aria-hidden="true"
                        ></i>{" "}
                        Pincode
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="pincode"
                        name="pincode"
                        className="input-design text-width"
                        placeholder="Pincode"
                        value={values.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.pincode && touched.pincode ? (
                        <span className="text-danger">{errors.pincode}</span>
                      ) : null}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-row row-margin mb-4">
                    <Col md="6" className="signup-text-field-height">
                      <Form.Label>
                        <i className="fa fa-lg fa-user" aria-hidden="true"></i>
                        &nbsp;Gender &nbsp;
                      </Form.Label>
                      <Form.Check>
                        <Form.Check
                          inline
                          type="radio"
                          id="male"
                          name="gender"
                          value="Male"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultChecked
                          label="Male"
                        />
                        <Form.Check
                          inline
                          type="radio"
                          id="female"
                          name="gender"
                          value="Female"
                          onChange={handleChange}
                          label="Female"
                        />
                      </Form.Check>
                      {errors.gender && touched.gender ? (
                        <span className="text-danger">{errors.gender}</span>
                      ) : null}
                      <br />
                    </Col>

                    <Col md="6" className="signup-text-field-height">
                      <Form.Label>Profile Photo</Form.Label>
                      <br />
                      <input
                        type="file"
                        id="profile-photo"
                        onChange={(event) => {
                          setFieldValue("profilePhoto", event.target.files[0]);
                        }}
                      />

                      <br />
                      {errors.profilePhoto && touched.profilePhoto ? (
                        <span className="text-danger">
                          {errors.profilePhoto}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-row pb-2">
                    <Button
                      type="submit"
                      className="btn btn-primary signup-btn "
                    >
                      Sign Up
                    </Button>
                    <Button
                      type="reset"
                      className="btn btn-primary reset-btn pb-2 "
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Form.Group>

                  <Form.Group className=" pb-4">
                    <p className="login-account pt-2">
                      Already have an account.{" "}
                      <Button
                        className="login-btn1"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>
                    </p>
                  </Form.Group>
                </Col>
              </Form>
            </Container>
          </Row>
        </Container>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </section>
    </>
  );
};

export default PatientSignUp;
