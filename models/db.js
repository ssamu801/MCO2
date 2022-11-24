import mongoose from 'mongoose';

const url = process.env.MONGO_URL;

const database = {
    connect : async function() {
        try{
            mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                //useFindAndModify: false,
            })

            console.log("Database connection successful")

        }catch(err){

            console.error(err)
            process.exit(1)
        }
        // mongoose.connect(url, function(err) {
        //     if(err){
        //         throw err;
        //     }
        //     else{
        //         console.log('Connected in ' + url);
        //     }
        // });
    },

    // createUser: function(mod, doc, call) {
    //     mod.create(doc, function(err, result) {
    //         if(err){
    //             console.log(err);
    //             return call(false);
    //         }
    //         else{
    //             console.log('New user created' + result);
    //             return call(true);
    //         }
    //     });
    // },

    createUser: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    }
}

export default database;