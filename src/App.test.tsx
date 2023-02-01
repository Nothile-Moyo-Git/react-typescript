/**
 * App test, renders the App component and receives a mock response from firebase
 * Note: When testing routed components, you must wrap the component in an Browser Router component 
 * If using a generic component. Define both children and value in your context file in order to work with tests
 * You can use a union type for empty values
*/

// Imports
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import TodosContextProvider from './components/context/todo-context';

// Create suite of tests. You use the describe keyboard in order to create a test suite and can define your tests inside of it
describe("Test Context Providers and API response in the app component", () => {

  // Since we perform a query after the component loads, we check if we have 
  test(`Make sure we render lists if our provider has values inside of it`, async () => {

    // Render the app component, remember that it must be wrapped in a provider and router
    render(
      <TodosContextProvider value={[]}>
        <Router>
          <App/>
        </Router>
      </TodosContextProvider>
    );

      // Instead of bypassing the act warning, we're waiting for our component to fully mount
      await waitFor( async () => {

        const testElement = await screen.findAllByRole("Implemented test");
        expect(testElement).not.toHaveLength(0);
  
      });

  });

});



