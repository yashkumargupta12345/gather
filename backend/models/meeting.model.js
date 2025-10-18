import mongoose from "mongoose";

// creating meeting schema
const meetingSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    meetingCode: {
        type: String, required: true
    },
    date: {
        type: Date, default: Date.now
    }
})


const Meeting = mongoose.model("Meeting", meetingSchema)

export { Meeting }