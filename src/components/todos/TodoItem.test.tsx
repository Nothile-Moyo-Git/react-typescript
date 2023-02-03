/**
 * TodoItem test
 * Since we pass the todo item through props, we check if we render if after we receive it
 * We also check if we don't render the text inside of it if we don't receive it
 * This makes sure that the general functionality of the component remains
 */

import { render, screen } from '@testing-library/react';
import TodoItem from './TodoItem';
import { BrowserRouter as Router } from 'react-router-dom';

// Create test suite for TodoItem.tsx
describe("Check if we render text in the todo item or if it's empty based on props", () => {

    test("Check if we render the correct text when passed through props" ,() => {

        // Render our component with the appropriate props
        render(
            <Router>
                <TodoItem key="-NMKtohDWMcesREviaHg" id="-NMKtohDWMcesREviaHg" task="Implement some unit tests" position={1}/>
            </Router>
        );

        const element = screen.queryAllByText(/Implement some unit tests/i);
        expect(element).not.toHaveLength(0);

    });

    test("Check if we don't render anything when nothing is passed through props", () => {

        // Render our component with the appropriate props
        render(
            <Router>
                <TodoItem key="" id="" task="" position={0}/>
            </Router>
        );

        const element = screen.queryAllByText(/Implement some unit tests/i);
        expect(element).toHaveLength(0);

    });

});