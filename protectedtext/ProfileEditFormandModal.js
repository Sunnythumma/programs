import React, { useEffect, useState } from "react";
import "../patient.scss";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { patientProfile } from "../../../store/actions/patientAction";
import ProfileEditModal from "../ProfileEditModal";
import ProfileEditForm from "../ProfileEditForm";
import baseUrl from "../../../utils/baseUrl";
import Loading from "../../Loading";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../../Footer";
import PatientNavbar from "../../PatientNavbar";
import team4 from '../../../assets/images/team4.jpg'

const PatientProfile = () => {
  const { patientProfileData } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  const [isProfileEditModalShow, setProfileEditModalShow] = useState(false);

  const toggleEditModal = () => {
    setProfileEditModalShow(!isProfileEditModalShow);
  };

  useEffect(() => {
    dispatch(patientProfile());
  }, [dispatch]);

  return (
    <>
      {Object.keys(patientProfileData).length !== 0 ? (
        <>
          <PatientNavbar />
          <section className="patient-profile-section">
            <div className="patient-profile font-weight-bold text-center mb-5">
              <CgProfile /> Profile
            </div>
            <Container className="profile-container">
              <Card className="patient-card">
                <Card.Body>
                  <Row className="d-flex justify-content-center align-items-center mt-3 mb-3">
                    <img
                      // src={`${baseUrl}/${patientProfileData.photo}`}
                      src={team4}
                      alt="Profile Img"
                      className="profile-img"
                    />
                  </Row>
                  <Row className="text-center mt-3">
                    <Col>First Name</Col>
                    <Col>Last Name</Col>
                  </Row>
                  <Row className="text-center">
                    <Col>{patientProfileData.firstName}</Col>
                    <Col>{patientProfileData.lastName}</Col>
                  </Row>
                  <hr />
                  <Row className="text-center mt-3">
                    <Col>Phone Number</Col>
                    <Col>Email</Col>
                  </Row>
                  <Row className="text-center">
                    <Col>{patientProfileData.phoneNo}</Col>
                    <Col>{patientProfileData.email}</Col>
                  </Row>
                  <hr />
                  <Row className="text-center mt-3">
                    <Col>Gender</Col>
                    <Col>State</Col>
                  </Row>
                  <Row className="text-center">
                    <Col>{patientProfileData.gender}</Col>
                    <Col>
                      {patientProfileData.address
                        ? patientProfileData.address.state
                        : "null"}
                    </Col>
                  </Row>
                  <hr />
                  <Row className="text-center mt-3">
                    <Col>City</Col>
                    <Col>Street</Col>
                  </Row>
                  <Row className="text-center">
                    <Col>
                      {patientProfileData.address
                        ? patientProfileData.address.city
                        : "null"}
                    </Col>
                    <Col>
                      {patientProfileData.address
                        ? patientProfileData.address.street
                        : "null"}
                    </Col>
                  </Row>
                  <hr />
                  <Row className="text-center">
                    <Col>Pincode</Col>
                    <Col></Col>
                  </Row>
                  <Row className="text-center mb-3">
                    <Col>
                      {patientProfileData.address
                        ? patientProfileData.address.pincode
                        : "null"}
                    </Col>
                    <Col></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
            {/* {isProfileEditModalShow && (
              <ProfileEditModal
                header="Edit Patient Profile"
                body={<ProfileEditForm handleShow={toggleEditModal} />}
                handleShow={toggleEditModal}
              />
            )} */}
            <Button
              className="btn edit-profile-btn mt-5 mb-5"
              type="submit"
              onClick={toggleEditModal}
            >
              Edit Profile
            </Button>
          </section>
          <Footer />
        </>
      ) : (
        <Loading />
      )}
      {isProfileEditModalShow && (
        <ProfileEditModal
          header="Edit Patient Profile"
          body={<ProfileEditForm handleShow={toggleEditModal} />}
          handleShow={toggleEditModal}
        />
      )}
    </>
  );
};

export default PatientProfile;






import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../../Patient/patient.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  patientProfile,
  profileEdit,
} from "../../../store/actions/patientAction";
import baseUrl from "../../../utils/baseUrl";

