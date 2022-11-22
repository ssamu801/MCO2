const Prof = require("../models/profSchema");
const Review = require("../models/reviewSchema");

module.exports = {
    load: function(req, res){
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
    },

    updateLikes: function(req, res){
        const reviewID = req.body.reviewID;
        const query = {_id: reviewID};
    
        Review.findOneAndUpdate(query, {$inc : { likes: 1 }}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
            
        });
    }
}