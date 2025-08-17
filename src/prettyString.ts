import chalk from "chalk";

/**
 * Formats an informational message with blue [INFO] prefix
 */
export function info(...msg: any[]): string {
  return [chalk.blue("[INFO]"), ...msg].join(" ");
}

/**
 * Formats an error message with red [ERR] prefix
 */
export function error(...msg: any[]): string {
  return [chalk.red("[ERR]"), ...msg].join(" ");
}

/**
 * Formats a success message with green [OK] prefix
 */
export function success(...msg: any[]): string {
  return [chalk.green("[OK]"), ...msg].join(" ");
}