const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB online')
    } catch (error) {
        console.log(error);
        throw new Error('The application failed to start because of error.')
    }
}

// std_platform_user
// 1W3cjvhcxYlYuMxv

module.exports = {
    dbConnection
}