import Prof from "../models/profSchema.js";

const profList = {
    profList: function(req, res){
        Prof.find({},function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.render('prof_list',{prof_profile: result})
            }
        })
    }
}


export default profList;