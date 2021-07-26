import {
  testResultFormatter,
  dateFormatter,
} from '../../helper/validationsBoardTests';

export const columns = [
  {
    dataField: 'serialNumber',
    text: 'Seriennummern',
    sort: true,
  },
  // {
  //   dataField: 'tester',
  //   text: 'Prüfer',
  //   sort: true,
  // },
  // {
  //   dataField: 'result',
  //   text: 'Ergebnis',
  //   sort: true,
  //   formatter: testResultFormatter,
  // },
  // {
  //   dataField: 'timestamp',
  //   text: 'Datum',
  //   sort: true,
  //   formatter: dateFormatter,
  // },
];
