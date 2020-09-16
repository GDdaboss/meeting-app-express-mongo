const mongoose = require( 'mongoose' )

const TimeSchema = new mongoose.Schema({
    hours: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    }
})

const meetingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: TimeSchema,
        required: true
    },
    endTime: {
        type: TimeSchema,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    attendees: [String] //email ids of users
})

mongoose.model( 'Meeting', meetingSchema )