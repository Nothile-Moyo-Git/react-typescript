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
import { useEffect, Suspense, useContext } from "react";
import Todos from './components/todos/Todos';
import EditTodo from './components/todos/EditTodo';
import { Route, Switch } from "react-router-dom";
import LoadingSpinner from './components/UI/LoadingSpinner';
import NewTodo from './components/todos/NewTodo';
import { TodoContext } from './components/context/todo-context';

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

      <NavMenu/>

      <Layout>

        <Suspense
          fallback={<LoadingSpinner/>}
        >
        
          <Switch>

            <Route exact path="/">
              <Todos tasks={todos ? todos : []}/>
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
