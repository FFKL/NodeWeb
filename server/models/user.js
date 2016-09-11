module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        login: String,
        password: String
    }, {
        versionKey: false
    });

    UserSchema.methods = {
        authenticate(password) {
            return this.password === password;
        }
    };

    mongoose.model('User', UserSchema);
};