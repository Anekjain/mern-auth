const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const passport = require("passport");
const users = require("./routes/api/users");

// Passport config
require("./config/passport")(passport);

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({extended: false}),
  bodyParser.json(),
  passport.initialize()
);

// Routes
app.use("/api/users", users);


// Connect to MongoDB
mongoose
  .connect(db,{ useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.PORT || 5000; 

// Starting the Server
app.listen(port, () => console.log(`Server up and running on port ${port} !`))