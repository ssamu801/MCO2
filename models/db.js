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
    }
}

export default database;