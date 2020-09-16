
const express = require( 'express' );

const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );

const router = express.Router();

router.get('/', (req, res, next) => {
    User
        .find()
        .exec(( err, results ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }
            res.status( 200 ).json( results );
        });
})


module.exports = router;
