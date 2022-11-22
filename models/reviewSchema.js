const mongoose = require("mongoose");

const reviewsSchema = {
    //username: String,
    //stars: String,
    reviewContent: String,
    course: String,
    likes: 0,
    prof: String,
    prof_id: String,
    //users_likes: Array
    //profile_pic: String
};

const Review = mongoose.model("Review", reviewsSchema);

module.exports = Review;