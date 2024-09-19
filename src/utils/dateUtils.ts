import { parseISO } from 'date-fns';

/**
 * Parses a date string in ISO format to a Date object.
 * @param dateString - The date string in ISO format.
 * @returns The parsed Date object.
 */
export function parseTransactionDate(dateString: string): Date {
  const parsedDate = parseISO(dateString);
  if (isNaN(parsedDate.getTime())) {
    console.error(`Invalid date format: ${dateString}`);
    return new Date();
  }
  return parsedDate;
}

/**
 * Normalizes a Date object by setting the time components to zero.
 * @param date - The Date object to normalize.
 * @returns The normalized Date object.
 */
export function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
