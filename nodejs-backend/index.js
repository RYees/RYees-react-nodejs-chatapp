const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoute = require("./routes/UserRoute")

const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection Successful");
}).catch((error) => {
    console.log("DB Connection Not Successful", error.message);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", UserRoute);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});