/**
 * Edit to do test
 * Checks for the to do item in the component on initial render
 * Then executes a mock put request with a response
 * Once the request is processed, the value inside the input should change after a re-render
 */

// Imports
import * as renderer from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { MemoryRouter, Switch, Route, Router } from 'react-router-dom';
import TodosContextProvider from "../context/todo-context";
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest, rest } from "msw";
import EditTodo from "./EditTodo";
import { createMemoryHistory, MemoryHistory } from "history";

// Variables
const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/";
const testTaskID = "-NMKtohDWMcesREvi162";
const testTaskText = "Execute a post request";

// Edit todo test suite
describe("Test the form, put request functionality and re-rendering of the edit to do component", () => {

    // Create a server to intercept our results from quering a single todo item
    const server = setupServer(

    );

    test("Check for passing props through to the Edit To Do component", async () => {

        // Arrange, render our component to test for the input field. We're passing context through so we can test this in the input
        render(
            <TodosContextProvider value={[]}>
                <MemoryRouter initialEntries={["/-NNDjBgaZtKBMDmsO8tu"]}>
                    <Switch>
                        <Route path="/-NNDjBgaZtKBMDmsO8tu">
                            <EditTodo/>
                        </Route>  
                    </Switch>                                       
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

});