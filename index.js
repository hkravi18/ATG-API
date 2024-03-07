const app = require('./app.js');

const port = 3000;


//routes
const authRoutes = require('./src/routes/authRoutes.js');

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log(`Server listening on port ${port}`);
})