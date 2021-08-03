import { Router } from 'express';
import { getStoragePathFromServer } from '../controllers/textFile.controller';

const router = Router();

router.route('/textFile').get(getStoragePathFromServer);

export default router;
