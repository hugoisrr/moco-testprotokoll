import { getStoragePath, isDir } from '../services/textFile.service';
import { validationResult } from 'express-validator';
import config from '../config';
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

  let { filesLocationAddress } = req.body;
  filesLocationAddress = path.normalize(filesLocationAddress); // normalize the address given

  // Validates the address path
  if (isDir(filesLocationAddress)) {
    // creates new JSON file with the new address
    writeFileSync(
      path.resolve(config.srcRootPath, 'filesLocationAddress.json'),
      JSON.stringify({ filesLocationAddress })
    );
    return res.status(200).json({ message: 'File save in JSON' });
  } else {
    return res
      .status(400)
      .json({ message: 'Es wurde kein gültiger Adresspfad angegeben.' });
  }
}
