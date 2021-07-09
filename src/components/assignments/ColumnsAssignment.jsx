import {
  boardsNumberAssignment,
  formatLinkTestsAssignment,
  formatLinkDeleteAssignment,
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
    dataField: 'id',
    text: 'Tests',
    formatter: formatLinkTestsAssignment,
  },
  {
    dataField: 'id',
    text: 'Löschen',
    formatter: formatLinkDeleteAssignment,
  },
];
