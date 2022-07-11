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
        throw new Error('Error al momento de iniciar la aplicación.')
    }
}

// std_platform_user
// 1W3cjvhcxYlYuMxv

module.exports = {
    dbConnection
}