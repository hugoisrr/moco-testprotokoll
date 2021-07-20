import {
  actionButtons,
  boardsNumberAssignment,
} from '../../helper/assignmentFunctions';

export const columns = [
  {
    dataField: 'number',
    text: 'Auftrag',
    sort: true,
  },
  {
    dataField: 'boards',
    text: 'Zählung',
    sort: true,
    formatter: boardsNumberAssignment,
  },
  {
    dataField: '_id',
    text: 'Aktionen',
    formatter: actionButtons,
  },
];
