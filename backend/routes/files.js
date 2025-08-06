import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import File from '../models/File.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || 'misc';
    const uploadPath = `./uploads/${category}`;
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/zip',
      'application/x-zip-compressed',
      'application/octet-stream' // For .ggb files
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Upload file (admin only)
router.post('/upload', authenticateToken, requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { category, subcategory, description } = req.body;

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      category,
      subcategory: subcategory || '',
      description: description || '',
      uploadedBy: req.user._id
    });

    await file.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: file._id,
        filename: file.filename,
        originalName: file.originalName,
        category: file.category,
        size: file.size,
        uploadedAt: file.uploadedAt
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get all files (admin only)
router.get('/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    
    const query = { isActive: true };
    if (category) {
      query.category = category;
    }

    const files = await File.find(query)
      .populate('uploadedBy', 'username')
      .sort({ uploadedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await File.countDocuments(query);

    res.json({
      files,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Get files by category (public)
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { subcategory } = req.query;

    const query = { category, isActive: true };
    if (subcategory) {
      query.subcategory = subcategory;
    }

    const files = await File.find(query)
      .populate('uploadedBy', 'username')
      .sort({ uploadedAt: -1 });

    res.json({ files });
  } catch (error) {
    console.error('Get files by category error:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Download file
router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    
    if (!file || !file.isActive) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    res.download(file.path, file.originalName);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
});

// Update file (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { category, subcategory, description, isActive } = req.body;
    
    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (category) file.category = category;
    if (subcategory !== undefined) file.subcategory = subcategory;
    if (description !== undefined) file.description = description;
    if (isActive !== undefined) file.isActive = isActive;

    await file.save();

    res.json({
      message: 'File updated successfully',
      file
    });
  } catch (error) {
    console.error('Update file error:', error);
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete file (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Delete from database
    await File.findByIdAndDelete(req.params.id);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router; 