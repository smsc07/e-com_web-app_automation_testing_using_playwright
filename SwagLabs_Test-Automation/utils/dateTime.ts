export function getFormattedDateTime() {
  const now = new Date();

  const formattedDate = [
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    now.getFullYear(),
  ].join('-');

  const formattedTime = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join('-');

  return `${formattedDate}_${formattedTime}`;
}
