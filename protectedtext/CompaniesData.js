CompaniesData.js


/------------------/

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


/-----------/

PokemonData.js

/--------/


import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

const PokemonData = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentSort, setCurrentSort] = useState("default");
  const [searchData, setSearchData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";

  const onSortChange = () => {
    let nextSort;
    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setCurrentSort(nextSort);
    if(nextSort === 'up'){
        setPokemonData(pokemonData.sort((a, b) => a.name.localeCompare(b.name)))
    }
    else if(nextSort === 'down'){
        setPokemonData(pokemonData.sort((a, b) => b.name.localeCompare(a.name)))
    }
    else{
        setPokemonData(pokemonData)
    }
    
  };

  const fetchData = () => {
    axios
    .get(pokemonUrl)
    .then((res) => {
      console.log(res);
      setPokemonData(res.data.results);
      setSearchData(res.data.results)
    })
    .catch((err) => {
      console.log(err);
    });

  }

  const handleSearch = (e) => {
      if(e.target.value === "") {
        setPokemonData(searchData) 
      } else {
        const value = e.target.value.toLowerCase();
        let result = [];
        result = searchData.filter((data) => {
            return data.name.search(value) !== -1 || data.url.search(value) !== -1;
        })
       setPokemonData(result)   
      }
           
  }

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  }

  useEffect(() => {
    fetchData()
  }, []);

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = pokemonData.slice(indexOfFirstTodo, indexOfLastTodo);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pokemonData.length / 10); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <Button
        key={number}
        id={number}
        onClick={(e) => handleClick(e)}
      >
        {number}
      </Button>
    );
  });

  return (
    <div>
        <input type='text' placeholder="Search Name" onChange={(e) => handleSearch(e)}/>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>
              Name
              <button onClick={() => onSortChange()}>
                Sort
              </button>
            </th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {/* {[...pokemonData].sort(sortTypes[currentSort].fn).map((p) => (
            <tr>
              <td>${p.name}b</td>
              <td>{p.url}</td>
            </tr>
          ))} */}
          {currentTodos.map((data,index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.url}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
    </div>
  );
};

export default PokemonData;

/----------------
Microsoft Windows [Version 10.0.19043.1586]
(c) Microsoft Corporation. All rights reserved.

C:\Users\DELL>cd OneDrive

C:\Users\DELL\OneDrive>cd Desktop

C:\Users\DELL\OneDrive\Desktop>git clone https://github.com/Sunnythumma/programs.git
Cloning into 'programs'...
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (6/6), done.

C:\Users\DELL\OneDrive\Desktop>cd programs

C:\Users\DELL\OneDrive\Desktop\programs>git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        CompaniesData.js
        PokemonData.js

nothing added to commit but untracked files present (use "git add" to track)

C:\Users\DELL\OneDrive\Desktop\programs>git add CompaniesData.js PokemonData.js

C:\Users\DELL\OneDrive\Desktop\programs>git commit -m "React Task"
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'DELL@DESKTOP-L3I2L0U.(none)')

C:\Users\DELL\OneDrive\Desktop\programs>git config --global user.email "sunnythumma111@gmail.com"

C:\Users\DELL\OneDrive\Desktop\programs>git config --global user.name "Sunnythumma"

C:\Users\DELL\OneDrive\Desktop\programs>git commit -m "React Task"
[main bb3ea1a] React Task
 2 files changed, 260 insertions(+)
 create mode 100644 CompaniesData.js
 create mode 100644 PokemonData.js

C:\Users\DELL\OneDrive\Desktop\programs>git push
Select an authentication method for 'https://github.com/':
  1. Web browser (default)
  2. Personal access token
option (enter for default): 1
info: please complete authentication in your browser...
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 2.39 KiB | 2.39 MiB/s, done.
Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/Sunnythumma/programs.git
   6194170..bb3ea1a  main -> main

C:\Users\DELL\OneDrive\Desktop\programs>

C:\Users\DELL\OneDrive\Desktop\programs>
