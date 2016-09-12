const MONGO_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost',
    MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT || 27017;

module.exports = (mongoose) => {
    const options = {
        server: { poolSize: 10 }
    };
    mongoose.connect('mongodb://'+ MONGO_ADDR + ':'+ MONGO_PORT + '/node', options, (error) => {
        if (error) {
            console.log(error);
        }
    });
};