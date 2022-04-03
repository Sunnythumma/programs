import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const CompaniesData = () => {
  const [companies, setCompData] = useState([]);
  const [filterGender, setFilterGender] = useState([]);
  const compUrl = "https://fakerapi.it/api/v1/companies";

  const gender = [];
  const genderArray = [];

  {
    companies.map((item) => {
      gender.push(item.contact.gender);
      //   console.log('--------',gender);
    });
  }

  {
    gender.map((item1) => {
      let f = false;
      genderArray.map((item2) => {
        if (item1 === item2) {
          f = true;
        }
      });
      if (f === false) {
        genderArray.push(item1);
      }
      console.log("-------", genderArray);
    });
  }

  const handleGender = (e) => {
    let gender = e.target.value;
    let arr = [...filterGender];
    
    if (arr.includes(gender)) {
      arr.splice(arr.indexOf(gender), 1)
      setFilterGender([...arr])
    } else {
        setFilterGender([...arr, gender])
    }

    console.log('FilteredGender----', filterGender);

  }

  let filterData =
  filterGender.length > 0
      ? companies.filter((item) => {
        const genders = item.contact.gender.split(', ');

        for (let element of filterGender) {
          if (genders.includes(element)) {
            return true;
          }
        }
      })
      : companies;

  useEffect(() => {
    axios
      .get(compUrl)
      .then((res) => {
        console.log(res);
        setCompData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   console.log("companies", companies);

  return (
    <div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Gender
        </button>
        <div className="dropdown-menu">
          {genderArray.map((data, index) => (
            <div>
              <input
                type="checkbox"
                value={data}
                key={index}
                onChange={(e) => handleGender(e)}
              />{" "}
              {data}{" "}
            </div>
          ))}
        </div>
      </div>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {/* {companies.slice(0, 10).map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.contact.gender}</td>
            </tr>
          ))} */}
          {filterData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.contact.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompaniesData;
