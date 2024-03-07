require('dotenv').config();
const app = require('./app.js');

//db connection
const connectDB = require('./src/db/connectDB.js');

//port 
const port = process.env.PORT || 4000;

//importing routes
const authRoutes = require('./src/routes/authRoutes.js');

//routes
app.use('/api/auth', authRoutes);

//database connection
connectDB()
.then(() => {
    app.on('error', (err) => {
        console.log("App error: " + err?.message);
    });

    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    }) 
})
.catch((err) => {
    console.log("MONGODB connection failed: ", err); 
});