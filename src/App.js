import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [listOfTodos, setListOfTodos] = useState([]);
  const [numOfTodosPerPage, setNumOfTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setListOfTodos(res.data));
  }, []);
  const numOfTotalPages = Math.ceil(listOfTodos.length / numOfTodosPerPage);
  const pages1 = [...Array(numOfTotalPages + 1).keys()].slice(1);
  const lastIndex = currentPage * numOfTodosPerPage;
  const firstIndex = lastIndex - numOfTodosPerPage;
  const visibleTodos = listOfTodos.slice(firstIndex, lastIndex);

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage !== 20) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="App">
      <label>Todos per Page</label>
      <select onChange={(e) => setNumOfTodosPerPage(e.target.value)}>
        <option value="" key="">
          10
        </option>
        <option>20</option>
        <option>30</option>
        <option>40</option>
        <option>50</option>
      </select>
      {visibleTodos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <div className="pagination">
        <p className="prevPage" onClick={handlePrevPage}>
          prev
        </p>
        {pages1.map((page) => (
          <span
            key={page}
            className={`${currentPage === page ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >{` ${page} `}</span>
        ))}
        <p className="nextPage" onClick={handleNextPage}>
          next
        </p>
      </div>
    </div>
  );
}

export default App;
