# Testing Todo List App :)
# [View Live App](https://nothile-moyo-git.github.io/react-typescript/)

## This Application is a todo list built in React.js, Node.js, TypeScript, Jest, Firebase, React-Testing-Library, MSW, Github actions & SCSS (BEM).

## *Welcome :). I decided to create this Project in order to learn Testing and TypeScript usage with React.js and the cloud*
## *This App has basic CRUD functionality, but contains unit & integration tests with mock requests, mock responses & mock servers*
## *It also contains powerful features such as dynamic imports, memoization, performant CSS styling (minimal reflows), optimal wrapped queries, bundling, CICD and deployments*

### Installation & Deployment

Due to the size of this project, [Trunk based development](https://trunkbaseddevelopment.com/) has been used here.

To use the app, clone the repo and create a new branch called `develop` if it doesn't exist already.

Once complete, open the terminal, and execute the `npm run install` command.
Once this concludes, run `npm audit fix`.
*Note: `npm audit fix` fixes all easily fixed dependency problems you may encounter. However, you should never use --force even if there are issues with npm install*.

Now, to start a local server and render the app in your browser, execute `npm run start`. A new browser tab is automatically opened when this completes.

Yipee! That's the hard part over with :).

If you want to execute tests, create a new terminal and you'll have access to two separate commands
```
npm test <your_test_file> (This command tests an individual test file)
npm run test followed by a (This command tests all files)
```

This app uses Github Pages as its production environment. Therefore, when your work is complete, merge the `develop` branch into the `master` branchh and push.
Once that's done, run `npm run deploy` in the terminal. This creates a build and deploys it for you. It will also destroy the build on your local machine once it's complete.

*Note: Please ensure that your build works before running this. You should have no issues in your terminal and your build should succeed*

### Technologies used
This app uses React.js with TypeScript. We use TypeScript here as it significantly reduces bugs which can be found in the build file, even if the writing process takes longer. It creates a safer project.

We use React as we need a JavaScript Framework or library which runs client side.

We use SCSS with BEM because the BEM methodology reduces scoping issues, and SCSS allows me to execute complex CSS. Furthermore, the styling is optmized to use more of the GPU and not the CPU by use of transforms instead of re-flows, pseudo elements and will-change.

For testing, we use React-Testing-Library to gain access to the virtual DOM, Jest in order to mock events, and Mock Service Worker in order to mock API requests. 

For the backend, we use Firebase as it has a simple API to interact with, but something far more complex if we require features like authentication.

Further technologies include packages such as `react-burger-menu` and `react-parallax-tilt` for cool UI effects.

**NOTE: Credit to all authors who are creators of React-icons**

### App layout

The index file contains the BrowserRouter and ContextProvider components which we wrap around the app. We also place the react-burger-menu icon here because it causes unnecessary errors with tests. You can find it here: **"./src/index.tsx".**

The App component dynamically loads child components and handles routing. It also performs a get request to fetch all the todo items when the app initially renders. This can be found in **"./src/App.tsx"**

It has a test file which covers mocking the get request and seeing the list items render once the request is complete.

The backend folder contains the "queryDB" file which handles all API request to Firebase. All queries in components are performed using this file and it works with tests too!

The @types folder manages filestypes and allows them to be bundled in our build. 

The 404 folder contains the 404 page. 

The header, context, and layout folders all work as expected.

The components folder contains the CRUD functionality for todo items. It also contains thorough tests. Since each request is managed through queryDB, most of these components either interact with global state or queryDB. 

Tests for these components include: Testing props, finding input elements, updating inputs, submitting forms, handling re-renders, mocking requests and responses etc...

### Overall thoughts

It was definitely a tough app to build. Although the functionality was simple, I wanted to write it at a high level. Each component is documented, functions are commented. All efforts have been taken to optimize the performance of the app.

I found it really interesting how by having explicit types, it makes it easier to manage dataflow down the road and there's far less ambiguity in the IDE.
But there are also significantly ( if any ) issues occuring with data types not aligning which would occur in JavaScript.

The styling was really really fun and I love to do nice colors and fancy gradients :)

It was worth it! and now I look forward to exploring Node.js in further depth.

You can view a preview of the app below :)

![image](https://user-images.githubusercontent.com/15236959/219503519-6aca51b4-113f-4248-b412-381f0aaa9c88.png)
