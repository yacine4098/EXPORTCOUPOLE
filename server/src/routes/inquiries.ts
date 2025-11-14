import { Router } from 'express';
import { query } from '../db/connection.js';
import nodemailer from 'nodemailer';

const router = Router();

// Create inquiry
router.post('/', async (req, res) => {
  try {
    const { name, company, email, phone, country, message, products_interested } = req.body;

    if (!name || !company || !email || !country || !message) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const result: any = await query(
      `INSERT INTO inquiries (name, company, email, phone, country, message, products_interested, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`,
      [name, company, email, phone || null, country, message, products_interested || null]
    );

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New Inquiry from ${company}`,
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Products Interested:</strong> ${products_interested || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({ 
      message: 'Inquiry submitted successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
