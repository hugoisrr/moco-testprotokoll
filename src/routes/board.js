import { Router } from 'express';
import { check } from 'express-validator';
import { addBoardToAssignment } from '../controllers/board.controller';

const router = Router();

router
  .route('/board/:assignmentId')
  .post(
    [check('serialNumber', 'Bitte geben Sie eine SerialNumber an.').notEmpty()],
    addBoardToAssignment
  );

export default router;
