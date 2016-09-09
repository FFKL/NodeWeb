module.exports = function(mongoose) {
    const options = {
        server: { poolSize: 10 }
    };
    mongoose.connect('mongodb://localhost/node', options, function (error) {
        if (error) {
            console.log(error);
        }
    });
};