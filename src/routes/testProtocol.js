import { Router } from 'express';
import { check } from 'express-validator';

import { addTestProtocolToBoard } from '../controllers/testProtocol.controller';

const router = Router();

router
  .route('/test-protocol/:boardId')
  .post(
    [
      check('tester', 'Bitte geben Sie eine Testernummer an.')
        .notEmpty()
        .isNumeric(),
    ],
    [
      check('voltageValue', 'Bitte geben Sie eine Spannungswert an.')
        .notEmpty()
        .isNumeric(),
    ],
    [
      check('temperature', 'Bitte geben Sie eine Temperatur an.')
        .notEmpty()
        .isNumeric(),
    ],
    addTestProtocolToBoard
  );

export default router;
