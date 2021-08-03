import { getStoragePath } from '../services/textFile.service';

export function getStoragePathFromServer(req, res) {
  const storagePath = getStoragePath();
  return res.status(200).json(storagePath);
}
