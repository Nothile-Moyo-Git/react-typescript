/**
 * Todos test
 */

import Todos from "./Todos";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

// What is the prefix
test("Make sure list items render", async ()  => {

    render( 
        <Router>
            <Todos tasks={[{id: "-NMKtohDWMcesREviaHg", task : "Implement some unit tests"}]}>
            </Todos> 
        </Router>
    );

    const element = await screen.findByText(/Implement some unit tests/i);
    expect(element).toBeInTheDocument();

});

