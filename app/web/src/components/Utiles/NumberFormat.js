/**
 * Formats a numeric value as a localized string.
 * This function attempts to format a number using the `toLocaleString` method,
 * which converts the number to a more readable format according to the local convention.
 *
 * @param {number} value - The number to be formatted.
 * @returns {string|number} A localized string representation of the number or 0 in case of an error.
 */
export function formatNumber(value) {
  try {
    return value.toLocaleString();
  } catch (error) {
    console.error("Failed to format number:", error);
    return 0;
  }
}
