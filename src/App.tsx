/**
 * App component, houses the nav menu, header and also routing for the pages in our to-do list
 * Components are lazyloaded where possible for performance gains
 * Memoization is also implemented where possible
 */

import './App.scss';
import Layout from './components/layout/Layout';
import NavMenu from './components/header/NavMenu';
import queryDB from './backend/queryDB';
import Constellation from './components/assets/constellation.jpg';
import { useState, useEffect } from "react";


interface Todo {
  id: string,
  task: string
};

function App() {

  // To do list
  const [todos, setTodos] = useState<Todo[]>([]);

  // Add to do to the list
  const addToDo = async () => {
    const todos = await queryDB("POST", "learn react 4");
    console.log(todos);
  };

  // Retrieve all todos from the list
  const getToDos = async () => {

    const todos = await queryDB("GET");
    const keys = Object.keys(todos);

    let formattedTodos : Todo[] = [];

    keys.forEach((key : string) => {
      formattedTodos.push({id : key, task : todos[key]});
    });

    setTodos(formattedTodos);

    formattedTodos = [];
  };

  // Update a todo from the list using a PUT request
  const updateTodo = async () => {
    const updatedTodos = await queryDB("PUT", "Learn React New", todos[0].id);
    setTodos(updatedTodos);
  };

  const deleteTodo = async () => {
    const updatedTodos = await queryDB("DELETE", undefined, todos[3].id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    console.log(todos);
  },[todos]);

  return (
    <div className="App" id="outer-container" style={{ backgroundImage: `url(${Constellation})`, backgroundSize: `contain`, backgroundRepeat: `repeat`}}>

      <NavMenu/>

      <Layout>
        <p>Body of page</p>
        <button onClick={addToDo}>Add to do</button>
        <button onClick={getToDos}>Query to do's</button>
        <button onClick={updateTodo}>Update to do</button>
        <button onClick={deleteTodo}>Delete to do</button>
      </Layout>

    </div>
  );
}

export default App;
