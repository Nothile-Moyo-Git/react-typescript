/**
 * Edit to do test
 * Checks for the to do item in the component on initial render
 * Then executes a mock put request with a response
 * Once the request is processed, the value inside the input should change after a re-render
 */

// Imports
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { MemoryRouter, Route } from 'react-router-dom';
import TodosContextProvider from "../context/todo-context";
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest, rest } from "msw";
import EditTodo from "./EditTodo";

// Variables
const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/";
const testTaskID = "-NNDjBgaZtKBMDmsO8tu";
const testTaskText = "Execute a put request";

// Edit todo test suite
describe("Test the form, put request functionality and re-rendering of the edit to do component", () => {

    // Create a server to intercept our results from quering a single todo item
    const server = setupServer(

        // Intercept our get request so we can reliably get the results of our mock request
        rest.get(`${endpoint}.json`, (request : RestRequest<never, PathParams<string>>, response : ResponseComposition<DefaultBodyType>, context : RestContext) => {

            context.status(200);

            return response(
                context.json({  testTaskID : testTaskText})
            );

        }),

        // Intercept the PUT request so we don't query firebase and instead post a successful response
        rest.put(`${endpoint}${testTaskID}.json`, (request : RestRequest<never, PathParams<string>>, response : ResponseComposition<DefaultBodyType>, context : RestContext) => {

            context.status(200);

            return response(
                context.json({testTaskID : testTaskText}),
            );

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

    test("Check for passing props through to the Edit To Do component", async () => {

        // Arrange, render our component to test for the input field. We're passing context through so we can test this in the input
        render(
            <TodosContextProvider value={[]}>
                <MemoryRouter initialEntries={["/-NNDjBgaZtKBMDmsO8tu"]}>
                    <Route path="/:id">
                        <EditTodo/>
                    </Route>                                        
                </MemoryRouter>
            </TodosContextProvider>
        );

        // assert, find the form element
        const form = screen.getByTestId("edit-todo-form");

        // Check if we have the form
        expect(form).toBeInTheDocument();

        // Get our input
        const input = screen.getByTestId("edit-todo-input");

        // Check if we have an input
        expect(input).toBeInTheDocument();

    });
    
    // Test a dynamic url with react-test-renderer
    test("Dynamic URL's will work with the Edit Todo component", async () => {

        // Render our component with a context provider. We do this to pass mock values to the component
        // Afterwards, we use a MemoryRouter to route match the path we'd pass through 
        // Seems like you'll need to define your Route the same way you do in your main App component, don't use hard coded routes for dynamic params
        // From here, we wait until the EditTodo component has finished mounting and re-rendering
        // Then we check to see if the text value has gone into the input
        render(
            <TodosContextProvider value={[
                { id : "-NMKtohDWMcesREviaHg", task : "Implement some unit tests!" },
                { id : "-NMtPq9ErK5YMZivV667", task : "Implement performance optimisations!" },
                { id : "-NNDjBgaZtKBMDmsO8tu", task : "<3" }
            ]}>
               <MemoryRouter initialEntries={["/-NNDjBgaZtKBMDmsO8tu"]}>
                    <Route path="/:id">
                        <EditTodo/>
                    </Route>
               </MemoryRouter>
            </TodosContextProvider>
        );

        // Get our input
        const input = screen.getByTestId("edit-todo-input");

        // Check if we have an input
        expect(input).toBeInTheDocument();

        // Check if our task value is not being rendered in the input field
        const testElement = screen.queryAllByDisplayValue(/<3/i);

        // If the <3 value is present, the test will pass
        expect(testElement).not.toHaveLength(0);
      
    });

    // Test updating the input once we have our dynamic value
    test("Fire an event to update the input value and then perform a PUT request successfully", async () => {

        // Render our component with the <3 text inside it like done above
        render(
            <TodosContextProvider value={[
                { id : "-NMKtohDWMcesREviaHg", task : "Implement some unit tests!" },
                { id : "-NMtPq9ErK5YMZivV667", task : "Implement performance optimisations!" },
                { id : "-NNDjBgaZtKBMDmsO8tu", task : "<3" }
            ]}>
               <MemoryRouter initialEntries={["/-NNDjBgaZtKBMDmsO8tu"]}>
                    <Route path="/:id">
                        <EditTodo/>
                    </Route>
               </MemoryRouter>
            </TodosContextProvider>
        );

        // Get our input
        const input = screen.getByTestId("edit-todo-input");

        // Check if we have an input
        expect(input).toBeInTheDocument();

        // Update our value and then to see if we can view our update
        fireEvent.change(input, { target:{ value: "Node.js is cool" }});

        // Check if the text has successfully changed
        expect(input).toHaveDisplayValue(/Node.js is cool/i);

        // Get our form so we can submit the new text and intercept the request 
        const form = screen.getByTestId("edit-todo-form");

        expect(form).toBeInTheDocument();

        fireEvent.submit(form, { 
            target: {
                task : { value : "<3!" }
            },
        });

        // Look for our success modal after successfully submitting the form
        // We use a waitFor so that we can tell whether the component has caused a re-render or not
        // Waitfor forces the DOM to wait until all promises are resolved
        await ( waitFor( () => {
            const modal = screen.queryAllByTestId("edit-todo-modal");
            expect(modal).not.toHaveLength(0);          
        }));

    });

});