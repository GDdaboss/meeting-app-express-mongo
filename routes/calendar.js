// "/api/calendar" route
const express = require( 'express' );

const mongoose = require( 'mongoose' );
const Meeting = mongoose.model( 'Meeting' );
const {authenticate} = require('../utils/auth')

const router = express.Router();

router.get('/', authenticate )

router.get( '/', ( req, res, next ) => {
    // const date = req.query.date
    const date = new Date(req.query.date)
    // const email = req.query.email
    const email = req.claims.email

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