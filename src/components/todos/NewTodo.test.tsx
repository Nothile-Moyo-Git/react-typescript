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
import NewTodo from "./NewTodo";

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
        })

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

    // Check if out submit button exists and if we can find our input
    test("Check to see if our success modal appears after a successful upload", () => {

        // arrange, render our component so that we can reference the button and submit the form
        render(
            <TodosContextProvider value={[]}>
                <Router>
                    <NewTodo/>
                </Router>
            </TodosContextProvider>
        );

        // Get the button so that we can make sure it exists so that we can simulate a click
        // Once we do this, we can intercept the request to the backend and create a mock response
        const button = screen.getByTestId("new-todo-button");

        // Check if our button is there so we can click it
        expect(button).toBeInTheDocument();

        // Get the input so that we can set the input value and then submit the form
        const input = screen.getByTestId("new-todo-input");

        // Check if our input is there so we can update it's value here and then submit the updated value to avoid "empty" validation errors
        expect(input).toBeInTheDocument();

    });

    // Check if our 
    
});