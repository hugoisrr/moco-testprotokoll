import moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

export function testResultFormatter(result) {
  if (!result) {
    return (
      <span>
        <strong style={{ color: 'red' }}>NG</strong>
      </span>
    );
  }
  return <span style={{ color: 'green' }}>OK</span>;
}

export function dateFormatter(timestamp) {
  return moment(timestamp).format('LLLL');
}

export function rowColorVariant(result) {
  return result ? 'success' : 'danger';
}

export function rowIcon(result) {
  return result ? 'fas fa-check' : 'fas fa-times';
}

export function validateVoltage(value) {
  return value >= 11500 && value <= 12500 ? 'success' : 'danger';
}

export function validateTemperature(value) {
  return value >= 20 && value <= 37 ? 'success' : 'danger';
}
