/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Controller to allow user to login, logout, and register - index.js
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayUserList= (req, res, next) => {
    User.find((err, userList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(userList);
        }
    });
};

module.exports.displayLoginPage = (req, res, next) =>
{
    //check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}  

module.exports.processLoginPage = (req, res, next) =>
{
    passport.authenticate('local', 
    (err, user, info) => 
    {
       //server error?
       if(err)
       {
           return next(err);
       } 

       //is there a user login error?
       if(!user)
       {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
       }

       req.login(user, (err) => {
           //server error?
           if(err)
           {
                return next(err);               
           }

           const payload = {
            id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email
           }

           const authToken = jwt.sign(payload, DB.Secret, {
               expiresIn: 604800 //1 week
           });

              return res.json({success: true, msg: 'User Logged in Successfully', user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
               }, token: authToken});
       });
    }) (req, res, next);
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedUser = new User({
        "_id": id,
        "username": req.body.username, 
        "email": req.body.email,
        "displayName": req.body.displayName
    });

    User.updateOne({_id: id}, updatedUser, (err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Edited User', user: updatedUser});
        }
    });
};

module.exports.displayRegisterPage = (req, res, next) =>
{
    //Checks if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register', {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) =>
{
    //create a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!' 
                );
                console.log('Error: User Already Exists!')  
            }
            return res.render('auth/register', 
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: '' 
            });
        }
        else
        {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/question-list');
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => 
{
    req.logout();
    res.json({success: true, msg: 'User Successfully Logged Out!'});
}




