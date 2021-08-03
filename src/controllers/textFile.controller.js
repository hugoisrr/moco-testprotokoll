import { getStoragePath } from '../services/textFile.service';
import { validationResult } from 'express-validator';
import path from 'path';
import { writeFileSync } from 'fs';

export function getStoragePathFromServer(req, res) {
  const storagePath = getStoragePath();
  return res.status(200).json(storagePath);
}

export function setNewStoragePath(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { filesLocationAddress } = req.body;
  console.log({ filesLocationAddress });
  writeFileSync(
    path.resolve(__dirname, 'filesLocationAddress.json'),
    JSON.stringify({ filesLocationAddress })
  );
  return res.status(200).json({ message: 'File save in JSON' });
}
