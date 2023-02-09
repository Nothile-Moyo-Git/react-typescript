/**
 * App component, houses the nav menu, header and also routing for the pages in our to-do list
 * The App component renders twice, initially and then once the API request is executed and global state has todos
 * Components are lazyloaded where possible for performance gains
 * Memoization is also implemented where possible
 * 
 * @returns App : JSX
 */

// impoorts
import './App.scss';
import Layout from './components/layout/Layout';
import queryDB from './backend/queryDB';
import Constellation from './components/assets/constellation.jpg';
import React, { useEffect, Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingSpinner from './components/UI/LoadingSpinner';
import { TodoContext } from './components/context/todo-context';

// Dynamic imports
const Todos = React.lazy(() => import("./components/todos/Todos"));
const EditTodo = React.lazy(() => import("./components/todos/EditTodo"));
const NewTodo = React.lazy(() => import("./components/todos/NewTodo"));

const App = () => {

  // Todo context
  const todoContextInstance = useContext(TodoContext);

  // To do list
  const todos = todoContextInstance?.todos;

  // Retrieve all todos from the list
  const getToDos = async () => {

    const todos = await queryDB("GET");

    todoContextInstance?.format(todos);

  };

  // Get todos when the component renders
  useEffect(() => {

    getToDos();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <div className="app" id="outer-container" style={{ backgroundImage: `url(${Constellation})`, backgroundSize: `cover`, backgroundRepeat: `repeat`}}>

      <Layout>

        <Suspense
          fallback={<LoadingSpinner/>}
        >
        
          <Switch>

            <Route exact path="/">
              <Todos tasks={todos ? todos : []}>
              </Todos>
            </Route>

            <Route exact path="/add-todo">
              <NewTodo/>
            </Route>

            <Route path="/edit/:id">
              <EditTodo/>
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
