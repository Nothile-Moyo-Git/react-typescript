/**
 * Edit to do test
 * Checks for the to do item in the component on initial render
 * Then executes a mock put request with a response
 * Once the request is processed, the value inside the input should change after a re-render
 */

// Imports
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { BrowserRouter as Router } from 'react-router-dom';
import TodosContextProvider from "../context/todo-context";
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest, rest } from "msw";
import EditTodo from "./EditTodo";

// Variables
const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/";
const testTaskID = "-NMKtohDWMcesREvi162";
const testTaskText = "Execute a post request";

// Edit todo test suite
describe("Test the form, put request functionality and re-rendering of the edit to do component", () => {

    test("Check for passing props through to the Edit To Do component", () => {

        // Arrange, render our component to test for the input field
        render(
            <TodosContextProvider value={[]}>
                <Router>
                    <EditTodo/>
                </Router>
            </TodosContextProvider>
        );

        // assert, find the form element
        const form = screen.getByTestId("edit-todo-form");

        // Check if we have the form
        expect(form).toBeInTheDocument();

        const input = screen.getByTestId("edit-todo-input");

        expect(input).toBeInTheDocument();

    });

});