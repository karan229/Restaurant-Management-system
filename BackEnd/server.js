require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


console.log('MongoDB Connection String:', process.env.STRING);

const jwt = require('jsonwebtoken');
const multer = require('multer');



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



const dbConnectionString = process.env.STRING;
const JWT_SECRET = process.env.JWT_SECRET || 'BhuimiiiiiiiiiiKaaaaaaaa';
const TOKEN_EXPIRATION = '1h';



if (!dbConnectionString) {
  console.error('Error: MongoDB connection string is not defined.');
  process.exit(1);
}


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
  joiningDate: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
});

const User = mongoose.model('User', userSchema);




app.get('/', (req, res) => {
  res.send('API IS WORKING!');
});




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

    const token = jwt.sign(
      { userId: newUser._id, userType: newUser.userType },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    console.log("User registered successfully");
    res.status(201).json({ message: 'User registered successfully', token, userType: newUser.userType });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
    console.log("Error registering user:", error);
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
    const token = jwt.sign({ userId: user._id, userType: user.userType }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
    res.status(200).json({ message: 'Login successful', token, userType: user.userType, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
    console.log("Error logging in:", error);
  }
});



// Middleware for login & registeration by using jwt tokens; reference - https://www.youtube.com/watch?v=dX_LteE0NFM
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/secure', authenticateToken, (req, res) => {
  res.json({ message: 'Secure connection', user: req.user });
});

app.get('/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
    console.log("Error fetching user:", error);
  }
});




// Stock Management API
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  ItemName: String,
  quantity: Number,
  Price: Number,
  Available: Boolean,
  image: Buffer,
  imageType: String,
});

const Item = mongoose.model('Item', itemSchema);

// API endpoint for uploading an item
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const newItem = new Item({
      ItemName: req.body.ItemName,
      quantity: req.body.quantity,
      Price: req.body.Price,
      Available: req.body.Available,
      image: req.file.buffer, 
      imageType: req.file.mimetype,
    });

    await newItem.save();

    res.status(201).json({ message: 'Data inserted successfully', newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



app.put('/api/items/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;

  try {
    const updateData = {
      ItemName: req.body.ItemName,
      quantity: req.body.quantity,
      Price: req.body.Price,
      Available: req.body.Available
    };

    if (req.file) {
      updateData.image = req.file.buffer;
      updateData.imageType = req.file.mimetype;
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'Updated successfully', updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.status(200).json({ message: 'Deleted successfully', deletedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/admin-details', async (req, res) => {
  const adminEmail = req.query.email;

  if (!adminEmail) {
    return res.status(400).json({ message: 'Admin email is required' });
  }

  try {
    const adminUser = await User.findOne({ email: adminEmail, userType: 'admin' });

    if (!adminUser) {
      return res.status(404).json({ message: 'Admin details not found' });
    }

    const { username, email, joiningDate, status, profilePicture } = adminUser;
    res.status(200).json({ username, email, joiningDate, status, profilePicture });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin details', error });
  }
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('My App is running on this port:', port);
});
