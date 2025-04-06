export default function getTimeRemaining(dateISO: string): string {
  if (!dateISO) return "--:--:--";

  const now = new Date();
  const date = new Date(dateISO);

  let diff = date.getTime() - now.getTime();

  if (diff <= 0) return "00:00:00";

  const hour = Math.floor(diff / (1000 * 60 * 60));
  diff -= hour * 1000 * 60 * 60;
  const min = Math.floor(diff / (1000 * 60));
  diff -= min * 1000 * 60;
  const sec = Math.floor(diff / 1000);

  return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}
