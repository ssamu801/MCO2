import User from "../models/userSchema.js";
import db from "../models/db.js";


const settingsCont = {
    getSettings: function(req, res) {
        res.render('settings');
    }
}

export default settingsCont;