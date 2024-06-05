require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
console.log('MongoDB Connection String:', process.env.STRING);
const dbConnectionString = process.env.STRING;

if (!dbConnectionString) {
  console.error('Error: MongoDB connection string is not defined.');
  process.exit(1);
}

console.log('MongoDB Connection String:', dbConnectionString);

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('My App is connected to Database!!'))
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    console.log("User registered successfully");
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
    console.log("Error registering user");
  }
});




app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('My App is running on this port:', port);
});