const Post = require('../models/post');

module.exports = {
    create
}

async function create(req, res) {
    try{

    }catch(err){
        res.status(400).json({ err })
    }
}