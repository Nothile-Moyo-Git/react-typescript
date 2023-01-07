/**
 * App component, houses the nav menu, header and also routing for the pages in our to-do list
 * Components are lazyloaded where possible for performance gains
 * Memoization is also implemented where possible
 */

import './App.scss';
import Layout from './components/layout/Layout';
import NavMenu from './components/header/NavMenu';

function App() {
  return (
    <div className="App" id="outer-container">

      <NavMenu/>

      <Layout>
         Body of page <br/>
         Halloumi is awesome <br/>
         Overthinking <br/>
      </Layout>

    </div>
  );
}

export default App;
