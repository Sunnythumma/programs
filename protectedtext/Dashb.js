import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import baseUrl from "../../utils/baseUrl";
import "./dashboard.scss";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalPatient, setTotalPatient] = useState([]);
  const [totalDonor, setTotalDonor] = useState([]);
  const [totalRequest, setTotalRequest] = useState([]);

  const patientUrl = `${baseUrl}/user/showPatients`;
  const donorUrl = `${baseUrl}/user/showDoners`;
  const requestUrl = `${baseUrl}/request`;

  const token = localStorage.getItem("token");

  const data = {
    labels: ["Patients", "Donors", "Requests"],
    datasets: [
      {
        label: "# of Votes",
        // data: [52, 31, 38],
        data: [totalPatient, totalDonor, totalRequest],
        backgroundColor: ["#ff634780", "#2e8b5780", "#9acd3280"],
        borderColor: ["#ff6347", "#2e8b57", "#9acd32"],
        borderWidth: 1,
      },
    ],
  };

  const getTotalPatients = async () => {
    await axios
      .get(patientUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        setTotalPatient(data.data.data.total);
      })
      .catch((e) => console.log("err", e));
  };

  const getTotalDonors = async () => {
    await axios
      .get(donorUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        setTotalDonor(data.data.data.total);
      })
      .catch((e) => console.log("err", e));
  };

  const getTotalRequests = async () => {
    await axios
      .get(requestUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        setTotalRequest(data.data.data.total);
      })
      .catch((e) => console.log("err", e));
  };

  useEffect(() => {
    getTotalPatients();
    getTotalDonors();
    getTotalRequests();
  });

  return (
    <>
      <AdminSidebar />
      <section className="admin-dashboard">
        <div className="dashboard-margin">
          <div className="dashboard-card">
            <Card className="card-dashboard">
              <Card.Body>
                <Row className="d-flex justify-content-center align-items-center">
                  <Col md="7" className="flex-wrap">
                    <Card.Title>PATIENTS</Card.Title>
                    <Card.Text>Number of Patients</Card.Text>
                    <Card.Text className="card-text-size">
                      {totalPatient}
                    </Card.Text>
                  </Col>

                  <Col md="5" className="card-chart danger flex-wrap">
                    <span className="fa fa-line-chart"></span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="card-dashboard">
              <Card.Body>
                <Row className="d-flex justify-content-center align-items-center">
                  <Col md="7" className="flex-wrap">
                    <Card.Title>DONORS</Card.Title>
                    <Card.Text>Number of Donors</Card.Text>
                    <Card.Text className="card-text-size">
                      {totalDonor}
                    </Card.Text>
                  </Col>

                  <Col md="5" className="card-chart success flex-wrap">
                    <span className="fa fa-line-chart"></span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="card-dashboard">
              <Card.Body>
                <Row className="d-flex justify-content-center align-items-center">
                  <Col md="7" className="flex-wrap">
                    <Card.Title>DONATIONS</Card.Title>
                    <Card.Text>Total Received Amount</Card.Text>
                    <Card.Text className="card-text-size">
                      &#8377;15,22,123
                    </Card.Text>
                  </Col>

                  <Col md="5" className="card-chart yellow flex-wrap">
                    <span className="fa fa-line-chart"></span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="card-dashboard">
              <Card.Body>
                <Row className="d-flex justify-content-center align-items-center">
                  <Col md="7" className="flex-wrap">
                    <Card.Title>REQUESTS</Card.Title>
                    <Card.Text>Number of Requests</Card.Text>
                    <Card.Text className="card-text-size">
                      {totalRequest}
                    </Card.Text>
                  </Col>

                  <Col md="5" className="card-chart warning flex-wrap">
                    <span className="fa fa-line-chart"></span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="jobs-grid">
          <div className="analytics-card">
            <div className="analytics-head">
              <h3>Total Patients Monthly Criteria </h3>
            </div>

            <div className="analytics-chart">
              <div className="chart-circle patient">
                <h1>33%</h1>
              </div>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-head">
              <h3>Total Donors Monthly Criteria </h3>
            </div>

            <div className="analytics-chart">
              <div className="chart-circle donor">
                <h1>27%</h1>
              </div>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-head">
              <h3>Donation Amount Monthly Criteria </h3>
            </div>

            <div className="analytics-chart">
              <div className="chart-circle request">
                <h1>30%</h1>
              </div>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-head">
              <h3>Total Requests Monthly Criteria </h3>
            </div>

            <div className="analytics-chart">
              <div className="chart-circle amount">
                <h1>43%</h1>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="mt-5"
          style={{
            width: "600px",
            height: "400px",
            marginLeft: "300px",
          }}
        >
          <p className="mb-3" style={{ fontSize: "24px" }}>
            Chart According to Patients, Donors and Requests
          </p>
          <Pie data={data} />
        </div> */}
      </section>
    </>
  );
};

