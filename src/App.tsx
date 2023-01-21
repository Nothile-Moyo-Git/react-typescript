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
import { useState, useEffect, Suspense, useContext } from "react";
import Todos from './components/todos/Todos';
import TodoClass from './components/models/todo';
import { Route, Switch } from "react-router-dom";
import LoadingSpinner from './components/UI/LoadingSpinner';
import NewTodo from './components/todos/NewTodo';
import { TodoContext } from './components/context/todo-context';

interface Todo {
  id: string,
  task: string
};

const DUMMY_TODOS = [
  new TodoClass("-NLNKqAe174dloxwnjFk", "Learn React"),
  new TodoClass("-NLNL4xVAyZ-xZgA8T04", "Learn Typescript")
];

const App = () => {

  // Todo context
  const todoContext = useContext(TodoContext);

  // To do list
  const todos = todoContext?.todos;

    // Retrieve all todos from the list
    const getToDos = async () => {

      const todos = await queryDB("GET");

      todoContext?.format(todos);

    };


  useEffect(() => {

    getToDos();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  console.log(todos);

  return (
    <div className="App" id="outer-container" style={{ backgroundImage: `url(${Constellation})`, backgroundSize: `contain`, backgroundRepeat: `repeat`}}>

      <NavMenu/>

      <Layout>

        <Suspense
          fallback={<LoadingSpinner/>}
        >
        
          <Switch>

            <Route exact path="/">
              <Todos tasks={todos ? todos : []}/>
              <button onClick={getToDos}>Query to do's</button>
            </Route>

            <Route exact path="/add-todo">
              <NewTodo/>
            </Route>

            <Route path="/edit/:id">
              
            </Route>

            <Route path="*">

            </Route>

          </Switch>

        </Suspense>

      </Layout>

    </div>
  );
}

export default App;
