export function formatDate(date: string): string {
  const dateObj = new Date(date); // Convert string to Date object
  return dateObj.toISOString().split('T').join(' ').split('.')[0]; // Format as yyyy-mm-dd hh:mm:ss
}
