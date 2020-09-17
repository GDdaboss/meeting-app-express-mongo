// execute database connection scipt (data/init.js)
require( './data/init' );

const path = require( 'path' );
const express = require( 'express' );
const calendarRouter = require( './routes/calendar' );
const meetingsRouter = require( './routes/meetings' );
const usersRouter = require( './routes/users' );
const authRouter = require( './routes/auth' );
const cors = require( 'cors' );
const app = express();


app.use( '/', ( req, res, next ) => {
    console.log( 'Received req at', (new Date()).toTimeString() );

    next();
    
    console.log( 'Response sent at', (new Date()).toTimeString() );
});

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( express.urlencoded({
    extended: false
}));

app.use(cors())
app.use( express.json());

app.use('/api/calendar', calendarRouter );
app.use('/api/meetings', meetingsRouter );
app.use('/api/users', usersRouter );
app.use('/api/auth', authRouter );


app.use(( req, res, next ) => {
    const error = new Error( 'Page not found' );
    error.status = 404;

    next( error );
});

// error handling middleware
app.use(( error, req, res, next ) => {
    res.status( error.status || 500 ).send( error.message );
    // res.render( 'error-page', {
    //     error
    // });
});

const PORT = process.env.PORT || 4000;

app.listen( PORT, ( err ) => {
    if( err ) {
        return console.error( err.message );
    }

    return console.log( `server started at http://localhost:${PORT}/` );
})