/**
 * App test, renders the App component and then performs a mock request to a firebase URL 
 * Note: When testing routed components, you must wrap the component in an Browser Router component 
*/

// Imports
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Create suite of tests. You use the describe keyboard in order to create a test suite and can define your tests inside of it
describe("Test Context Providers and API response in the app component", () => {

  // Check if the App component successfully renders
  test('renders learn react link', async () => {

    // Render the app component
    const view = render(
        <Router>
          <App/>
        </Router>
      );

    // Instead of bypassing the act warning, we're waiting for our component to fully mount
    await waitFor( async () => {
      const testElement = await screen.findAllByText(/to do's/i);
      expect(testElement).not.toHaveLength(0);

      // eslint-disable-next-line testing-library/no-debugging-utils
      view.debug();
    });


  });

});



