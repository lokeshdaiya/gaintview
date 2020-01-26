const express = require('express')
const mongoose = require('mongoose');
const cors  = require('cors')
const {studentRouter, user} = require('./routes/index');
const app = express();
const port  = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/giantview',{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database connection is success'))
.catch((err) => console.log('Error in DB connection'));

app.use(express.json());
// app.use((req, res) => {
//   res. header("Access-Control-Allow-Origin", "*");
//   req.next();
// })

app.use(cors());
app.use('/api/students', studentRouter)
app.use('/api/user', user);
app.get('/',(req, res) => {
    res.send('API Home Page')
})

app.listen(port,() => console.log(`Server is running on ${port}`));
