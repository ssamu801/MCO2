import College from "../models/collegesSchema.js";

const home = {
    collegeList: function(req, res){
        College.find({},function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.render('home',{colleges: result})
            }
        })
    }
}

export default home;