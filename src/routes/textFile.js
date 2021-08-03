import { Router } from 'express';
import { check } from 'express-validator';
import {
  getStoragePathFromServer,
  setNewStoragePath,
} from '../controllers/textFile.controller';

const router = Router();

router
  .route('/textFile')
  .post(
    [
      check(
        'filesLocationAddress',
        'Bitte geben Sie eine gültige Adresse für den Dateispeicherort ein.'
      ).notEmpty(),
    ],
    setNewStoragePath
  )
  .get(getStoragePathFromServer);

export default router;
