const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbName = 'Hotel';
const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5500;

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB Connection Failed", error.message));


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    password: String,
    blog_name: String,
    blog_comments: String,
    blog_description: String
});


const User = mongoose.model('User', userSchema, 'User');

app.get('/', (req, res) => {
    res.send('Welcome to my Blog Maintaining Application');
});

app.get('/getBlogs', (req, res) => {
    //User.find is used to get all the blogs from the database
    User.find({})
        .then((users) => {
            console.log(users);
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error retrieving users from database');
        });
});

// app.post('/signUp', (req, res) => {
//     const { name, email, password } = req.body;
//     const newUser = new User({ name: name, email: email, password: password });
//     //console.log(newUser);
//     newUser.save()
//         .then(() => {
//             res.status(201).send('User created successfully');
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send('Error creating user');
//         });
// });

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // Find a user with the specified email address
//     User.findOne({ email })
//         .then(user => {
//             if (!user) {
//                 // If no user is found with the specified email address, return an error response
//                 res.status(401).send('Invalid email or password');
//             } else {
//                 // If a user is found, check if the password is correct
//                 if (user.password === password) {
//                     // If the password is correct, send a success response
//                     res.status(200).send('Login successful');
//                 } else {
//                     // If the password is incorrect, return an error response
//                     res.status(401).send('Invalid email or password');
//                 }
//             }
//         })
//         .catch(err => {
//             // If an error occurs while querying the database, return an error response
//             console.log(err);
//             res.status(500).send('Error logging in');
//         });
// });

app.listen(5500, () => {
    console.log('Listening on port 5500');
});
