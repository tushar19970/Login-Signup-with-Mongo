const express = require('express')
const user1 = express.Router()
const user = require('../models/module')
const bcrypt = require('bcrypt')
const {generateToken} = require('../Auth/jwt')

user1.post('/signup', async(req, res) => {
    try{
        const pass = await bcrypt.hash(req.body.password, 10)
        const users = {
            name : req.body.name,
            last_name : req.body.last_name,
            phone : req.body.phone,
            email : req.body.email,
            password : pass
        }
        const data = await user.insertMany(users)
        console.log(data)
        res.send("Signup has successfully..")
    } catch(err) {
        res.send(err.message)
        console.log(err.message)
    }
})

 
user1.post('/login', async(req, res) => {
    try {
        const data = await user.findOne({'email' : req.body.email})
        const comp = await bcrypt.compare(req.body.password, data.password)
        let data1 = {
           "name" : req.body.name, 
           "last_name" : req.body.last_name, 
           "phone" : req.body.phone, 
           "email" : req.body.email, 
           "password" : req.body.password
        }
        if (comp){
            const token = generateToken(data1)
            res.cookie("token",token)
            res.send("You have login this page successfully...")
            console.log('(You have login this page successfully...)');
        } else {
            res.send("User is not finding")
        }
    } catch(err) {
        res.send(err.message)
        console.log(err.message)
    }
})


module.exports = user1