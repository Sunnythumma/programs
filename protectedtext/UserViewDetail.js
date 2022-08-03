import React, { useState } from "react";
import { ImProfile } from "react-icons/im";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import team1 from "../../assets/images/team1.jpg";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";
import ShowModal from "../Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserViewDetail = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isModalShow, setIsModalShow] = useState(false);
  const {
    state: { data },
  } = useLocation();

  const toggleModal = () => {
    setIsModalShow(!isModalShow);
  };

  const updateStatus = async (userId, status) => {
    await axios
      .put(
        `${baseUrl}/admin/updateUserStatus/${userId}?status=${status}`,
        { status: status },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((data) => {
        toast.success("Status Updated Successfully ...!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => navigate("/viewallusers"), 6000);
        console.log("data", data);
      })
      .catch((e) => {
        console.log(e);
      });
    toggleModal();
  };

  return (
    <>
      <AdminSidebar />
      <section className="view-detail-section">
        <div className="font-weight-bold text-center mb-5 mt-3 detail-text-size">
          <ImProfile /> User Detail
        </div>
        <Container className="w-50">
          <Card className="mb-5 card-detail-style">
            <Card.Body>
              <Row className="d-flex justify-content-center align-items-center mt-3 mb-3">
                <Col md="4">
                  <img
                    src={team1}
                    // src={`${baseUrl}/${data.photo}`}
                    alt="Profile Img"
                    className="img-detail"
                  />
                </Col>
                <Col md="4">
                  <h1>{data?.firstName}</h1>
                  <h3>Role : {data?.role.name}</h3>
                </Col>
              </Row>
              <hr />
              <Row className="text-center">
                <Col>
                  First Name : <span>{data?.firstName}</span>
                </Col>
                <Col>
                  Last Name : <span>{data?.lastName}</span>
                </Col>
              </Row>
              <hr />
              <Row className="text-center">
                <Col>
                  Phone No : <span>{data?.phoneNo}</span>
                </Col>
                <Col>
                  Email : <span>{data?.email}</span>
                </Col>
              </Row>
              <hr />
              <Row className="text-center">
                <Col>
                  Role : <span>{data?.role.name}</span>
                </Col>
                <Col>
                  Status :{" "}
                  <span
                    className={`badge badge-pill badge-${
                      data.status === "active"
                        ? "success"
                        : data.status === "pending"
                        ? "warning"
                        : "danger"
                    }`}
                  >
                    {data?.status}
                  </span>
                </Col>
              </Row>
              <hr />
              <Row className="text-center">
                <Col>
                  Gender : <span>{data?.gender ? data?.gender : "null"}</span>
                </Col>
                <Col>
                  State :{" "}
                  <span>{data?.address ? data?.address?.state : "null"}</span>
                </Col>
              </Row>
              <hr />
              <Row className="text-center">
                <Col>
                  City :{" "}
                  <span>{data?.address ? data?.address.city : "null"}</span>
                </Col>
                <Col>
                  Street :{" "}
                  <span>{data?.address ? data.address?.street : "null"}</span>
                </Col>
              </Row>
              <hr />
              <Row className="text-center">
                <Col>
                  Pincode :{" "}
                  <span>{data?.address ? data?.address?.pincode : "null"}</span>
                </Col>
                <Col></Col>
              </Row>
              <hr />
              <Row className="d-flex justify-content-center align-items-center">
                <Col className="text-center">
                  <Button onClick={() => navigate(-1)} className="back-btn">
                    Back To Data
                  </Button>
                </Col>
                <Col className="text-center">
                  <Button onClick={toggleModal} className="update-btn">
                    Update Status
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        {isModalShow && (
          <ShowModal
            header="User Detail"
            body={
              <>
                <div>
                  <p className="font-weight-bold modal-text-size">
                    Are you sure you want to update status of this user
                  </p>
                  <hr />
                  <div className="d-flex justify-content-end">
                    {(data.status === "rejected" ||
                      data.status === "suspended" ||
                      data.status === "active") && (
                      <Button
                        className="pending-btn mr-2"
                        variant="warning"
                        onClick={() => updateStatus(data._id, "pending")}
                      >
                        Pending
                      </Button>
                    )}
                    {(data.status === "rejected" ||
                      data.status === "suspended" ||
                      data.status === "pending") && (
                      <Button
                        className="active-btn mr-2"
                        variant="success"
                        onClick={() => updateStatus(data._id, "active")}
                      >
                        Active
                      </Button>
                    )}

                    {data.status === "active" && (
                      <Button
                        className="suspend-btn"
                        variant="danger"
                        onClick={() => updateStatus(data._id, "suspended")}
                      >
                        Suspend
                      </Button>
                    )}
                    {data.status === "pending" && (
                      <Button
                        className="reject-btn"
                        variant="danger"
                        onClick={() => updateStatus(data._id, "rejected")}
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </div>
              </>
            }
            handleShow={toggleModal}
          />
        )}
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

export default UserViewDetail;
