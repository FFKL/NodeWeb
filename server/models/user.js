'use strict';

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        login: String,
        hash: String
    }, {
        versionKey: false
    });

    mongoose.model('User', UserSchema);
};