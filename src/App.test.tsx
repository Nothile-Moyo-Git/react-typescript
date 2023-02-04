/**
 * App test, renders the App component and receives a mock response from firebase
 * Note: When testing routed components, you must wrap the component in an Browser Router component 
 * If using a generic component. Define both children and value in your context file in order to work with tests
 * You can use a union type in order to guard empty values. Todo[] | [] means a list of objects using the Todo Interface or an empty array for instantiation
*/

// Imports
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { setupServer } from "msw/node";
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest, rest } from "msw";
import TodosContextProvider from './components/context/todo-context';

// Endpoint
const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/.json";

// Create suite of tests. You use the describe keyboard in order to create a test suite and can define your tests inside of it
describe("Test Context Providers and API response in the app component", () => {

  // Create a mock server that will intercept our API requests and create a response
  // This is important because we need to test the functionality of the app, not firebase.
  // It also makes the test more reliable as the data in firebase can always change
  const server = setupServer(

    rest.get(endpoint, (request : RestRequest<never, PathParams<string>>, response : ResponseComposition<DefaultBodyType>, context : RestContext) => {
        return response(context.json({
            "0" : "Implement some unit tests",
            "1" : "Deploy the project",  
            "2" : "Implement performance optimisations!"   
        }));
    }),

  );

  // Server handlers
  beforeAll(() => { 

    // Establish requests interception layer before all tests.
    server.listen(); 
  });

  afterEach(() => { 

    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.resetHandlers(); 

  });

  afterAll(() => { 
    
    // Close server and deallocate memory to reduce load on the PC
    server.close(); 
  }); 

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

    // Instead of bypassing the act warning, we're waiting for our component to fully mount and retrieve the API response
    await waitFor( async () => {

      const testElement = await screen.findAllByText(/Implement some unit tests/i);
      expect(testElement).not.toHaveLength(0);

    });

  });

  // Make sure we receive the correct number of items, which in this case is 3
  test(`Make sure we render the correct number of list items`, async () => {

    // Render the app component, remember that it must be wrapped in a provider and router
    render(
      <TodosContextProvider value={[]}>
        <Router>
          <App/>
        </Router>
      </TodosContextProvider>
    );

    // Instead of bypassing the act warning, we're waiting for our component to fully mount and retrieve the API response
    await waitFor( async () => {

      const testElement = await screen.findAllByRole("listitem");
      expect(testElement).toHaveLength(3);

    });

  });

  // Make sure we render loading text before our API request finishes
  test(`Make sure we render the loading spinner before we receive our todo items`, async () => {

    // Render the app component, remember that it must be wrapped in a provider and router
    render(
      <TodosContextProvider value={[]}>
        <Router>
          <App/>
        </Router>
      </TodosContextProvider>
    );

    // Make sure we don't render any list items if there aren't any when we initialise the app
    const testElement = screen.queryAllByRole("listitem");
    expect(testElement).toHaveLength(0);
  
  });

});



