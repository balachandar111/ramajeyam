const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Query = require('../models/Query'); // Adjust path as needed

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    let attachmentUrl = null;

    if (req.file) {
      // Upload file buffer to Cloudinary
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' }, // Accepts images, pdfs, etc.
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
      attachmentUrl = await uploadPromise;
    }

    // Save to database
    const newQuery = new Query({
      ...req.body,
      attachmentUrl,
    });
    
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({ error: 'Server error while saving details.' });
  }
});

// POST /api/queries  -> save a new customer query (chatbot form submission)
router.post("/", async (req, res) => {
  try {
    const {
      sessionId,
      language,
      queryType,
      platformPurchased,
      orderedDate,
      product,
      rate,
      contactNumber,
      description,
    } = req.body;

    if (!sessionId || !queryType) {
      return res.status(400).json({
        success: false,
        message: "sessionId and queryType are required",
      });
    }

    const newQuery = await Query.create({
      sessionId,
      language,
      queryType,
      platformPurchased,
      orderedDate,
      product,
      rate,
      contactNumber,
      description,
    });

    return res.status(201).json({ success: true, data: newQuery });
  } catch (err) {
    console.error("Error saving query:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/queries -> list all queries (for an admin/agent dashboard)
router.get("/", async (req, res) => {
  try {
    const { status, queryType } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (queryType) filter.queryType = queryType;

    const queries = await Query.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: queries.length, data: queries });
  } catch (err) {
    console.error("Error fetching queries:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// PATCH /api/queries/:id -> update status (e.g. agent marks resolved)
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Query.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Error updating query:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
