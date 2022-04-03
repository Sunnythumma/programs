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