const ProfileEditForm = ({ handleShow }) => {
  const [uploadNew, setIsUploadNew] = useState(false);
  const { patientProfileData } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(patientProfile());
  }, [dispatch]);

  const toggleUpload = () => {
    setIsUploadNew(!uploadNew);
  };

  const initialValues = {
    firstName: patientProfileData.firstName,
    lastName: patientProfileData.lastName,
    phoneNo: patientProfileData.phoneNo,
    state: patientProfileData.address.state,
    city: patientProfileData.address.city,
    street: patientProfileData.address.street,
    pincode: patientProfileData.address.pincode,
    email: patientProfileData.email,
    gender: patientProfileData.gender,
    photo: patientProfileData.photo,
    role: "PATIENT",
  };

  const phoneNoRegExp = /^[0]?[6789]\d{9}$/;
  const pinCodeExp = /^[0]?[1-9]\d{5}$/;
  const IMAGE_FORMAT = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is Required")
      .max(15, "First Name not greater than 15")
      .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
    lastName: Yup.string()
      .required("Last Name is Required")
      .max(15, "Last Name not greater than 15")
      .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
    phoneNo: Yup.string()
      .matches(phoneNoRegExp, "Phone number is not valid")
      .required("Phone Number is requried"),
    email: Yup.string().email().required("Email is Required"),
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
      .matches(/^[a-zA-Z ]*$/, "Please Enter valid Street"),
    pincode: Yup.string()
      .required("PinCode is Required")
      .matches(pinCodeExp, "PinCode is not valid"),
    photo: Yup.string()
      .required("Please upload your Profile Photo")
      .test(
        "fileSize",
        "Uploaded File is Too Big",
        (value) => !(value && value.size <= 4000000)
      )
      .test(
        "fileFormat",
        "Unsupported Format (valid format : JPG,JPEG,PNG)",
        (value) => !(value && IMAGE_FORMAT.includes(value?.type))
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phoneNo", values.phoneNo);
      formData.append("email", values.email);
      formData.append("role", values.role);
      formData.append("gender", values.gender);
      formData.append("address[state]", values.state);
      formData.append("address[city]", values.city);
      formData.append("address[street]", values.street);
      formData.append("address[pincode]", values.pincode);
      formData.append("photo", values.photo);

      dispatch(profileEdit(formData));

      handleShow();
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
    values,
    errors,
  } = formik;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col className="edit-text-field-height">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="input-design"
              type="text"
              id="first-name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="First Name"
            />
            {errors.firstName && touched.firstName ? (
              <span className="text-danger">{errors.firstName}</span>
            ) : null}
          </Col>
          <Col className="edit-text-field-height">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="input-design"
              type="text"
              id="last-name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Last Name"
            />
            {errors.lastName && touched.lastName ? (
              <span className="text-danger">{errors.lastName}</span>
            ) : null}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="edit-text-field-height">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              className="input-design"
              type="text"
              id="phone-number"
              name="phoneNo"
              value={values.phoneNo}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Phone Number"
            />
            {errors.phoneNo && touched.phoneNo ? (
              <span className="text-danger">{errors.phoneNo}</span>
            ) : null}
          </Col>
          <Col className="edit-text-field-height">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="input-design"
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
            />{" "}
            {errors.email && touched.email ? (
              <span className="text-danger">{errors.email}</span>
            ) : null}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="edit-text-field-height">
            <Form.Label>State</Form.Label>
            <Form.Control
              className="input-design"
              type="text"
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="State"
            />
            {errors.state && touched.state ? (
              <span className="text-danger">{errors.state}</span>
            ) : null}
          </Col>
          <Col className="edit-text-field-height">
            <Form.Label>City</Form.Label>
            <Form.Control
              className="input-design"
              type="text"
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="City"
            />
            {errors.city && touched.city ? (
              <span className="text-danger">{errors.city}</span>
            ) : null}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="edit-text-field-height">
            <Form.Label>Street</Form.Label>
            <Form.Control
              className="input-design"
              type="text"
              id="street"
              name="street"
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Street"
            />
            {errors.street && touched.street ? (
              <span className="text-danger">{errors.street}</span>
            ) : null}
          </Col>
          <Col className="edit-text-field-height">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              className="input-design"
              type="text"
              id="pincode"
              name="pincode"
              value={values.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Pincode"
            />
            {errors.pincode && touched.pincode ? (
              <span className="text-danger">{errors.pincode}</span>
            ) : null}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="edit-text-field-height">
            <Form.Label>Gender</Form.Label>
            <br />
            <Form.Check
              inline
              type="radio"
              id="male"
              name="gender"
              value="Male"
              label="Male"
              checked={values.gender === "Male" ? true : false}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              id="female"
              name="gender"
              value="Female"
              label="Female"
              checked={values.gender === "Female" ? true : false}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.gender && touched.gender ? (
              <span className="text-danger">{errors.gender}</span>
            ) : null}
          </Col>
          <Col className="edit-text-field-height mb-4">
            {Array.isArray(values.photo) ? null : (
              <div>
                {!uploadNew && (
                  <div className="mb-2">
                    <img
                      src={`${baseUrl}${values.photo}`}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                      }}
                    />
                    {/* <label>Photo Url : </label>
                    <a href={`${baseUrl}${values.photo}`}>
                      {baseUrl}
                      {values.photo}
                    </a> */}
                  </div>
                )}
              </div>
            )}
            <Button
              onClick={toggleUpload}
              className="photo-change-btn"
              style={{ width: "100px" }}
            >
              {!uploadNew ? "Change" : "Update"}
            </Button>
            <br />
            {/* <br /> */}
            {uploadNew && (
              <>
                <Form.Label>Profile Photo</Form.Label>
                <br />
                <input
                  type="file"
                  id="profile-photo"
                  name="photo"
                  onChange={(event) => {
                    setFieldValue("photo", event.target.files[0]);
                  }}
                />
                <br />
                {errors.photo && touched.photo ? (
                  <span className="text-danger">{errors.photo}</span>
                ) : null}
              </>
            )}
          </Col>
        </Row>
        <hr />
        <Button variant="secondary" type="submit" className="save-btn">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEditForm;




import React from "react";
import { Button, Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import '../../Patient/patient.scss'

const ProfileEditModal = ({ header, body, handleShow }) => {
  return (
    <div>
      <Modal show={true} onHide={handleShow} size="lg">
        <Modal.Header>
          <Modal.Title>{header}</Modal.Title>
          <Button onClick={handleShow} variant="light" className="close-icon">
            <MdClose />
          </Button>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
