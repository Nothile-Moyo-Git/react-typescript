/**
 * Todos test, checks if 
 */

import Todos from "./Todos";
import TodoItem from "./TodoItem";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

describe("Check if the app would render list items if passed through props", () => {

    // Check output of text
    test("Make sure our text renders", async ()  => {

        render( 
            <Router>
                <Todos tasks={[{id : "-NMKtohDWMcesREviaHg", task : "Implement some unit tests"}]}>
                    <TodoItem key="-NMKtohDWMcesREviaHg" id="-NMKtohDWMcesREviaHg" task="Implement some unit tests" position={1}/>
                </Todos> 
            </Router>
        );

        const element = await screen.findByText(/Implement some unit tests/i);

        expect(element).toBeInTheDocument();

    });

    // 

});

