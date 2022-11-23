import mongoose from 'mongoose';

const url = process.env.MONGO_URL;

const database = {
    connect : function() {
        mongoose.connect(url, function(err) {
            if(err){
                throw err;
            }
            else{
                console.log('Connected in ' + url);
            }
        });
    },

    createUser: function(mod, doc, call) {
        mod.create(doc, function(err, result) {
            if(err){
                console.log(err);
                return call(false);
            }
            else{
                console.log('New user created' + result);
                return call(result);
            }
        });
    }
}

export default database;