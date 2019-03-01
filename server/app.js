const User = require('./model/user');
const Post = require('./model/post');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const url = 'mongodb://localhost/angularDB'; 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.get('/api/user/login', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/user/login', (req, res) => {
    mongoose.connect(url , { useNewUrlParser: true }, function(err){
        if(err) throw err;
        User.find({
            username : req.body.username, password : req.body.password
        }, function(err, user){
            if(err) throw err;
            if(user.length === 1){  
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }
             
        })
    });
})
 
app.post('/api/post/getAllPost', (req, res) => {
    mongoose.connect(url, { useMongoClient: true } , function(err){
        if(err) throw err;
        Post.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.listen(3000, () => console.log('Application server running on port 3000!'))