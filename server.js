import "dotenv/config";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT;

const app = express();

//mongoose.connect("mongodb://localhost:27017/profsToPick")

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
    
    review.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('back');
        }
    });
}); 

app.get("/profReviews/:profID/:course", function (req, res){
    
    const profID = req.params.profID;
    const course = req.params.course;
    var name;

    Prof.find({_id: profID}, function(err, result){
        if(err){
            console.log(err);
        }
        else{           
                name = result[0].name;      
            
        }
    })

    Review.find({ $and: [ {prof_id: profID}, {course: course}]}, function(err, rows){
        if(err){
            console.log(err);
        }
        else{

            res.render('prof_reviews',{
                reviews: rows,
                name:name,
                course: course
            })
        }
        
    });
});

app.listen(port, function () {
    console.log(`Server is running at:`);
    console.log(`http://localhost:` + port);
})
