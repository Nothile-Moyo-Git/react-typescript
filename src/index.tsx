/**
 * Index component, serves as the base of our app, currently has a Provider for global state management
 * We also use a browser router and we set a basename which is important for deployments
 * Note: If you deploy an app without a basename to Github pages with React Router v5 your routing will break
 * Note: We use the NavMenu here as react-burger-menu flags errors during testing the App component
 * 
 * @returns void
 */

import ReactDOM from 'react-dom/client';
import NavMenu from './components/header/NavMenu';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import TodosContextProvider from './components/context/todo-context';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <TodosContextProvider value={[]}>
    <BrowserRouter basename="/react-typescript">
      <NavMenu/>
      <App/>
    </BrowserRouter>
  </TodosContextProvider>
);