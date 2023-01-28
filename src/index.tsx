import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import TodosContextProvider from './components/context/todo-context';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <TodosContextProvider>
    <BrowserRouter basename="/react-typescript">
      <App/>
    </BrowserRouter>
  </TodosContextProvider>
);