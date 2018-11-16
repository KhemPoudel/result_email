const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./auth');

//For hashing password
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', auth.required, (req, res) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });

});
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        req.body.password = hash;
        const newUser = new User(req.body);
        newUser.save()
            .then(user => res.json(user.toAuthJSON()))
            .catch(function (err) {
                if (err.name == 'ValidationError') {
                    console.error('Error Validating!', err);
                    res.status(422).json(err);
                } else {
                    console.error(err);
                    res.status(500).json(err);
                }
            });
    });
});
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, response) => {
                if (response) {
                    res.json(user.toAuthJSON());
                } else {
                    throw new Error('User Credentials Error');
                }
            });
        })
        .catch((err) => {
            res.status(401).json(err);
        })
});
module.exports = router;