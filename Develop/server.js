//requiring  modules
const express = require('express');
const path = require ('path');
const fs = require('fs');
const uniqid = require('uniqid');
const dbJ = require('./db/db.json');

//Local host PORT
const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Allows us to go through public folder
app.use(express.static('public'));

//Modular Routing here <---->
app.get('/htmlnotes', (req, res)=> {
    res.sendFile(path.join(__dirname, '.'))
})

