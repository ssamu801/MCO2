const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/profsToPick")

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


const Prof = require("../models/profSchema");
const Review = require("../models/reviewSchema");

const profPage = (req, res) => {
    const profID = req.params.profID;
    var dbreviews = [];

    Review.find({prof_id: profID}, null, {sort: {likes: -1}}, function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            rows.forEach(function(reviews){
                dbreviews.push({
                    id: reviews._id,
                    reviewContent: reviews.reviewContent,
                    course: reviews.course,
                    likes: reviews.likes,
                    prof: reviews.prof,
                    prof_id: reviews.prof_id})
            });
        }
        
    });

    Prof.find({_id: profID}, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            Review.find({prof_id: profID}, null, {sort: {_id: -1}}, function(err, rows){
                if(err){
                    console.log(err);
                }
                else{
                    res.render('prof_page',{
                        dbreviews: dbreviews,
                        reviews: rows,
                        prof_profile: result[0],
                    })
                }
                
            });
        }
    })
}

const updateLikes = (req, res) => {
    
    const reviewID = req.body.reviewID;
    const query = {_id: reviewID};

    console.log("test");

    Review.findOneAndUpdate(query, {$inc : { likes: 1 }}, function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('back');
        }
        
    });
    
}; 

module.exports = {
    profPage,
    updateLikes
}