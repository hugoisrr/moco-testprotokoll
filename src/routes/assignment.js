import { Router } from 'express';
import { check } from 'express-validator';

import {
  createAssignment,
  showAssignments,
  deleteAssignment,
} from '../controllers/assignment.controller';

const router = Router();

router
  .route('/assignment')
  .post(
    [check('number', 'Bitte geben Sie eine Auftragsnummer an.').notEmpty()],
    createAssignment
  )
  .get(showAssignments);

router.route('/assignment/:id').delete(deleteAssignment);

export default router;
