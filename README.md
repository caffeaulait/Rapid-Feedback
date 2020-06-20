# Rapid Feedback

## Overview
The main objective of developing this app is to solve academics’ difficulty in assessing oral presentations and providing rapid feedback. It is part of COMP90082 Software Project in the University of Melbourne.


## Deployement    
AWS: http://rapidfeedback.s3-website-us-east-1.amazonaws.com  
Heroku: http://rapid-feedback.herokuapp.com/  

Note that the functionality for adding audio comment may not work in deployed version due to security concerns. Check https://stackoverflow.com/questions/56005165 for explanation. If you do need this feature, you can either run the app locally (localhost), or upgrade the system using HTTPS. For detailed instructions on how to enable HTTPS, please refer to our backend repo.

## Available Scripts

In the project directory, you can run:

### `npm install`
Install all required dependencies, this step should be done before your start the applicaiton.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



## Dependencies

State management: redux, react-redux, redux-thunk

Routing: react-router-dom

HttpRequest: axios

Date: react-datepicker

Query parameter parser: query-string

Testing: enzyme, react-test-renderer, enzyme-adapter-react-16, jest

ReadFile: xlsx, papaparse

UI: bootstrap, @material-ui/core


## Backend
https://github.com/yutingcai-cyt/Rapid_feedback_backend
