/**
 * Todos test, checks if the appropriate todo item will render or not based on the value passed through in props
 * The props passed to Todos is passed from the App component using global state which is tested in the App.test.tsx file
 * We also check if we render no todos if the list is empty
 */

import Todos from "./Todos";
import TodoItem from "./TodoItem";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

describe("Check if the app would render list items if passed through props", () => {

    // Make sure we render the text that we pass through props
    test("Make sure our text renders",()  => {

        render( 
            <Router>
                <Todos tasks={[{id : "-NMKtohDWMcesREviaHg", task : "Implement some unit tests"}]}>
                    <TodoItem key="-NMKtohDWMcesREviaHg" id="-NMKtohDWMcesREviaHg" task="Implement some unit tests" position={1}/>
                </Todos> 
            </Router>
        );

        const element = screen.getAllByText(/Implement some unit tests/i);
        expect(element).not.toHaveLength(0);

    });

    // Render nothing if we receive no props
    test("Don't render any text if we receive nothing in our props" ,() => {

        render( 
            <Router>
                <Todos tasks={[]}>
                    <TodoItem key="" id="" task="" position={0}/>
                </Todos> 
            </Router>
        );

        const element = screen.queryAllByText(/Implement some unit tests/i);
        expect(element).toHaveLength(0);

    });

});

