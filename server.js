const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/profsToPick")

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const reviewsSchema = {
    //username: String,
    //stars: String,
    reviewContent: String,
    course: String,
    likes: 0,
    prof: String,
    prof_id: String,
    date: String
};

const profProfileSchema = {
    name: String,
    courses: [String],
    college: String,
    department: String,
    averageRating: 0,
    usersRated: 0,
    courses_name: [String]
};

const Review = mongoose.model("Review", reviewsSchema);
const Prof = mongoose.model("prof_profile", profProfileSchema);

app.get("/profList", function(req, res){
    Prof.find({}, function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            res.render('prof_list',{prof_profile: rows})
        }
        });
});

app.get("/profPage/:profID", function (req, res){
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
});

app.post('/saveReview', (req, res) => {
    const review = new Review({
        reviewContent: req.body.reviewContent,
        course: req.body.course,
        likes: 0,
        prof: req.body.prof_name,
        prof_id: req.body.profID, 
        date: Date()
    });

    const profID = req.body.profID; 
    const query = profID.toString();

    const text1 = "/profPage/:";
    const path = text1.concat(profID);

    console.log(query);
    
    review.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('back');
        }
    });
}); 

app.listen(3000, function(){
    console.log("Server started on port 3000")
});
