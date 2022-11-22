import mongoose from 'mongoose';

const profProfileSchema = {
    name: String,
    courses: [String],
    college: String,
    department: String,
    averageRating: 0,
    usersRated: 0,
    courses_name: [String]
    //rated_userID
};

const Prof = mongoose.model("prof_profile", profProfileSchema);

export default Prof;
