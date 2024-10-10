const express = require('express');
const multer = require('multer');
const Refund = require('../models/Refund'); 

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });


router.post('/request', upload.array('images', 3), async (req, res) => {
  try {
   
    const { orderId, reason, amount, comments } = req.body;

    
    const images = req.files && req.files.length > 0 ? req.files.map(file => file.path) : [];

   
    const newRefund = new Refund({
      orderId,
      reason,
      amount,
      comments,
      images 
    });

   
    await newRefund.save();

    
    res.status(201).json(newRefund);
  } catch (error) {
    console.error('Error saving refund request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const refunds = await Refund.find(); 
    res.status(200).json(refunds);
  } catch (error) {
    console.error('Error fetching refunds:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.put('/update-status/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const refund = await Refund.findById(req.params.id);
    if (!refund) {
      return res.status(404).json({ error: 'Refund request not found' });
    }

    refund.status = status;
    await refund.save();

    res.status(200).json({ message: 'Refund status updated successfully', refund });
  } catch (error) {
    console.error('Error updating refund status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const refund = await Refund.findByIdAndDelete(req.params.id);
    if (!refund) {
      return res.status(404).json({ error: 'Refund request not found' });
    }
    res.status(200).json({ message: 'Refund deleted successfully' });
  } catch (error) {
    console.error('Error deleting refund:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
