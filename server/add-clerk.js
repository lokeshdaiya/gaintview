const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {User} = require('./models/User')
mongoose.connect('mongodb://localhost/giantview',{useNewUrlParser: true, useUnifiedTopology: true})

async function addUser() {
  try {
    const salt = await bcrypt.genSalt(10);
    const pass = 'Test@1234'
    password = await bcrypt.hash(pass, salt)
    let user = new User({ email: 'test@gmail.com', password, role: 'clerk', name: 'Lokesh' });
    user  = await user.save();
    console.log('Email', username)
    console.log('Passowrd', pass);
  } catch(err) {
    console.log('Error', err);
  }

}

addUser()
