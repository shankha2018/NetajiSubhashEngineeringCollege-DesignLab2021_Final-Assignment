const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const router = express.Router();
const User = mongoose.model("User");
// Sign up routes
router.post('/signup',(req,res)=>{
    let {name,phone,email,password, pic} = req.body
    if(!email || !name || !phone || !password){
        return res.status(422).json({
            error: "Please add all the fields."
        })
    }
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
        return res.status(422).json({
            error: "Invalid email."
        });
    }
    if(name.length > 20 || name.length < 4){
        return res.status(422).json({
            error: "Name must be within 4 to 20 charecters."
        });
    }
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({
                    error: "User already exists with this email."
                })
            }
            // hashing the password 
            bcrypt.hash(password, 11)
            .then((hashedPasswoord)=>{
                const user = new User({
                    email,
                    password: hashedPasswoord,
                    name: name,
                    phone:phone,
                    pic
                })

                user.save()
                .then((user)=>{
                    res.json({
                        message: "Successfully signed up."
                    })
                })
                .catch((e)=>{
                    console.log(e);
                    res.status(422).json({
                        error: "Unable to sign up, please try again."
                    });
                });
            })
        })
        .catch((e)=>{
            console.log(e);
            res.status(422).json({
                error: "Unable to sign up, please try again."
            });
        });
});

// Sign In routes
router.post('/signin', (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({
            error: "Please provide email or password."
        });
    }
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
        return res.status(422).json({
            error: "Invalid email."
        });
    }
    User.findOne({
        email: email
    })
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({
                error: "Invalid email or password."
            });  
        }
        bcrypt.compare(password, savedUser.password)
        .then((doMatch)=>{
            if(doMatch){
                // res.json({
                //     message: "Successfully signed in."
                // });
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                const {_id, name, phone , email, pic} = savedUser;
                res.json({token: token, user: {_id, name, phone, email,pic}});
            }else{
                return res.status(422).json({
                    error: "Invalid email or password."
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    })
});

module.exports = router;