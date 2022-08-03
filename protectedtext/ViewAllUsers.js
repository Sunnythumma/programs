import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import ReactPaginate from "react-paginate";
import Loading from "../Loading";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import { FaEye, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState("default");
  const [status, setStatus] = useState("");
  const [active, setActive] = useState("all");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get(`${baseUrl}/user?pageNo=${currentPage}&size=10&status=${status}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((data) => {
          setUsers(data.data.data.users);
          setPageCount(Math.ceil(data.data.data.total / 10));
        })
        .catch((e) => console.log("er", e));
    };
    getUsers();
  }, [currentPage, status, token]);

  const handlePageClick = (event) => {
    setSearchData([]);
    setCurrentPage(event.selected + 1);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    let dataSearch = search
      ? users.filter((data) => {
          return (
            data.firstName?.toLowerCase().includes(search?.toLowerCase()) ||
            data.lastName?.toLowerCase().includes(search?.toLowerCase()) ||
            data.phoneNo?.toString().includes(search?.toString()) ||
            data.email?.toLowerCase().includes(search?.toLowerCase()) ||
            data.gender?.toLowerCase()?.includes(search?.toLowerCase()) ||
            data.address?.state
              ?.toLowerCase()
              .includes(search?.toLowerCase()) ||
            data.role?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            data.status?.toLowerCase().includes(search?.toLowerCase())
          );
        })
      : users;
    setSearchData([...dataSearch]);
  };

  const handleSortFirstName = () => {
    if (currentSort === "up") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(users);
    }
  };

  const handleSortLastName = () => {
    if (currentSort === "up") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(users);
    }
  };

  const handleSortPhoneNo = () => {
    if (currentSort === "up") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.phoneNo < b.phoneNo) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.phoneNo > b.phoneNo) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(users);
    }
  };
  const handleSortEmail = () => {
    if (currentSort === "up") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.email.toLowerCase() > b.email.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(users);
    }
  };
  const handleSortGender = () => {
    if (currentSort === "up") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.gender?.toLowerCase() < b.gender?.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.gender?.toLowerCase() > b.gender?.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(users);
    }
  };
  const handleSortState = () => {
    if (currentSort === "up") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.address?.state?.toLowerCase() < b.address?.state?.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.address?.state?.toLowerCase() > b.address?.state?.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(users);
    }
  };
  const handleSortRole = () => {
    if (currentSort === "up") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.role.name.toLowerCase() < b.role.name.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.role.name.toLowerCase() > b.role.name.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(users);
    }
  };
  const handleSortStatus = () => {
    if (currentSort === "up") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.status.toLowerCase() < b.status.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...users];
      sortedData.sort((a, b) => {
        if (a.status.toLowerCase() > b.status.toLowerCase()) {
          return -1;
        } else {
          return null;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(users);
    }
  };

  return (
    <>
      <AdminSidebar />
      {users && users.length > 0 ? (
        <>
          <section className="view-all-users-section">
            <Container fluid>
              <div className="p-3">
                <Col>
                  <h1 className="mb-3 text-center">View All Users</h1>
                </Col>
                <Row className="d-flex flex-wrap mb-4">
                  <Col md="6">
                    <input
                      type="text"
                      id="search"
                      name="search"
                      onChange={(e) => handleSearch(e)}
                      placeholder="Search"
                      className="form-control w-50 search-margin input-design"
                    />
                  </Col>
                  <Col md="6" className="d-flex justify-content-end">
                    <div className="btn-group status-margin">
                      <Button
                        className="status-btn-border-radius"
                        active={active === "all"}
                        onClick={() => {
                          setStatus("");
                          setActive("all");
                        }}
                        variant="outline-primary"
                      >
                        All
                      </Button>
                      <Button
                        className="status-btn-border-radius"
                        active={active === "active"}
                        onClick={() => {
                          setStatus("active");
                          setActive("active");
                        }}
                        variant="outline-success"
                      >
                        Active
                      </Button>
                      <Button
                        className="status-btn-border-radius"
                        active={active === "pending"}
                        onClick={() => {
                          setStatus("pending");
                          setActive("pending");
                        }}
                        variant="outline-warning"
                      >
                        Pending
                      </Button>
                      <Button
                        className="status-btn-border-radius"
                        active={active === "rejected"}
                        onClick={() => {
                          setStatus("rejected");
                          setActive("rejected");
                        }}
                        variant="outline-danger"
                      >
                        Rejected
                      </Button>
                      <Button
                        className="status-btn-border-radius"
                        active={active === "suspended"}
                        onClick={() => {
                          setStatus("suspended");
                          setActive("suspended");
                        }}
                        variant="outline-danger"
                      >
                        Suspended
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row className="d-flex flex-wrap justify-content-center row-margin">
                  <div className="table-width">
                    <Table striped hover responsive>
                      <thead>
                        <tr>
                          <th>
                            First Name
                            <span onClick={handleSortFirstName}>
                              <FaSort />
                            </span>
                          </th>
                          <th>
                            Last Name
                            <span onClick={handleSortLastName}>
                              <FaSort />
                            </span>
                          </th>
                          <th>
                            Phone No
                            <span onClick={handleSortPhoneNo}>
                              <FaSort />
                            </span>
                          </th>
                          <th>
                            Email
                            <span onClick={handleSortEmail}>
                              <FaSort />
                            </span>
                          </th>
                          <th>
                            Gender
                            <span onClick={handleSortGender}>
                              <FaSort />
                            </span>
                          </th>
                          <th>
                            State
                            <span onClick={handleSortState}>
                              <FaSort />
                            </span>
                          </th>
                          <th>
                            Role
                            <span onClick={handleSortRole}>
                              <FaSort />
                            </span>
                          </th>
                          <th>
                            Status
                            <span onClick={handleSortStatus}>
                              <FaSort />
                            </span>
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchData.length === 0
                          ? users.map((userData, index) => {
                              return (
                                <tr key={index}>
                                  <td>{userData.firstName}</td>
                                  <td>{userData.lastName}</td>
                                  <td>{userData.phoneNo}</td>
                                  <td>{userData.email}</td>
                                  <td>
                                    {userData.gender ? userData.gender : "null"}
                                  </td>
                                  <td>
                                    {userData.address
                                      ? userData.address.state
                                      : "null"}
                                  </td>
                                  <td>{userData.role.name}</td>
                                  <td>
                                    <span
                                      className={`badge badge-pill badge-${
                                        userData.status === "active"
                                          ? "success"
                                          : userData.status === "pending"
                                          ? "warning"
                                          : "danger"
                                      }`}
                                    >
                                      {userData ? userData?.status : "null"}
                                    </span>
                                  </td>
                                  <td>
                                    <span>
                                      <FaEye
                                        size={25}
                                        onClick={() =>
                                          navigate("/userviewdetail", {
                                            state: { data: userData },
                                          })
                                        }
                                      />
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          : searchData.map((userData, index) => {
                              return (
                                <tr key={index}>
                                  <td>{userData.firstName}</td>
                                  <td>{userData.lastName}</td>
                                  <td>{userData.phoneNo}</td>
                                  <td>{userData.email}</td>
                                  <td>
                                    {userData.gender ? userData.gender : "null"}
                                  </td>
                                  <td>
                                    {userData.address
                                      ? userData.address.state
                                      : "null"}
                                  </td>
                                  <td>{userData.role.name}</td>
                                  <td>
                                    <span
                                      className={`badge badge-pill badge-${
                                        userData.status === "active"
                                          ? "success"
                                          : userData.status === "pending"
                                          ? "warning"
                                          : "danger"
                                      }`}
                                    >
                                      {userData ? userData?.status : "null"}
                                    </span>
                                  </td>
                                  <td>
                                    <span>
                                      <FaEye
                                        size={25}
                                        onClick={() =>
                                          navigate("/userviewdetail", {
                                            state: { data: userData },
                                          })
                                        }
                                      />
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-end mt-4">
                      <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={4}
                        renderOnZeroPageCount={null}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </Row>
              </div>
            </Container>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ViewAllUsers;
