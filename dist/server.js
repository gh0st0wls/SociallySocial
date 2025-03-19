import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/indexRoute.js';
const Port = process.env.Port || 3001;
// initialising the server
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes go here
app.use(routes);
// db url change database name before running server
const Mongo_Url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/SocialNetworkDB';
// connecting to database before initializing server
mongoose
    .connect(Mongo_Url)
    .then(() => {
    console.log(`Connected to database Successfully`);
    // start the server
    app.listen(Port, () => {
        console.log(`Server running on http://localhost:${Port}`);
    });
})
    .catch((error) => {
    console.log(`Connection error: ${error}`);
    throw new Error("Connection error");
});
