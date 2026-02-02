import { Router } from 'express';
import { body } from 'express-validator';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = Router();

router.use(auth);

router.get('/', getProfile);

router.put('/', [
    body('name')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
    body('bio')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Bio cannot exceed 200 characters')
], validate, updateProfile);

export default router;
