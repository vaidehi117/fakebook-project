const Post = require("../models/post");

//Helps generate random number for our file names
//So every file name is unique
const { v4: uuidv4 } = require("uuid");
//import the s3 constructor
const S3 = require("aws-sdk/clients/s3");
//Initialize the S3 constructor so we have an object to talk to aws
const s3 = new S3();

//Since everyone has a unique bucket name,
//It's a good use case for a .env variable
//because we don't share that outside our computer
const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
    create,
    index,
};

function create(req, res) {
    console.log(req.body, req.file, " < req.body, req.file in posts/api create");
    //Check if there is a file, if there isn't send back an error
    if (!req.file) return res.status(400).json({ error: "Please Submit a Photo" });

    //This is the location of where our file will stored
    //On AWS s3
    const filePath = `fakebook/posts/${uuidv4()}-${req.file.originalname}`;
    //Create the object we want to send to AWS
    const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

    s3.upload(params, async function (err, data) {
        if (err) {
            console.log("===========================================");
            console.log(
                err,
                " err from aws, either your bucket name is wrong or your keys arent correct"
            );
            console.log("===========================================");
            res.status(400).json({ error: "Error from aws, check your terminal!" });
        }

        try {
            //Use our Model to create a document in the posts collection in Mongodb
            const post = await Post.create({
                caption: req.body.caption,
                user: req.user, // req.user is defined in config/auth if we the client sends over the jwt token
                photoUrl: data.Location, // data.Location comes from the callback in the s3 upload
            });

            //Populating on a mongoose document! this gives us the user object
            await post.populate("user");
            //This response will show up in the feedPage in   const responseData = await postsApi.create(post);
            res.status(201).json({ data: post }); //<- this is what responseData should be
        } catch (err) {
            res.status(400).json({ error: err });
        }
    });
}

async function index(req, res) {
    //This populate the user when you find the posts
    //So you will have access to the  users information 
    //When you fetch the posts
    try {
        const posts = await Post.find({}).populate("user").exec();
        res.status(200).json({ posts })
    } catch (err) {
        res.status(400).json({ error: err });
    }
}