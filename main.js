const express = require('express');
const Connetction = require('./DB/db');
require('dotenv').config();
const cors = require('cors');
//import routes
const authRoutes = require('./src/routes/auth-routes');
const postRoutes = require('./src/routes/post-routes');
const userRoutes = require('./src/routes/user-routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.static('public'));
//routes and path
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blog', postRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server running on port: ' + process.env.PORT);
});
Connetction();