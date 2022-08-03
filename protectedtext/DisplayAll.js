DisplayAll.js

----------
import React, { useState } from "react";
import { data } from "./data";
import Select from "react-select";

const DisplayAll = () => {
  const [filterType, setFilterType] = useState([]);
  const [filterActor, setFilterActor] = useState([]);
  const [filterGenre, setFilterGenre] = useState([]);

  const type = [];
  const genres = [];
  const actors = [];
  const typeArray = [];
  const genreArray = [];
  const actorsArray = [];

  data.map((item) => {
    const genre = item.Genre.split(", ");
    const actor = item.Actors.split(", ");

    type.push(item.Type);
    genre.map((item) => {
      genres.push(item);
    });
    actor.map((item1) => {
      actors.push(item1);
    });
    // console.log('Genres---',genres);
    // console.log('Actors---',actors);
    // console.log('Type:',type);
  });

  type.map((item1) => {
    let f = false;
    typeArray.map((item2) => {
      if (item1 === item2) {
        f = true;
      }
    });
    if (f === false) {
      typeArray.push(item1);
    }
  });

  genres.map((item1) => {
    let f = false;
    genreArray.map((item2) => {
      if (item1 === item2) {
        f = true;
      }
    });
    if (f === false) {
      genreArray.push(item1);
    }
  });

  actors.map((item1) => {
    let f = false;
    actorsArray.map((item2) => {
      if (item1 === item2) {
        f = true;
      }
    });
    if (f === false) {
      actorsArray.push(item1);
    }
  });

  // console.log('Genres Array---', genreArray);
  // console.log('Actors Array---', actorsArray);
  console.log('Types Array---', typeArray);

  const handleType = (e) => {
    let type = e.target.value;
    let arr = [...filterType];

    if (arr.includes(type)) {
      arr.splice(arr.indexOf(type), 1);
      setFilterType([...arr]);
    } else {
      setFilterType([...arr, type]);
    }

    console.log("FilteredType----", filterType);
  };

  const handleGenre = (e) => {
    let genre = e.target.value;
    let arr = [...filterGenre];

    if (arr.includes(genre)) {
      arr.splice(arr.indexOf(genre), 1);
      setFilterGenre([...arr]);
    } else {
      setFilterGenre([...arr, genre]);
    }

    console.log("Filtered Genre----", filterGenre);
  };

  const handleActor = (e) => {
    let actor = e.target.value;
    let arr = [...filterActor];
    if (arr.includes(actor)) {
      arr.splice(arr.indexOf(actor), 1);
      setFilterActor([...arr]);
    } else {
      setFilterActor([...arr, actor]);
    }

    console.log("Filtered Actor----", filterActor);
  };

  let filterData =
    filterType.length > 0
      ? data.filter((item) => {
          const types = item.Type.split(", ");

          for (let element of filterType) {
            if (types.includes(element)) {
              return true;
            }
          }
        })
      : data;

  filterData =
    filterActor.length > 0
      ? filterData.filter((item) => {
          const actors = item.Actors.split(", ");

          for (let element of filterActor) {
            if (actors.includes(element)) {
              return true;
            }
          }
        })
      : filterData;

  filterData =
    filterGenre.length > 0
      ? filterData.filter((item) => {
          const genre = item.Genre.split(", ");

          for (let element of filterGenre) {
            if (genre.includes(element)) {
              return true;
            }
          }
        })
      : filterData;

  return (
    <div className="container">
      <div className=" m-5">
        <div className="dropdown row">
            {/* {typeArray.map(() => ( */}

            
          {/* <Select
            isMulti
            name="types"
            options={typeArray}
            className="type-multi-select"
            classNamePrefix="type-  select"
          /> */}
          {/* ))} */}

          <div className="col-md-4">
            <button type="button" className="btn btn-primary dropdown-toggle mr-3 w-50 " data-toggle="dropdown">
              Type
            </button>
            <div className="dropdown-menu">
              {typeArray.map((type, index) => (
                <div>
                  <input type='checkbox' value={type} key={index} onChange={(e) => handleType(e)} /> {type} </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle mr-3 w-50"
              data-toggle="dropdown"
            >
              Actors
            </button>
            <div className="dropdown-menu">
              {actorsArray.map((actor, index) => (
                <div>
                  <input
                    type="checkbox"
                    value={actor}
                    key={index}
                    onChange={(e) => handleActor(e)}
                  />{" "}
                  {actor}{" "}
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle w-50"
              data-toggle="dropdown"
            >
              Genre
            </button>
            <div className="dropdown-menu">
              {genreArray.map((genre, index) => (
                <div>
                  <input
                    type="checkbox"
                    value={genre}
                    key={index}
                    onChange={(e) => handleGenre(e)}
                  />{" "}
                  {genre}{" "}
                </div>
              ))}
            </div>
          </div>
        </div>

        <table className="table mt-5" border="2">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Actors</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {filterData.map((item, index) => (
              <tr key={index}>
                <td>{item.Title}</td>
                <td>{item.Type}</td>
                <td>{item.Actors}</td>
                <td>{item.Genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayAll;



2------------------------

CompaniesData.js

import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Pagination from "./Pagination";

const CompaniesData = () => {
  const [companyData, setCompanyData] = useState([]);
  const [filterGender, setFilterGender] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [datasPerPage] = useState(5);
  const [currentData, setCurrentData] = useState([]);
  const companiesUrl = "https://fakerapi.it/api/v1/companies";

  const gender = [];
  const genderArray = [];


  {companyData.forEach((item) => {
    gender.push(item.contact.gender)
    // console.log('Gender---',gender);
  })}

  {gender.forEach((item1) => {
    let f = false;
    genderArray.forEach((item2) => {
      if(item1 === item2){
        f = true;
      }
    })
    if(f === false){
        genderArray.push(item1)
    }
  })
  // console.log('GenderArray ',genderArray);
  }

  const handleGender = (e) => {
    let gender = e.target.value;
    let arr = [...filterGender];

    if(arr.includes(gender)){
      arr.splice(arr.indexOf(gender),1)
      setFilterGender([...arr])
    }else{
      setFilterGender([...arr,gender])
    }
  }

  let filterData = 
      filterGender.length > 0 
      ? companyData.filter((item) => {
        const genders = item.contact.gender.split(', ')
        for(let ele of filterGender){
          if(genders.includes(ele)){
            return true;
          }
        }
      })

      : currentData



  const fetchCompnayData = () => {
    fetch(companiesUrl)
      .then((response) => response.json())
      .then((results) => {
        const result = results.data
        setCompanyData(result);
        const pageLastIndex = currentPage * datasPerPage;
        const pageFirstIndex = pageLastIndex - datasPerPage;
        const currentData = result.slice(pageFirstIndex, pageLastIndex);        
        setCurrentData(currentData)
      })
      .catch((error) => console.log(error));
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchCompnayData();
  }, [currentPage]);



  return (

    <>
      <div>
        <p className="text-center font-weight-bold">Companies Data</p>
        <div className="dropdown text-center mb-5">
          <button
            className="btn btn-info dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            
              {genderArray.map((data,index) => (
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.addresses[0].city}</td>
                <td>{data.contact.gender}</td>
              </tr>
            ))}
            {/* {filterGender.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.addresses[0].city}</td>
                <td>{data.contact.gender}</td>
              </tr>
            ))} */}
          </tbody>
        </Table>
        <Pagination
        datasPerPage={datasPerPage}
        totalDatas={companyData.length}
        paginate={paginate}
        />
      </div>
    </>
  );
};

export default CompaniesData;


---
PokemonData.js
import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import "../style.css";

const PokemonData = () => {
  const [datas, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  // const [sortedData, setSortedData] = useState([]);
  const [currentSort, setCurrentSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [datasPerPage] = useState(10);
  const [currentData, setCurrentData] = useState([]);
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => {
        const result = data.results;
        setData(result);

        const pageLastIndex = currentPage * datasPerPage;
        const pageFirstIndex = pageLastIndex - datasPerPage;
        const currentData = result.slice(pageFirstIndex, pageLastIndex);
        setSearchData(currentData);
        setCurrentData(currentData)
        
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchName = (e) => {
    const search = e.target.value;

    let dataSearch =
      search !== ""
        ? datas.filter((data) => {
            return data.name.toLowerCase().includes(search.toLowerCase());
            // || data.url.toLowerCase().includes(search.toLowerCase())
          })
        : currentData;
    setSearchData(dataSearch);
    // console.log('-----cc--',currentData);
    // setData(dataSearch);
    // console.log('Datas',datas);
  };

  const handleSortName = () => {
    if (currentSort === "up") {
      const sortedData = [...datas];
      sortedData.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
      });
      setCurrentSort("down");
      setSearchData(sortedData);
    } else if (currentSort === "down") {
      const sortedData = [...datas];
      sortedData.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
      });
      setCurrentSort("default");
      setSearchData(sortedData);
    } else {
      setCurrentSort("up");
      setSearchData(datas);
      console.log("-------", datas);
    }
  };


  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <div>
        <p className="text-center font-weight-bold">PokemonData</p>

        <input
          type="text"
          id="search"
          name="search"
          onChange={(e) => handleSearchName(e)}
          placeholder="Search Name or Url"
          className="form-control mb-4"
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                Name{" "}
                <Button className="btn" onClick={() => handleSortName()}>
                  <i className="fa fa-arrow-up " aria-hidden="true"></i>{" "}
                  <i className="fa fa-arrow-down " aria-hidden="true"></i>{" "}
                </Button>
              </th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.url}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <ul>{renderPageNumbers}</ul> */}
        <Pagination
        datasPerPage={datasPerPage}
        totalDatas={datas.length}
        paginate={paginate}
      />
      </div>
    </>
  );
};

export default PokemonData;


-----

Pagination.js

import React from "react";

const Pagination = ({ datasPerPage, totalDatas, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalDatas / datasPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <button
            className="btn btn-primary"
            id={number}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </ul>
    </>
  );
};

export default Pagination;

3---

index.js


import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

const DataTable = () => {
  const [datas, setData] = useState([]);
  const [toggleButton, setToggleButton] = useState(true);

  const urls = "https://pokeapi.co/api/v2/pokemon";
  const navigate = useNavigate();

const handleButtonClick = (url) => {
    navigate('/data',{state:[url,toggleButton]});
}

const handleToggleButton = () => {
    setToggleButton(!toggleButton)    
}

  const fetchData = () => {
    fetch(urls)
      .then((response) => response.json())
      .then((data) => setData(data.results))

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const array = datas.slice(0, 10);

  return (
    <div>        
       <Button color="success" onClick={() => handleToggleButton()}>{toggleButton ? "TRUE" : "FALSE"}</Button>{" "}
              
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>            
          </tr>
        </thead>
        <tbody>
          {array.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>
                <Button color="info" onClick={() => handleButtonClick(data.url)}>Read More</Button>{" "}
              </td>              
            </tr>
          ))}
        </tbody>        
      </Table>
    </div>
  );
};

export default DataTable;


---

data.js


import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useLocation } from "react-router-dom";
import axios from 'axios'

const Data = () => {

    const [data, setData] = useState([]);       
    const location = useLocation();
    
    console.log(',,,,,,,,,',location.state);
    
    const fetchData = () => {
               
        fetch(location.state[0])
          .then((response) => response.json())
          .then((data) => setData(data.abilities))              
          .catch((error) => {
            console.log(error);
          });
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      
  return (
    <div>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Name</th>  
            <th>Is Hidden</th>            
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
              if(data.is_hidden === location.state[1]){
                return <tr key={index}>
                <td>{data.ability.name}</td>
                <td>{String(data.is_hidden)}</td>
              </tr>
              }                         
            })}
        </tbody>        
      </Table>      
    </div>
  )
}

export default Data



4-----






