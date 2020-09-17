const express = require( 'express' );

const mongoose = require( 'mongoose' );
const Meeting = mongoose.model( 'Meeting' );
const {authenticate} = require('../utils/auth')

const router = express.Router();

router.get('/', authenticate )
router.get( '/', ( req, res, next ) => {
    // console.log("im here2")

    const dateInt = req.query.date
    const date = new Date()
    // const email = req.query.email
    const email = req.claims.email
    const searchExp = req.query.search
    const search = new RegExp(searchExp)
    
    // console.log(email)
    switch(dateInt){
        case 'TODAY':
            
            Meeting
                .find({
                    date: {$eq: date},
                    name: {$regex: search},
                    attendees: {$eq: email}
                })
                .exec(( err, results ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }
                    res.status( 200 ).json( results );
                });
            break;
        case 'ALL':

            Meeting
                .find({
                    name: {$regex: search},
                    attendees: {$eq: email}
                })
                .exec(( err, results ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }
                    res.status( 200 ).json( results );
                });

            break;

        case 'PAST':

            Meeting
                .find({
                    date: {$lt: date},
                    name: {$regex: search},
                    attendees: {$eq: email}
                })
                .exec(( err, results ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }
                    res.status( 200 ).json( results );
                });
            break;

        case 'UPCOMING':
            Meeting
                .find({
                    date: {$gt: date},
                    name: {$regex: search},
                    attendees: {$eq: email}
                })
                .exec(( err, results ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }
                    res.status( 200 ).json( results );
                });
            break;

        default:
            Meeting
                .find({
                    attendees: {$eq: email}
                })
                .exec(( err, results ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }
                    res.status( 200 ).json( results );
                });

            break;


    }
    

});

router.post( '/', ( req, res, next ) => {
    const meeting = req.body
    const email = req.query.email

    meeting.attendees.push(email)
    meeting.date = new Date(meeting.date)

    if( !meeting ) {
        const err = new Error( 'Meeting should be included in request body' );
        err.status = 400;
        return next( err );
    }

    Meeting
        .create( meeting, ( err, meetingWithId ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }

            res.status( 200 ).json( meetingWithId );
        });
});


module.exports = router;