const Application = require('../models/Application');

exports.applyToJob = async (req, res) => {
    const { jobId, resumeLink } = req.body;
    try {
        const existing = await Application.findOne({ user: req.user._id, job: jobId });
        if (existing) return res.status(400).json({ message: 'Already applied for this job' });

        const application = await Application.create({
            user: req.user._id,
            job: jobId,
            resumeLink
        });
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdminApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('user', 'name email')
            .populate('job', 'title company');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user._id })
            .populate('job', 'title company location salary');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};