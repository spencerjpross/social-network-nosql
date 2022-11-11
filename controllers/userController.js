const { User } = require('../models');

function getUser(req, res) {
    User.findOne({ _id: req.params.userID})
    .then((data)=> {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

function getUsers(req,res) {
    User.find()
    .then((data)=> {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

function createUser(req,res) {
    User.create(req.body)
    .then((data)=> {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

function updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userID, {username: req.body.username, email: req.body.email}, {new: true})
    .then((data)=> {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

function deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userID})
    .then((data)=> {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
    })
}


module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}