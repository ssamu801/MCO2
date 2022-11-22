const Prof = require("../models/profSchema");

module.exports = {
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
