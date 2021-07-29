import moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

import { getAssignmentNumberAndCreatedAtById } from '../services/assignment.service';

export async function createAssignmentTextFile(assignmentId) {
  const { number, createdAt } = await getAssignmentNumberAndCreatedAtById(
    assignmentId
  );
  const textFileName = `MoCo_FKT_${number}_${moment(createdAt).format('L-LT')}`;
  console.log({ textFileName });
}
