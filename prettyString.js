import chalk from "chalk";

/**
 * Formats an informational message with blue [INFO] prefix
 * @param {...*} msg - Messages to be logged
 * @returns {string} Formatted info message
 */
export function info(...msg) {
  return [chalk.blue("[INFO]"), ...msg].join(" ");
}

/**
 * Formats an error message with red [ERR] prefix
 * @param {...*} msg - Messages to be logged
 * @returns {string} Formatted error message
 */
export function error(...msg) {
  return [chalk.red("[ERR]"), ...msg].join(" ");
}

/**
 * Formats a success message with green [OK] prefix
 * @param {...*} msg - Messages to be logged
 * @returns {string} Formatted success message
 */
export function success(...msg) {
  return [chalk.green("[OK]"), ...msg].join(" ");
}