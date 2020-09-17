// "/api/calendar" route
const express = require( 'express' );

const mongoose = require( 'mongoose' );
const Meeting = mongoose.model( 'Meeting' );
const {authenticate} = require('../utils/auth')

const router = express.Router();

router.get('/', authenticate )

router.get( '/', ( req, res, next ) => {
    // console.log("im here2")

    // const date = req.query.date
    let date = null
    if(req.query.date === undefined)
        date = new Date().toISOString()
    else 
        date = new Date(req.query.date).toISOString()

    const email = req.claims.email
    // console.log(email, date)
    Meeting
        .find({
            date: date,
            attendees: email
        })
        .exec(( err, results ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }
            res.status( 200 ).json( results );
        });
});

module.exports = router;