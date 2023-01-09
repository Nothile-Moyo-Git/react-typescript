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

function App() {

  const testQuery = async () => {
    const todos = await queryDB("POST", "learn react 3");
    console.log(todos);
  };

  return (
    <div className="App" id="outer-container" 
      style={{ 
        backgroundImage: `url(${Constellation})`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`
      }}
    >

      <NavMenu/>

      <Layout>
        <p>Body of page</p>
        <button onClick={testQuery}>Test</button>
      </Layout>

    </div>
  );
}

export default App;
