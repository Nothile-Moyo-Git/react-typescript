/**
 * New todo test, creates a mock post request to the firebase url
 * Returns a successful response with an updated list of to do items
 * A success modal appears when a todo task has been added which is referenced
 */

import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { BrowserRouter as Router } from 'react-router-dom';
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest, rest } from "msw";
import TodosContextProvider from "../context/todo-context";
import { fireEvent } from "@testing-library/react";
import NewTodo from "./NewTodo";

// Testing definition
const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/";
const testTaskText = "Execute a post request";

// Create a test suite for NewTodo.test.tsx
describe("Test suite in order to test executing a post request on the server", () => {

    // Create a mock server that intercepts our put post request instead of executing a request directly to firebase
    const server = setupServer(
       
        // Intercept the form submission event and make the request a success
        rest.post(`${endpoint}.json`, (request : RestRequest<never, PathParams<string>>, response : ResponseComposition<DefaultBodyType>, context : RestContext) => {
            
            context.status(200);
            
            return response(            
                context.json({
                    testTaskID : testTaskText 
                })
            ); 

        }),

        // Return a successful response for a get request
        rest.get(`${endpoint}.json`, (request : RestRequest<never, PathParams<string>>, response : ResponseComposition<DefaultBodyType>, context : RestContext) => {
            
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
    test("Reference input, button, and updating the input value to query the backend", () => {

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

        // Update the value of our input and then check if we can see the update
        fireEvent.change(input, {target: {value: "An unexpected pokemon appears!"}});

        // Make sure we've updated the value in our input. The test value should be something not likely to be uploaded to firebase
        expect(input).toHaveValue("An unexpected pokemon appears!");

    });

    // Once we've tested our basic funcitonality, we now need to check our API functionality
    test("Perform mock requests to firebase and check if the modal appears", async () => {

        // arrange, render our component so that we can reference the button and submit the form
        render(
            <TodosContextProvider value={[]}>
                <Router>
                    <NewTodo/>
                </Router>
            </TodosContextProvider>
        );

        // arrange, reference our elements

        // Get our form
        const form = await screen.findByTestId("new-todo-form");
        expect(form).toBeInTheDocument();

        // Get our button
        const button = screen.getByTestId("new-todo-button");
        expect(button).toBeInTheDocument();

        // Get our input
        const input = screen.getByTestId("new-todo-input");
        expect(input).toHaveValue("");

        // Update the value of our input before we perform a post request
        fireEvent.change(input, {target: {value: "An unexpected pokemon appears!"}});
        expect(input).toHaveValue("An unexpected pokemon appears!");

        // Submit our form
        fireEvent.submit(form, {
            target: {
                task : {value : "An unexpected pokemon appears!"}
            }
        });

        // Look for our success modal after successfully submitting the form
        const modal = screen.queryByTestId("new-todo-modal");
        expect(modal).toBeInTheDocument();

    });

});