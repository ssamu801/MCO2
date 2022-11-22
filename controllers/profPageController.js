import Prof from "../models/profSchema.js";
import Review from "../models/reviewSchema.js";

const profPage = {
    load: function(req, res){
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
                
                })
            }
        })
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
    },

    saveReview: function(req, res){
        const review = new Review({
            reviewContent: req.body.reviewContent,
            course: req.body.course,
            likes: 0,
            prof: req.body.prof_name,
            prof_id: req.body.profID, 
        });
        
        review.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
        });
    }


}

export default profPage;