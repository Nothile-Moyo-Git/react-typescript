/**
 * Edit to do test
 * Checks for the to do item in the component on initial render
 * Then executes a mock put request with a response
 * Once the request is processed, the value inside the input should change after a re-render
 */

// Imports
import * as renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import TodosContextProvider from "../context/todo-context";
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest, rest } from "msw";
import EditTodo from "./EditTodo";

// Variables
const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/";
const testTaskID = "-NMKtohDWMcesREvi162";
const testTaskText = "Execute a post request";

// Trying render with props in order to get the dynamic url working
const renderWithProps = (props : any) => {

    const defaultProps = {
        match : { params : { id: "-NNDjBgaZtKBMDmsO8tu" }}
    };

};

// Edit todo test suite
describe("Test the form, put request functionality and re-rendering of the edit to do component", () => {

    // Create a server to intercept our results from quering a single todo item
    const server = setupServer(

    );

    test("Check for passing props through to the Edit To Do component", async () => {

        // Arrange, render our component to test for the input field. We're passing context through so we can test this in the input
        render(
            <TodosContextProvider value={[
                { id : "-NMKtohDWMcesREviaHg", task : "Implement some unit tests!" },
                { id : "-NMtPq9ErK5YMZivV667", task : "Implement performance optimisations!" },
                { id : "-NNDjBgaZtKBMDmsO8tu", task : "<3" }
            ]}>
                <Router initialEntries={["/-NNDjBgaZtKBMDmsO8tu"]}>
                    <EditTodo/>                                          
                </Router>
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

        console.log(input);

    });

});