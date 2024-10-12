// routes/blogRoutes.js

import { Router } from 'express';
import Blog from '../models/Blog.js'; // Blog model
import multer from 'multer';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const router = Router();
const app = express();
app.use(cors());
app.use(express.json());

// Setup for image uploads (optional if blogs include images)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./BlogImages");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single("blogImage");

// Function to delete an image if necessary
function deleteImage(filePath) {
    fs.unlink(path.join(path.resolve(), 'BlogImages', filePath), (err) => {
        if (err) {
            console.error('Failed to delete the file:', err);
        }
    });
}

// Route to add a new blog post
router.post('/add', upload, async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            image: req.file ? req.file.filename : null,
            createdAt: req.body.createdAt,
        });

        await newBlog.save();
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get a blog post by ID
router.get('/get/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to update a blog post by ID
router.put('/update/:id', upload, async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const existingBlog = await Blog.findById(req.params.id);

        if (!existingBlog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // If new image is uploaded, delete the old one and set the new one
        let updatedImage = existingBlog.image;
        if (req.file) {
            if (existingBlog.image) {
                deleteImage(existingBlog.image); // Delete old image
            }
            updatedImage = req.file.filename; // Set new image filename
        }

        const updatedBlog = {
            title,
            content,
            author,
            image: updatedImage,
            updatedAt: Date.now(),
        };

        await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true });
        res.status(200).json({ message: 'Blog post updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a blog post by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const blogToDelete = await Blog.findById(req.params.id);

        if (!blogToDelete) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        if (blogToDelete.image) {
            deleteImage(blogToDelete.image);
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
