const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const { authMiddleware } = require('../middleware/auth');

// Apply auth middleware to all assignment routes
router.use(authMiddleware);

// Get all assignments for logged in user
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.user.userId }).sort({ dueDate: 1 });
    res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create new assignment
router.post('/', async (req, res) => {
  try {
    const { subject, title, dueDate } = req.body;

    const newAssignment = new Assignment({
      userId: req.user.userId,
      subject,
      title,
      dueDate
    });

    const assignment = await newAssignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Mark assignment as complete
router.put('/:id/complete', async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (assignment.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    assignment.status = 'Completed';
    await assignment.save();

    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete assignment
router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (assignment.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await assignment.deleteOne();
    res.json({ message: 'Assignment removed' });
  } catch (err) {
    console.error(err.message);
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
