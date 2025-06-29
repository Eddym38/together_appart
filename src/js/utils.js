export function formatNumber(n) {
  if (n < 1000) return n % 1 === 0 ? n.toString() : n.toFixed(1);
  const units = ["", "k", "M", "G", "T", "P", "E"];
  let unit = 0;
  let num = n;
  while (num >= 1000 && unit < units.length - 1) {
    num /= 1000;
    unit++;
  }
  // 1 chiffre après la virgule
  let str = num.toFixed(1);
  // Supprime les .0 inutiles
  str = str.replace(/\.0$/, "");
  return str + units[unit];
}
export function formatTime(seconds) {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}m ${secs}s`;
}
