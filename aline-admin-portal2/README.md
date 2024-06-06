# Getting Started with Create React App

Front-end employee portal for the Aline Financial project

##Table of Content
* [Project Setup](#project-setup)
  * [Microservices](#microservices)
* [Available Scripts](#available-scripts)
* [NPM & Documentation Links](#npm-libraries-and-links-to-documentation)
* [Getting up and Running](#getting-up-and-running)

##Project Setup
After cloning the repository, and using `npm i` to install the dependencies,
you need to configure an env with following values
- `EXTEND_ESLINT: true`
- `REACT_APP_API_BASEURL`
- `REACT_APP_TOKEN_NAME`
- `REACT_APP_BROKER_URL`
- `SONAR_TOKEN`
- `SONAR_HOST_URL`

Values with the `SONAR` prefix are values from a project setup using Sonarqube.


### Microservices
As part of the Aline Financial project you will need the following repositories installed and running to use all features 
in the application.

- Aline-user-microservice
- Aline-bank-microservice
- Aline-account-microservice
- Aline-underwriter-microservice
- Aline-gateway

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## NPM libraries and links to documentation

- [Axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Sonarqube-scanner](https://www.npmjs.com/package/sonarqube-scanner)
- [React-hook-form](https://react-hook-form.com/)
- [React-table](https://react-table.tanstack.com/)
- [Sweetalert2](https://sweetalert2.github.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [StompJs](https://stomp-js.github.io/api-docs/latest/)


## Getting up and Running
Download latest version of NodeJS 14. (Should be version 14.21.3)

Create a .env file with the following values:
- `EXTEND_ESLINT: true`
- `REACT_APP_API_BASEURL` this is the url of the gateway, EX: localhost:8080
- `REACT_APP_TOKEN_NAME` this is the jwt token from jwt.io
- `REACT_APP_BROKER_URL` this is the url for the landing page, EX: localhost:3000
- `SONAR_TOKEN`
- `SONAR_HOST_URL`

Getting the node packages installed with no issues.

Run `npm i gulp-sass --save-dev`

Then run `npm install` to get all of the ndoe packages used.