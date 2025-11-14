import { Router, Response } from 'express';
import { query } from '../../db/connection.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../../middleware/auth.js';

const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

// Get all inquiries
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    
    let sql = 'SELECT * FROM inquiries WHERE 1=1';
    const params: any[] = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC';

    const inquiries = await query(sql, params);
    res.json(inquiries);
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single inquiry
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const inquiries: any = await query('SELECT * FROM inquiries WHERE id = ?', [req.params.id]);
    
    if (!inquiries || inquiries.length === 0) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json(inquiries[0]);
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update inquiry status/notes
router.patch('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { status, notes } = req.body;
    const updates: string[] = [];
    const params: any[] = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }

    if (notes !== undefined) {
      updates.push('notes = ?');
      params.push(notes);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    params.push(req.params.id);

    await query(
      `UPDATE inquiries SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    res.json({ message: 'Inquiry updated' });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete inquiry
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    await query('DELETE FROM inquiries WHERE id = ?', [req.params.id]);
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
