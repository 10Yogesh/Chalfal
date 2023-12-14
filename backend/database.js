const mongoose = require('mongoose');
// function DbConnect() {
//     console.log('coming here...', process.env.DB_URL);
//     const DB_URL = process.env.DB_URL;
//     // Database connection
//     mongoose.connect(DB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//     });
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', () => {
//         console.log('DB connected...');
//     });
// }

// module.exports = DbConnect;



 async function DBConnect(url){
    try {
        await mongoose.connect(url,{dbName:'Chalfal'});
        console.log('Database connected');
    } catch (error) {
        console.log("Database error"+ error)
    }
}
module.exports = DBConnect;
