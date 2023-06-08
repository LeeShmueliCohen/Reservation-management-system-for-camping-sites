export function calculateTommorowDate(dateStr) {
  let date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function pullTodayDate() {
  return new Date().toISOString().substr(0, 10);
}

export function strDate(date) {
  date = date.split("-");
  return `${date[2]}/${date[1]}/${date[0]}`;
}
