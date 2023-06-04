// Importing express module
const express = require("express")
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
var cors = require('cors')

dotenv.config();
const app = express()
app.use(cors({
	origin:["http://localhost:3000"],
	method:["GET","POST","PATCH"],
	credentials:true
  }))

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'));
 app.use(express.json())


 app.use('/api/user', userRouter)
  

// Server setup
app.listen(8000, () => {
	console.log("Server is Running")
})
