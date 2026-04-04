const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    resumeLink: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Applied', 'Selected', 'Rejected'], 
        default: 'Applied' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);