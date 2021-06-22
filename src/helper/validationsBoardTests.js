export function testResultFormatter(cell) {
  if (!cell) {
    return (
      <span>
        <strong style={{ color: 'red' }}>NG</strong>
      </span>
    );
  }
  return <span style={{ color: 'green' }}>OK</span>;
}

export function dateFormatter(cell) {
  const date = new Date(cell * 1000);
  return `
    ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} 
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
  return value > 0 && value < 40 ? 'success' : 'danger';
}
