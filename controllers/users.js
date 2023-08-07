const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

//Helps generate random number for 
//Our file names, so every file name is unique
const { v4: uuisv4 } = require('uuid');
//import the s3 constructor
const S3 = require('aws-sdk/clients/s3');
//initialize the S3 constructor so we have an object to talk to aws
const s3 = new S3();

//Since everyone has a unique bucket name,
//Its a good use case for a .env variable
//Because we don't share that outside our computer
const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
  signup,
  login,
  profile
};

async function profile(req, res) {
  try {
    //First find the user using the params from the request
    //FindOne finds first match, its useful to have uniwue usernames!
    const user = await User.findOne({ username: req.params.username })
    //Then find all the posts that belong to that user
    if (!user) return res.status(404).json({ error: 'User not found' })
    //Using the post model to find all the users posts (the user from req.params)
    //Finding all posts by a user, and populating the user property!
    const posts = await Post.find({ user: user._id }).populate("user").exec();
    console.log(posts, ' this posts')
    res.status(200).json({ posts: posts, user: user })
  } catch (err) {
    console.log(err);
    res.status(400).json({ err })
  }
}

async function signup(req, res) {

  console.log(req.body, req.file, ' req.body', 'req.file');

  //Check if there is a file, if there isn't send back an error
  if (!req.file) return res.status(400).json({ error: "Please Submit a Photo" });

  //This is the location of where our file will stored 
  //On aws s3
  const filePath = `fakebook/${uuisv4()}-${req.file.originalname}`
  //Create the object we want to send to aws 
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer }

  s3.upload(params, async function (err, data) {
    if (err) {
      console.log('===============================')
      console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
      console.log('===============================')
      res.status(400).json({ error: 'error from aws, check your terminal' })
    }

    //If s3 upload was successful create the user and store the file location
    req.body.photoUrl = data.Location; //data.Location is what we get back from aws of where Our file is stored
    const user = new User(req.body);
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
      //This response gets process by the client 
      //utils/userService signup function, inside of the .thens
    } catch (err) {
      console.log(err)
      //Probably a duplicate email
      console.log(err)
      res.status(400).json(err);
    }
  })
}

async function login(req, res) {
  try {
    //Finding the user by there email
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: 'bad credentials' });
    //Check the users password
    user.comparePassword(req.body.password, (err, isMatch) => {

      if (isMatch) {
        //If the password is good, create our jwt 
        //And send it back to the client 
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: 'bad credentials' });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, //data payload
    SECRET,
    { expiresIn: '24h' }
  );
}