export default Dashboard;


$cardFontSize: 100px;
$successColor: #2e8b57;
$yellowColor: #9acd32;
$dangerColor: #ff6347;
$warningColor: #8a2be2;
$danger: ff6347;
$yellow: 9acd32;
$success: 2e8b57;
$warning: 8a2be2;

.admin-dashboard {
  padding: 25px;
  // background: #f1f5f9;
  height: 90vh;
}

.dashboard-margin {
  margin-left: 250px;
}

.card-text-size {
  font-size: 24px;
}

.dashboard-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 48px;
  margin-top: 32px;
}
// border: 2px solid #ffc107;

.card-dashboard {
  border: 2px solid #ffc107;
}

.card-chart.success span {
  font-size: $cardFontSize;
  color: $successColor;
}
.card-chart.yellow span {
  font-size: $cardFontSize;
  color: $yellowColor;
}
.card-chart.danger span {
  font-size: $cardFontSize;
  color: $dangerColor;
}

.card-chart.warning span {
  font-size: $cardFontSize;
  color: $warningColor;
}

.jobs-grid {
  margin: 64px 0px 0px 250px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  // grid-template-columns: auto 66%;
  grid-gap: 14px;
}

.analytics-card {
  background: #fff;
  padding: 24px;
  // border: 1px solid #d3d3d3;
  border: 2px solid #ffc107;
}

.analytics-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.chart-circle {
  height: 150px;
  width: 150px;
  display: grid;
  place-items: center;
  margin: auto;
  border-radius: 50%;
  margin-bottom: 35px;
}

// .chart-circle.patient {
//   border-left: 10px solid ff6347;
//   border-right: 10px solid #ff6347;
//   border-bottom: 10px solid ff6347;
//   border-top: 10px solid #ff6347;
// }

//button-hover-effect
// .btn:hover {
//   background-color: white;
//   color: black;
//   transform: translate(-4px, -4px);
//   box-shadow: 4px 4px 0 0 #007bff;
// }

.chart-circle.patient {
  border-left: 10px solid $danger;
  border-right: 10px solid $dangerColor;
  border-bottom: 10px solid $danger;
  border-top: 10px solid $dangerColor;
}
.chart-circle.donor {
  border-left: 10px solid $success;
  border-right: 10px solid $successColor;
  border-bottom: 10px solid $successColor;
  border-top: 10px solid $success;
}
.chart-circle.request {
  border-left: 10px solid $yellowColor;
  border-right: 10px solid $yellow;
  border-bottom: 10px solid $yellowColor;
  border-top: 10px solid $yellow;
}
.chart-circle.amount {
  border-left: 10px solid $warningColor;
  border-right: 10px solid $warning;
  border-bottom: 10px solid $warning;
  border-top: 10px solid $warningColor;
}

@media only screen and (max-width: 1298px) {
  .dashboard-card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 1124px) {
  .dashboard-card {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 768px) {
  .dashboard-card {
    grid-template-columns: repeat(2, 1fr);
  }
  .jobs-grid {
    grid-template-columns: 100%;
  }
}
@media only screen and (max-width: 767px) {
  .dashboard-card {
    grid-template-columns: repeat(1, 1fr);
  }
}
