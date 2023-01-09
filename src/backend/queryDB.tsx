/**
 * Query database file. This isn't a react component but instead a wrapper for the different commands
 * We execute a post, get, put and delete requests here to a firestore database
 * Since this is a demo app, there is currently no token functionality although such could be added
 * 
 * Note: Always use a .json at the end of a request to a firebase backend otherwise you'll get a 401 response
 * This response will say "unauthorised"
 * 
 * @param method : string (what is the type of request)
 * @param body : string (The todo we want to add)
 * 
 * @returns todos : string[] (requests the to-do list after each query in order to update it)
 */

// Endpoint
const endpoint = "https://react-typescript-69b75-default-rtdb.europe-west1.firebasedatabase.app/";

let result : any;

// const demoString = "Learn React";

// Query DB wrapper
const queryDB = async (method : string, body : string) => {

    // Pass the correct arguments based on current method
    switch (method){

        case "POST":
            result = await performRequest(`${endpoint}.json`, body, method);
            break;

        case "GET":

            break;

        case "PUT":

            break;

        case "DELETE": 

            break;
        default:
            throw new Error("Error: invalid method, try one of these: POST, GET, PUT, DELETE");
    }

    // Return the current array of todos in the backend
    return result;

};

// Perform request handler, executes the API request
const performRequest = async (queryEndpoint : string, body : string, method: string) => {

    // Perform our main query to the backend
    const response = await fetch(queryEndpoint,{
        method,        
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    });

    // If our request fails, then send an error for it to be checked. Note: it could be the missing .json issue
    if (!response.ok) {
        throw new Error("Error: request failed, please check endpoint");
    }

    // Render a popup to let the user know that the request has been successful
    alert("Successfully updated the backend");

    // Query the backend to extract the updated resources so we can add it to our global context
    const todos = await fetch(`${endpoint}.json`);

    // Same as above
    if (!todos.ok){
        throw new Error("Error: request failed, please check endpoint");
    }

    const data = todos.json();

    // This will be an array of our todo items from the base endpoint, you should be able to use their object keys for arrays
    return data;

};

export default queryDB;