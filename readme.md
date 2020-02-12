# Fullstack Node.js app with MongoDB & Express

Demo app to study node.js with Martin Schmedtmanns Node.js Bootcamp.

## Features

- MVC pattern
- Template engine with PUG files
- Express 4 server & MongoDB
- Middlewares
- APIs for users and tours with all CRUD operations
- User Authentication with JWT
- Serverside rendered (SSR)

## To get this running locally ..
1. clone git repo
2. run npm install
3. set up mongoDB locally or in the cloud. After the setup you will receive a connection string that looks like this:

```
mongodb+srv://username:<password>@cluster9-jfgh5k.mongodb.net/test?retryWrites=true&w=majority
```

4. create a config.env in the root folder that holds below key value pairs (replace connection string with the one you received from mongoDB and add a string of your choice as JWT_SECRET.):

```
DATABASE_LOCAL=mongodb+srv://username:<password>@cluster9-jfgh5k.mongodb.net/test?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
JWT_SECRET=random-and-long-secret-92363546
```

5. run npm start
6. You should see in the terminal "listening on port 3000.." and that the connection to the DB was successfull
7. now load some sample data into the database: 

`node dev-data\data\import-dev-data.js --import`

8. to delete the data run: 

`node dev-data\data\import-dev-data.js --delete`

## Hit the API on the following routes

- Get all tours: http://localhost:3000/api/v1/tours
- Create a new tour: http://localhost:3000/api/v1/tours
- Update tour: http://localhost:3000/api/v1/tours/:id
- Delete tour: http://localhost:3000/api/v1/tours/:id
- Filter tours by name and rating: http://localhost:3000/api/v1/tours?fields=name,rating
- Get top 5 tours: http://localhost:3000/api/v1/tours/top5-tours