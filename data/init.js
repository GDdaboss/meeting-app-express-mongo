const mongoose = require('mongoose');

mongoose.set( 'useFindAndModify', false );
mongoose.set('returnOriginal', false);

require( '../models/Users' );
require( '../models/Meetings' );
require( '../models/Teams' );

mongoose.connect( 'mongodb://localhost:27017/meetingsAppDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on( 'error', ( err ) => {
    console.error.bind( console, 'connection error:', err.message );
    process.exit( 0 );
});

connection.on('open', function() {
  console.log( 'connected to mongodb database' );
});
