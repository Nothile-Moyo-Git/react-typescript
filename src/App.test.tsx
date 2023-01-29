/**
 * App test, renders the App component and then performs a mock request to a firebase URL 
 * Note: When testing routed components, you must wrap the component in an Browser Router component 
 */

// Imports
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RestContext, rest } from "msw";
import { waitFor } from '@testing-library/react';
import { setupServer } from "msw/node";
import App from './App';
import { act } from 'react-dom/test-utils';

const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/";

// Create suite of tests. You use the describe keyboard in order to create a test suite and can define your tests inside of it
describe("Test API response in the app component", () => {

  // Creating a test server using mock service worker in order to implement tests
  const server = setupServer(

    // Perform mock get request in order to render the list of todos on the page and test it here
    rest.get(`${endpoint}.json`, (request : any, response : any, context : RestContext) => {

      return response(context.json([
        {
          id : "-NMKtohDWMcesREviaHg",
          task : "Implement some unit tests"
        },
        {
          id : "-NMPQxLSmiLoXT0L33-T",
          task : "Deploy the project"
        }
      ]));

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
      server.close(); 
  });

  // Check if the App component successfully renders
  test('renders learn react link', async () => {

    // Render the app component
    render(
      <Router>
        <App/>
      </Router>
    );

    // assert

      const linkElement = await screen.findByText(/To do's/i);
      expect(linkElement).toBeInTheDocument();

  });

});


