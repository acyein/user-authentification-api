const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(
	process.env.MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => console.log("Connected to DB!")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/api/', usersRoutes);
app.use('/api/posts', postsRoutes);

app.get('/', (req, res) => {
	res.send('Welcome!');
});

app.listen(3000, () => console.log('Server is running'));