const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const { mongoURI } = require('./config/database');
const User = require('./models/User');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;
 
app.use(express.json());
app.use(cors());
dotenv.config();
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  async function initializeDatabase() {
    try {
      const count = await User.countDocuments({});
      if (count === 0) {
        const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
        await User.insertMany(users);
        console.log('data inserted successfully');
      } else {
        console.log('data already exist');
      }
      console.log('data setup successfully');
    } catch (err) {
      console.log('error in data', err);
    }
  }
  initializeDatabase();
// Routes
app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));