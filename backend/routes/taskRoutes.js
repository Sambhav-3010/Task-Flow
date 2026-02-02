import { Router } from 'express';
import { body } from 'express-validator';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = Router();

router.use(auth);

router.post('/', [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
], validate, createTask);

router.get('/', getTasks);

router.get('/:id', getTask);

router.put('/:id', [
    body('title')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
], validate, updateTask);

router.delete('/:id', deleteTask);

export default router;
