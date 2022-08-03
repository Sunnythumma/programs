import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <div className="admin-sidebar-link">
        {!item?.subNav?.length ? (
          <Link to={item.path} onClick={item.subNav && showSubnav}>
            <div className="admin-label-color">
              {item.icon}
              <label className="admin-sidebar-label">{item.title}</label>
              {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
            </div>
          </Link>
        ) : (
          <div onClick={item.subNav && showSubnav}>
            <div className="admin-label-color">
              {item.icon}
              <label className="admin-sidebar-label">{item.title}</label>
              {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
            </div>
          </div>
        )}
      </div>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <div className="admin-dropdown-link" key={index}>
              <Link to={item.path} className="link-color">
                {item.icon}
                <label className="admin-sidebar-label">{item.title}</label>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default SubMenu;


import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import logoImage from "../../assets/images/images.jpeg";
import { AdminSidebarData } from "./AdminSidebarData";
import "../AdminSidebar/adminsidebar.scss";
import { Col } from "react-bootstrap";
import AdminSubMenu from "./AdminSubMenu";

const AdminSidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [left, setLeft] = useState("-100%");

  const showSidebar = () => {
    setSidebar(!sidebar);
    sidebar ? setLeft("-100%") : setLeft("0");
  };
  return (
    <>
      <div className="admin-nav bg-warning">
        <Col md="12">
          <div className="admin-icon-bar">
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
        </Col>
      </div>
      <div className="admin-sidebar-nav" style={{ left: left }}>
        <div className="admin-sidebar-wrap">
          <div>
            <img src={logoImage} alt="Logo Img" className="admin-image-logo" />

            <div className="admin-close-link">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </div>
          </div>
          {AdminSidebarData.map((item, index) => {
            return <AdminSubMenu item={item} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;


import React from "react";
import {
  FaPowerOff,
  FaUserInjured,
  FaUserPlus,
  FaUserTie,
  FaHospitalAlt,
  FaUserAlt,
  FaDonate,
} from "react-icons/fa";
import { MdOutlinePriorityHigh } from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { GoDashboard } from "react-icons/go";

export const AdminSidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <GoDashboard />,
  },
  {
    title: "View User",
    path: "#",
    icon: <FaUserAlt />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "View All Users",
        path: "/viewallusers",
        icon: <FaUserAlt />,
      },
      {
        title: "View Patients",
        path: "/viewpatients",
        icon: <FaUserInjured />,
      },
      {
        title: "View Donors",
        path: "/viewdonors",
        icon: <FaUserTie />,
      },
    ],
  },

  {
    title: "Hospital",
    path: "#",
    icon: <FaHospitalAlt />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "View Hospital",
        path: "/viewhospitals",
        icon: <FaHospitalAlt />,
      },
    ],
  },
  {
    title: "Request",
    path: "#",
    icon: <FaUserPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "View Request",
        path: "/viewrequest",
        icon: <FaUserPlus />,
      },
      {
        title: "Request Priority",
        path: "/viewpriorityrequest",
        icon: <MdOutlinePriorityHigh />,
      },
    ],
  },
  {
    title: "Donations",
    path: "#",
    icon: <FaDonate />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Amount Request",
        path: "/amountperrequest",
        icon: <FaDonate />,
      },
      {
        title: "Amount Per Donor",
        path: "/amountperdonor",
        icon: <FaDonate />,
      },
    ],
  },
  // {
  //   title: "View Request",
  //   path: "/viewrequest",
  //   icon: <FaUserPlus />,
  // },
  // {
  //   title: "View Hospitals",
  //   path: "/viewhospitals",
  //   icon: <FaHospitalAlt />,
  // },
  {
    title: "Logout",
    path: "/logout",
    icon: <FaPowerOff />,
  },
];

export default AdminSidebarData;


$border : 10px;

.admin-nav {
  height: 80px;
  display: flex;
  align-items: center;
}

.admin-icon-bar {
  margin-left: 100px;
  font-size: 30px;
}

.admin-sidebar-nav {
  background: #515e7e;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  transition: 350ms;
  z-index: 10;
}

.admin-sidebar-wrap {
  width: 100%;
}

.admin-close-link {
  color: #fff;
  float: right;
  margin-top: 18px;
  margin-right: $border;
  font-size: 30px;
}

.admin-close-link:hover {
  color: #212529;
}

.admin-image-logo {
  border-top-right-radius: $border;
  border-bottom-right-radius: $border;
  border-top-left-radius: $border;
  border-bottom-left-radius: $border;
  width: 50%;
  margin: 14px;
}

.admin-sidebar-link {
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
}

.admin-sidebar-link:hover {
  background: #252831;
  border-left: 4px solid #ffc107;
  cursor: pointer;
}

.admin-sidebar-label {
  margin-left: 16px;
}

.admin-label-color {
  color: #fff;
}

.admin-dropdown-link {
  background: #252831;
  height: 60px;
  padding-left: 48px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
}

.link-color {
  color: #fff;
}

.admin-dropdown-link:hover {
  background: #ffc107;
  cursor: pointer;
  .link-color {
    color: #212529;
  }
}
