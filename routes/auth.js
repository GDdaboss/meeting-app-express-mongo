const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')

//req.body will have email and password
router.post('/login', (req, res, next) => {
    const credentials = req.body
    const email = credentials.email
    User
        .findOne(credentials)
        .exec((error, result) => {
            if(error || Object.keys(result).length === 0) {
                error. status = 403
                return next(error)
            }

            const claims = {
                email: email
            }
            jwt.sign(claims, 'shh...', {expiresIn: '24h'}, function(error, token) {
                
                if(error) { 
                    return res.status(401).json({ message: error.message })
                }
                // res.header('Authorization',token);
                // localStorage.setItem('token', token)
                res.status(200).json({
                    message: 'Signed in sucessfully',
                    token: token,
                    email: result.email
                })
                
            });
        })

        
})

router.get( '/secret_endpoint', function( req, res ) {
    const token = req.header( 'Authorization' );
    console.log( token );
    if( !token ) {
        return res.status( 403 ).json({
            message: 'Token is not sent'
        });
    }
    jwt.verify(token, 'shh...', function(err, claims) {
        if( err ) {
            return res.status( 403 ).json({
                message: 'Go away intruder'
            });
        }
        res.send({
            message: 'Today is Monday'
        });
    });
});

module.exports = router
