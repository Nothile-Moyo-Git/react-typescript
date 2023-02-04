/**
 * New todo test, creates a mock post request to the firebase url
 * Returns a successful response with an updated list of to do items
 * Processes the results of the test
 */

import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { BrowserRouter as Router } from 'react-router-dom';
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest, rest } from "msw";
import TodosContextProvider from "../context/todo-context";

// Testing definition
const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/";
const testTaskID = "-NMKtohDWMcesREvi162";
const testTaskText = "Execute a post request";

// Create a test suite for NewTodo.test.tsx
describe("Test suite in order to test executing a post request on the server",() => {

    // Create a mock server that intercepts our put post request instead of executing a request directly to firebase
    const server = setupServer(
       
        rest.post(`${endpoint}${testTaskID}.json`, (request : RestRequest<never, PathParams<string>>, response : ResponseComposition<DefaultBodyType>, context : RestContext) => {
            context.status(200);
            context.json({
                testTaskID : testTaskText 
            });
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

  test("Check the response from our post request and see if we see it" ,() => {

    

  });
    
});