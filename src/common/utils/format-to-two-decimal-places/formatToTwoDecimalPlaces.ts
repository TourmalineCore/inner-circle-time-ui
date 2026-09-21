export function formatToTwoDecimalPlaces({
  value,
}: {
  value: number,
}) {
  return Math.trunc(value * 100 ) / 100 
}
