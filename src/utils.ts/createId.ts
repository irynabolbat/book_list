export function createId() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const timestamp = Date.now();
  const id = `${timestamp}${randomNumber}`;

  return +id;
}