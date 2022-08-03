import React, { useEffect, useState } from "react";
import "./request.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import PatientNavbar from "../../components/PatientNavbar";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PatientRequest = () => {
  const token = localStorage.getItem("token");
  const [disabled, setDisable] = useState(false);
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    hospitalId: "",
    hospitalName: "",
    phoneNo: "",
    email: "",
    state: "",
    city: "",
    street: "",
    pincode: "",
    diseaseName: "",
    diseaseDescription: "",
    requiredAmount: "",
    toDate: "",
    fileType: "",
    documents: "",
  };

  const phoneNumberRegExp = /^[0]?[2-9]\d{9}$/;
  const pinCodeExp = /^[0]?[1-9]\d{5}$/;
  const FILE_FORMAT = ["file/pdf"];

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      hospitalName: Yup.string()
        .required("Hospital Name is Required")
        .max(35, "Hospital Name not greater than 35")
        .matches(/^[A-Za-z ]*$/, "Please enter valid Hospital name"),
      phoneNo: Yup.string()
        .matches(phoneNumberRegExp, "Phone number is not valid")
        .required("Phone Number is requried"),
      email: Yup.string().email().required("Email is Required"),
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
      diseaseName: Yup.string()
        .required("Disease Name is Required")
        .max(25, "Disease Name not greater than 25")
        .matches(/^[A-Za-z ]*$/, "Please enter valid Disease name"),
      diseaseDescription: Yup.string()
        .required("Disease Description is Required")
        .max(150, "Disease Description not greater than 150")
        .matches(/^[A-Za-z ]*$/, "Please enter valid Disease Description"),
      requiredAmount: Yup.string()
        .required("Amount is Required")
        .matches(/^[0-9]*$/, "Please enter valid amount"),
      fileType: Yup.string()
        .required("File Type is Required")
        .max(50, "File Type not greater than 50")
        .matches(/^[A-Za-z ]*$/, "Please enter valid File Type"),
      toDate: Yup.date().required("Select date").typeError("Invalid date"),
      documents: Yup.mixed()
        .required("Please upload your Documents")
        .test(
          "fileSize",
          "Uploaded File is Too Big",
          (value) => !(value && value.size <= 4000000)
        )
        .test(
          "fileFormat",
          "Unsupported Format (valid format : PDF)",
          (value) => !(value && FILE_FORMAT.includes(value?.type))
        ),
    }),

    onSubmit: (values) => {
      const data = {
        hospitalId: values.hospitalId,
        hospitalName: values.hospitalName,
        phoneNo: values.phoneNo,
        email: values.email,
        diseaseName: values.diseaseName,
        diseaseDescription: values.diseaseDescription,
        requiredAmount: values.requiredAmount,
        toDate: values.toDate,
        fileType: values.fileType,
      };

      !values.hospitalId && delete data["hospitalId"];
      data["phoneNo"] = String(values.phoneNo);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );

      for (let i = 0; i < values.documents.length; i++) {
        formData.append(
          "documents",
          values.documents[i],
          values.documents[i].name
        );
      }
      formData.append("address[state]", values.state);
      formData.append("address[city]", values.city);
      formData.append("address[street]", values.street);
      formData.append("address[pincode]", values.pincode);

      axios
        .post(`${baseUrl}/request`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          toast.success("Request Successful !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => navigate("/myrequest"), 6000);
          console.log(response);
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
    handleBlur,
    setFieldValue,
    touched,
    values,
    errors,
  } = formik;

  useEffect(() => {
    const getHospital = async () => {
      await axios
        .get(`${baseUrl}/hospital`, {
          headers: {
            Authorization: token,
          },
        })
        .then((data) => {
          setHospitalOptions([
            ...data.data.data.hospitals.map((hospital) => ({
              value: hospital._id,
              label: hospital.hospitalName,
              hospitalId: hospital._id,
              hospitalName: hospital.hospitalName,
              phoneNo: hospital.phoneNo,
              email: hospital.email,
              state: hospital.address?.state,
              city: hospital.address?.city,
              street: hospital.address?.street,
              pincode: hospital.address?.pincode,
            })),
          ]);
        })
        .catch((e) => console.log(e));
    };

    getHospital();
  }, [token]);

  const handleSelectHospital = (selectedHospital) => {
    const flag = hospitalOptions.map((hospital) => hospital.label);
    if (!flag.includes(selectedHospital?.label)) {
      values.hospitalName = selectedHospital?.label;
      setDisable(false);
    } else {
      setFieldValue("hospitalId", selectedHospital?.hospitalId);
      setFieldValue("hospitalName", selectedHospital?.hospitalName);
      setFieldValue("phoneNo", selectedHospital?.phoneNo);
      setFieldValue("email", selectedHospital?.email);
      setFieldValue("state", selectedHospital?.state);
      setFieldValue("city", selectedHospital?.city);
      setFieldValue("street", selectedHospital?.street);
      setFieldValue("pincode", selectedHospital?.pincode);
      setDisable(true);
    }
  };

  const styles = {
    control: (styles) => ({
      ...styles,
      borderRadius: "5px",
      boxShadow: "inset 7px 7px 25px #c3dcf3, inset -7px -7px 14px #fffbff",
    }),
  };

  return (
    <>
      <PatientNavbar />
      <section className="patient-request-section d-flex justify-content-center align-items-center">
        <Container>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="m-5">
              <div className="mb-3">
                <h1>Send Request</h1>
              </div>
              <div className="hospital">
                <div className="p-5 hospital-form">
                  <h3>Hospital Details </h3>

                  <Form.Group className="form-row">
                    <Col md="4" className="request-field-height">
                      <Form.Label>Hospital Name : </Form.Label>
                      <CreatableSelect
                        isClearable
                        styles={styles}
                        name="hospitalName"
                        onChange={handleSelectHospital}
                        options={hospitalOptions}
                        placeholder="Search or Add Hospital"
                      />
                      {errors.hospitalName && touched.hospitalName ? (
                        <span className="text-danger">
                          {errors.hospitalName}
                        </span>
                      ) : null}
                    </Col>
                    <Col md="4" className="request-field-height">
                      <Form.Label>Hospital Phone No :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Hospital Phone No"
                        id="hospital-phone-no"
                        name="phoneNo"
                        value={values.phoneNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-design"
                        disabled={disabled}
                      />
                      {errors.phoneNo && touched.phoneNo ? (
                        <span className="text-danger">{errors.phoneNo}</span>
                      ) : null}
                    </Col>

                    <Col md="4" className="request-field-height">
                      <Form.Label>Hospital Email :</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Hospital Email"
                        id="hospital-email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="input-design"
                      />
                      {errors.email && touched.email ? (
                        <span className="text-danger">{errors.email}</span>
                      ) : null}
                    </Col>
                  </Form.Group>
                  {/* <div className="form-group form-row">
                    <Col md="4" className="hospital-name-height">
                      <Form.Label>Hospital Name : </Form.Label>
                      <CreatableSelect
                        isClearable
                        styles={styles}
                        name="hospitalName"
                        onChange={handleSelectHospital}
                        options={hospitalOptions}
                        placeholder="Search or Add Hospital"
                      />
                      {errors.hospitalName && touched.hospitalName ? (
                        <span className="text-danger">
                          {errors.hospitalName}
                        </span>
                      ) : null}
                    </Col>
                    <Col md="4" className="hospital-phone-height">
                      <Form.Label>Hospital Phone No :</Form.Label>
                      <input
                        type="text"
                        placeholder="Enter Hospital Phone No"
                        id="hospital-phone-no"
                        name="phoneNo"
                        value={values.phoneNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control input-design"
                        disabled={disabled}
                      />
                      {errors.phoneNo && touched.phoneNo ? (
                        <span className="text-danger">{errors.phoneNo}</span>
                      ) : null}
                    </Col>

                    <Col md="4" className="hospital-email-height">
                      <Form.Label>Hospital Email :</Form.Label>
                      <input
                        type="email"
                        placeholder="Enter Hospital Email"
                        id="hospital-email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="form-control input-design"
                      />
                      {errors.email && touched.email ? (
                        <span className="text-danger">{errors.email}</span>
                      ) : null}
                    </Col>
                  </div> */}
                  <Form.Group className="form-row">
                    <Col md="4" className="request-field-height">
                      <Form.Label>Hospital State : </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Hospital State"
                        id="hospital-state"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="input-design"
                      />
                      {errors.state && touched.state ? (
                        <span className="text-danger">{errors.state}</span>
                      ) : null}
                    </Col>

                    <Col md="4" className="request-field-height">
                      <Form.Label>Hospital City : </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Hospital City"
                        id="hospital-city"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="input-design"
                      />
                      {errors.city && touched.city ? (
                        <span className="text-danger">{errors.city}</span>
                      ) : null}
                    </Col>
                    <Col md="4" className="request-field-height">
                      <Form.Label>Hospital Street : </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Hospital Street"
                        id="hospital-street"
                        name="street"
                        value={values.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="input-design"
                      />
                      {errors.street && touched.street ? (
                        <span className="text-danger">{errors.street}</span>
                      ) : null}
                    </Col>
                  </Form.Group>

                  {/* <div className="form-group form-row">
                    <Col md="4" className="hospital-state-height">
                      <Form.Label>Hospital State : </Form.Label>
                      <input
                        type="text"
                        placeholder="Enter Hospital State"
                        id="hospital-state"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="form-control input-design"
                      />
                      {errors.state && touched.state ? (
                        <span className="text-danger">{errors.state}</span>
                      ) : null}
                    </Col>

                    <Col md="4" className="hospital-city-height">
                      <Form.Label>Hospital City : </Form.Label>
                      <input
                        type="text"
                        placeholder="Enter Hospital City"
                        id="hospital-city"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="form-control input-design"
                      />
                      {errors.city && touched.city ? (
                        <span className="text-danger">{errors.city}</span>
                      ) : null}
                    </Col>
                    <Col md="4" className="hospital-street-height">
                      <Form.Label>Hospital Street : </Form.Label>
                      <input
                        type="text"
                        placeholder="Enter Hospital Street"
                        id="hospital-street"
                        name="street"
                        value={values.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="form-control input-design"
                      />
                      {errors.street && touched.street ? (
                        <span className="text-danger">{errors.street}</span>
                      ) : null}
                    </Col>
                  </div> */}
                  <Form.Group className="form-row">
                    <Col md="4" className="request-field-height">
                      <Form.Label>Hospital Pincode : </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Hospital Pincode"
                        id="hospital-pincode"
                        name="pincode"
                        value={values.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="input-design"
                      />
                      {errors.pincode && touched.pincode ? (
                        <span className="text-danger">{errors.pincode}</span>
                      ) : null}
                    </Col>
                  </Form.Group>
                  {/* <div className="form-group form-row">
                    <Col md="4" className="hospital-pincode-height">
                      <Form.Label>Hospital Pincode : </Form.Label>
                      <input
                        type="text"
                        placeholder="Enter Hospital Pincode"
                        id="hospital-pincode"
                        name="pincode"
                        value={values.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className="form-control input-design"
                      />
                      {errors.pincode && touched.pincode ? (
                        <span className="text-danger">{errors.pincode}</span>
                      ) : null}
                    </Col>
                  </div> */}
                  <div className="mt-5">
                    <h3>Request Details</h3>
                    <Form.Group className="form-row">
                      <Col md="4" className="request-field-height">
                        <Form.Label>Disease Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Disease Name"
                          id="disease-name"
                          name="diseaseName"
                          value={values.diseaseName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="input-design"
                        />
                        {errors.diseaseName && touched.diseaseName ? (
                          <span className="text-danger">
                            {errors.diseaseName}
                          </span>
                        ) : null}
                      </Col>
                      <Col md="4" className="request-field-height">
                        <Form.Label>Disease Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Disease Description"
                          id="disease-description"
                          name="diseaseDescription"
                          value={values.diseaseDescription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="input-design"
                        />
                        {errors.diseaseDescription &&
                        touched.diseaseDescription ? (
                          <span className="text-danger">
                            {errors.diseaseDescription}
                          </span>
                        ) : null}
                      </Col>
                      <Col md="4" className="request-field-height">
                        <Form.Label>Required Amount</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Required Amount"
                          id="required-amount"
                          name="requiredAmount"
                          value={values.requiredAmount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="input-design"
                        />
                        {errors.requiredAmount && touched.requiredAmount ? (
                          <span className="text-danger">
                            {errors.requiredAmount}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-row">
                      <Col md="4" className="request-field-height">
                        <Form.Label>Last Date</Form.Label>
                        <Form.Control
                          type="date"
                          id="last-date"
                          name="toDate"
                          value={values.toDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="input-design"
                        />
                        {errors.toDate && touched.toDate ? (
                          <span className="text-danger">{errors.toDate}</span>
                        ) : null}
                      </Col>
                      <Col md="4" className="request-field-height">
                        <Form.Label>File Type</Form.Label>
                        <Form.Control
                          type="text"
                          id="file-type"
                          name="fileType"
                          placeholder="Enter File Type"
                          value={values.fileType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="input-design"
                        />
                        {errors.fileType && touched.fileType ? (
                          <span className="text-danger">{errors.fileType}</span>
                        ) : null}
                      </Col>
                      <Col md="4" className="request-field-height">
                        <Form.Label>Upload Docs</Form.Label>
                        <input
                          type="file"
                          id="upload-documents"
                          name="documents"
                          // multiple
                          onBlur={handleBlur}
                          onChange={(event) => {
                            setFieldValue("documents", event.target.files);
                          }}
                          style={{
                            fontSize: "20px",
                          }}
                        />
                        {errors.documents && touched.documents ? (
                          <span className="text-danger">
                            {errors.documents}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Group>
                    {/* <div className="form-group form-row">
                      <Col md="4" className="disease-name-height">
                        <Form.Label>Disease Name</Form.Label>
                        <input
                          type="text"
                          placeholder="Enter Disease Name"
                          id="disease-name"
                          name="diseaseName"
                          value={values.diseaseName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control input-design"
                        />
                        {errors.diseaseName && touched.diseaseName ? (
                          <span className="text-danger">
                            {errors.diseaseName}
                          </span>
                        ) : null}
                      </Col>
                      <Col md="4" className="disease-description-height">
                        <Form.Label>Disease Description</Form.Label>
                        <input
                          type="text"
                          placeholder="Enter Disease Description"
                          id="disease-description"
                          name="diseaseDescription"
                          value={values.diseaseDescription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control input-design"
                        />
                        {errors.diseaseDescription &&
                        touched.diseaseDescription ? (
                          <span className="text-danger">
                            {errors.diseaseDescription}
                          </span>
                        ) : null}
                      </Col>
                      <Col md="4" className="required-amount-height">
                        <Form.Label>Required Amount</Form.Label>
                        <input
                          type="text"
                          placeholder="Enter Required Amount"
                          id="required-amount"
                          name="requiredAmount"
                          value={values.requiredAmount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control input-design"
                        />
                        {errors.requiredAmount && touched.requiredAmount ? (
                          <span className="text-danger">
                            {errors.requiredAmount}
                          </span>
                        ) : null}
                      </Col>
                    </div>
                    <div className="form-group form-row">
                      <Col md="4" className="last-date-height">
                        <Form.Label>Last Date</Form.Label>
                        <input
                          type="date"
                          id="last-date"
                          name="toDate"
                          value={values.toDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control input-design"
                        />
                        {errors.toDate && touched.toDate ? (
                          <span className="text-danger">{errors.toDate}</span>
                        ) : null}
                      </Col>
                      <Col md="4" className="file-type-height">
                        <Form.Label>File Type</Form.Label>
                        <input
                          type="text"
                          id="file-type"
                          name="fileType"
                          placeholder="Enter File Type"
                          value={values.fileType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control input-design"
                        />
                        {errors.fileType && touched.fileType ? (
                          <span className="text-danger">{errors.fileType}</span>
                        ) : null}
                      </Col>
                      <Col md="4" className="upload-docs-height">
                        <Form.Label>Upload Docs</Form.Label>
                        <input
                          type="file"
                          id="upload-documents"
                          name="documents"
                          // multiple
                          onBlur={handleBlur}
                          onChange={(event) => {
                            setFieldValue("documents", event.target.files);
                          }}
                          style={{
                            fontSize: "20px",
                          }}
                        />
                        {errors.documents && touched.documents ? (
                          <span className="text-danger">
                            {errors.documents}
                          </span>
                        ) : null}
                      </Col>
                    </div> */}
                    {/* <div className="mb-4">
                      <b>Note : </b>{" "}
                      <span>
                        <i
                          style={{
                            color: "red",
                          }}
                        >
                          If Possible, Merge all documents in one pdf before
                          uploading.
                        </i>
                      </span>
                    </div> */}
                    <div className="text-center mt-3">
                      <Button
                        type="submit"
                        size="md"
                        className="request-submit-btn"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Form>
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

export default PatientRequest;
