module.exports = (mongoose) => {
    const options = {
        server: { poolSize: 10 }
    };
    mongoose.connect('mongodb://localhost/node', options, (error) => {
        if (error) {
            console.log(error);
        }
    });
};