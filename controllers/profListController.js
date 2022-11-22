const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/profsToPick")

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const Prof = require("../models/profSchema");

const profList = (req, res) => {

    Prof.find({}, function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            res.render('prof_list',{prof_profile: rows})
        }
        });
}

module.exports = {
    profList
}