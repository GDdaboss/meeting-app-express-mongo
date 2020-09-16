const mongoose = require( 'mongoose' )

const teamSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    members: [String]  // email ids of users
})

mongoose.model( 'Team', teamSchema )
