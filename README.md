Readable is a content and comment web app. The app is a study project from Udacity React Nanodegree. This project is designed for learning how Redux can function in standard type of application.

Users are able to:
- post content to predefined categories
- comment on posts
- vote on posts and comments
- edit and delete post and comments

The application server doesn't provide user authentication or authorization, so there is no permission management.

The UI is built with the use of React and Material-UI components. Redux is used to manage all the application state. All the user actions of creating and editing content are designed with minimal network data usage in mind. Components state is used for the forms only.

The application is frontend-only and requires a RESTful server running to provide and store data.

To run backend server: 
- Download or clone [server repository](https://github.com/udacity/reactnd-project-readable-starter)
- Install the requirements from the included package.json file: `npm install` or `yarn`
- Run the server with `node server` or `yarn start`

To run the app:
- Download or clone this repository
- Install the requirements: `npm install` or `yarn`
- Run the server with `node server` or `yarn start`

`reactComponents.json` contains react-docgen components description.