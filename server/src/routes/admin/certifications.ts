import { Router, Response } from 'express';
import { query } from '../../db/connection.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../../middleware/auth.js';

const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

// Get all certifications
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const certifications = await query('SELECT * FROM certifications ORDER BY name');
    res.json(certifications);
  } catch (error) {
    console.error('Get certifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create certification
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { name, logo_url, description_en, description_fr, description_ar } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const result: any = await query(
      'INSERT INTO certifications (name, logo_url, description_en, description_fr, description_ar) VALUES (?, ?, ?, ?, ?)',
      [name, logo_url || null, description_en || null, description_fr || null, description_ar || null]
    );

    res.status(201).json({ message: 'Certification created', id: result.insertId });
  } catch (error) {
    console.error('Create certification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update certification
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { name, logo_url, description_en, description_fr, description_ar } = req.body;

    await query(
      'UPDATE certifications SET name = ?, logo_url = ?, description_en = ?, description_fr = ?, description_ar = ? WHERE id = ?',
      [name, logo_url, description_en, description_fr, description_ar, req.params.id]
    );

    res.json({ message: 'Certification updated' });
  } catch (error) {
    console.error('Update certification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete certification
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    await query('DELETE FROM certifications WHERE id = ?', [req.params.id]);
    res.json({ message: 'Certification deleted' });
  } catch (error) {
    console.error('Delete certification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
