# Functionality
Allows a user to create a new todolist with no account creation commitment and share it with another user by sending them the url.

### Trello integration flow: 
![trello flow gif](https://github.com/BrentonWheeler/mern-todolist/blob/master/readmeGifs/todolistapp%20trello%20flow.gif "trello flow gif")

### GitHub integration flow: 
![trello flow gif](https://github.com/BrentonWheeler/mern-todolist/blob/master/readmeGifs/todolistapp%20github%20flow.gif "github flow gif")

# Scripts to run project (and develop):
npm run dev = frontend development

npm run api = build bundle.js then run server

# Scripts for pre-building for Heroku so that it's automatic 'npm start' can run without inconsistencies
npm run build = build bundle.js for serving (only used before sending to Heroku's continous intergration)

npm start = only run the server  (kept only for Heroku continuous integration automation process)


*local MongoDB needs to be running (mongod), or point to an online mongoDB in the MONGODB_URL ".env" variable
