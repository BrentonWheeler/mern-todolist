# Purpose
To further my understanding of MongoDB, Express, React, Node, Redux and SASS (and what ever else I can chuck in).

# Scripts to run project (and develop):
npm run dev = frontend development

npm run api = build bundle.js then run server

# Scripts for pre-building for Heroku so that it's automatic 'npm start' can run without inconsistencies
npm run build = build bundle.js for serving (only used before sending to Heroku's continous intergration)

npm start = only run the server  (kept only for Heroku continuous integration automation process)

*local MongoDB needs to be running (mongod), or point to an online mongoDB in the MONGODB_URL ".env" variable