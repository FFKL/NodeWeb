'use strict';

const MONGO_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost',
    MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT || 27017;
let base = 'node';

function checkTest() {
    if (process.env.MONGO_TEST === 'true') {
        base = 'nodetest'
    }
}

module.exports = (mongoose) => {
    const options = {
        server: { poolSize: 10 }
    };
    checkTest();
    mongoose.connect(`mongodb://${MONGO_ADDR}:${MONGO_PORT}/${base}`, options, (error) => {
        if (error) {
            console.log('DB not connected. For correct work check MONGO_PORT_27017_TCP_ADDR and MONGO_PORT_27017_TCP_PORT variables\n'+ error);
        }
    });
};