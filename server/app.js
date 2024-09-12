const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require("./db/connect");
const userRoutes = require('./routes/userRoutes');

app.get('/test', (req, res) => {
    res.status(200).send("Test successful");
});


//Serving static files
app.use(express.static( "../client"));

mongoConnect();

//Parse JSON Datas
app.use(express.json());

//Parse form datas
app.use(express.urlencoded({extended : true}));

app.use(userRoutes);

app.listen(process.env.PORT , () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
});